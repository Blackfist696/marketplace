<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';

use App\Core\AppLogger;

/**
 * MVP AI controller: proxy backend vers Ollama.
 *
 * Route cible: POST /api/ai/chat
 * Entree: {"prompt":"..."}
 * Sortie: {status, message, data: {reply, model, correlation_id}}
 */
class AiController extends Controller
{
    private string $ollamaUrl;
    private string $model;
    private string $fallbackModel;
    private int $connectTimeout;
    private int $timeout;
    private int $maxPromptChars;
    private int $tagsTimeout;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/app.php';
        $ai = (array) ($config['ai'] ?? []);

        $this->ollamaUrl = (string) ($ai['ollama_url'] ?? 'http://localhost:11434/api/chat');
        $this->model = trim((string) ($ai['model'] ?? getenv('OLLAMA_MODEL') ?: 'llama3.1:8b'));
        $this->fallbackModel = trim((string) ($ai['fallback_model'] ?? getenv('OLLAMA_FALLBACK_MODEL') ?: 'llama3.1:8b'));
        $this->connectTimeout = max(1, (int) ($ai['connect_timeout'] ?? 5));
        $this->timeout = max(1, (int) ($ai['timeout'] ?? 90));
        $this->maxPromptChars = max(100, (int) ($ai['max_prompt_chars'] ?? 4000));
        $this->tagsTimeout = max(1, (int) ($ai['tags_timeout'] ?? 3));
    }

    /**
     * Recoit un prompt et retourne une reponse Ollama (mode non-stream pour MVP).
     */
    public function chat(): void
    {
        $prompt = $this->extractPrompt();
        $correlationId = (string) ($_SERVER['HTTP_X_CORRELATION_ID'] ?? '');
        if ($correlationId === '') {
            $correlationId = bin2hex(random_bytes(16));
        }

        if ($prompt === '') {
            $this->respond(400, 'Le champ prompt est requis.');
            return;
        }

        if (mb_strlen($prompt, 'UTF-8') > $this->maxPromptChars) {
            $this->respond(400, sprintf('Le prompt depasse la limite de %d caracteres.', $this->maxPromptChars));
            return;
        }

        if (!function_exists('curl_init')) {
            AppLogger::log('ai-error', 'error', 'cURL extension unavailable', [
                'correlation_id' => $correlationId,
            ]);
            $this->respond(500, 'Service AI indisponible (cURL manquant).');
            return;
        }

        $availableModels = $this->getAvailableModels();
        $selectedModel = $this->selectModel($availableModels);
        $payload = [
            'model' => $selectedModel,
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
            'stream' => false,
        ];

        $encodedPayload = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if (!is_string($encodedPayload)) {
            $this->respond(500, 'Impossible de preparer la requete AI.');
            return;
        }

        $raw = $this->callOllama($encodedPayload, $correlationId);
        $decoded = json_decode((string) $raw, true);

        if (!is_array($decoded)) {
            AppLogger::log('ai-error', 'error', 'Ollama upstream invalid JSON', [
                'correlation_id' => $correlationId,
                'http_code' => 0,
                'raw_excerpt' => mb_substr((string) $raw, 0, 1000, 'UTF-8'),
            ]);
            $this->respond(502, 'Reponse AI invalide.');
            return;
        }

        if (isset($decoded['error']) && is_string($decoded['error']) && $decoded['error'] !== '' && $selectedModel !== $this->fallbackModel) {
            $fallbackModel = $this->fallbackModel !== '' ? $this->fallbackModel : $this->model;
            if ($fallbackModel !== '' && $fallbackModel !== $selectedModel) {
                $payload['model'] = $fallbackModel;
                $encodedPayload = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                if (is_string($encodedPayload)) {
                    $raw = $this->callOllama($encodedPayload, $correlationId);
                    $decoded = json_decode((string) $raw, true);
                    $selectedModel = $fallbackModel;
                }
            }
        }

        if (!is_array($decoded)) {
            AppLogger::log('ai-error', 'error', 'Ollama upstream invalid JSON after retry', [
                'correlation_id' => $correlationId,
                'model' => $selectedModel,
            ]);
            $this->respond(502, 'Reponse AI invalide.');
            return;
        }

        if (isset($decoded['error']) && is_string($decoded['error']) && $decoded['error'] !== '') {
            AppLogger::log('ai-error', 'error', 'Ollama upstream error', [
                'correlation_id' => $correlationId,
                'model' => $selectedModel,
                'error' => $decoded['error'],
            ]);
            $this->respond(502, 'Le service AI a retourne une erreur: ' . $decoded['error']);
            return;
        }

        $reply = trim((string) (($decoded['message']['content'] ?? '')));
        if ($reply === '') {
            AppLogger::log('ai-error', 'warning', 'Ollama empty reply', [
                'correlation_id' => $correlationId,
                'model' => $selectedModel,
            ]);
            $this->respond(502, 'Le service AI a retourne une reponse vide.');
            return;
        }

        header('X-Correlation-Id: ' . $correlationId);

        $this->respond(200, 'Reponse AI', [
            'reply' => $reply,
            'model' => (string) ($decoded['model'] ?? $selectedModel),
            'correlation_id' => $correlationId,
        ]);
    }

    private function extractPrompt(): string
    {
        $prompt = trim((string) ($_POST['prompt'] ?? ''));
        if ($prompt !== '') {
            return $prompt;
        }

        $rawBody = file_get_contents('php://input');
        if (is_string($rawBody) && $rawBody !== '') {
            $decoded = json_decode($rawBody, true);
            if (is_array($decoded) && isset($decoded['prompt'])) {
                return trim((string) $decoded['prompt']);
            }
        }

        return '';
    }

    private function getAvailableModels(): array
    {
        $tagsUrl = preg_replace('#/api/chat/?$#', '/api/tags', $this->ollamaUrl) ?: $this->ollamaUrl;
        $ch = curl_init($tagsUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, min(3, max(1, $this->tagsTimeout)));
        curl_setopt($ch, CURLOPT_TIMEOUT, max(1, $this->tagsTimeout));

        $raw = curl_exec($ch);
        curl_close($ch);

        if ($raw === false || $raw === '') {
            return [];
        }

        $decoded = json_decode((string) $raw, true);
        if (!is_array($decoded) || !isset($decoded['models']) || !is_array($decoded['models'])) {
            return [];
        }

        $models = [];
        foreach ($decoded['models'] as $model) {
            if (is_array($model) && isset($model['name']) && is_string($model['name']) && $model['name'] !== '') {
                $models[] = $model['name'];
            }
        }

        return $models;
    }

    private function selectModel(array $availableModels): string
    {
        $candidates = array_values(array_unique(array_filter([
            $this->model,
            $this->fallbackModel,
        ], static fn($value): bool => is_string($value) && trim($value) !== '')));

        if ($availableModels === []) {
            return $candidates[0] ?? $this->model;
        }

        foreach ($candidates as $candidate) {
            if (in_array($candidate, $availableModels, true)) {
                return $candidate;
            }
        }

        return $candidates[0] ?? $this->model;
    }

    private function callOllama(string $encodedPayload, string $correlationId): string
    {
        $ch = curl_init($this->ollamaUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $encodedPayload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Accept: application/json',
            'X-Correlation-Id: ' . $correlationId,
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $this->connectTimeout);
        curl_setopt($ch, CURLOPT_TIMEOUT, $this->timeout);

        $raw = curl_exec($ch);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($raw === false || $curlError !== '') {
            AppLogger::log('ai-error', 'error', 'Ollama upstream cURL failure', [
                'correlation_id' => $correlationId,
                'error' => $curlError,
            ]);
            return json_encode(['error' => $curlError], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '{"error":"curl failure"}';
        }

        return (string) $raw;
    }
}
