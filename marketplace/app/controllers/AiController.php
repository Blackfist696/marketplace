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
    private int $connectTimeout;
    private int $timeout;
    private int $maxPromptChars;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/app.php';
        $ai = (array) ($config['ai'] ?? []);

        $this->ollamaUrl = (string) ($ai['ollama_url'] ?? 'http://localhost:11434/api/chat');
        $this->model = (string) ($ai['model'] ?? 'mistral');
        $this->connectTimeout = max(1, (int) ($ai['connect_timeout'] ?? 5));
        $this->timeout = max(1, (int) ($ai['timeout'] ?? 90));
        $this->maxPromptChars = max(100, (int) ($ai['max_prompt_chars'] ?? 4000));
    }

    /**
     * Recoit un prompt et retourne une reponse Ollama (mode non-stream pour MVP).
     */
    public function chat(): void
    {
        $prompt = trim((string) ($_POST['prompt'] ?? ''));
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

        $payload = [
            'model' => $this->model,
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
        $httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($raw === false || $curlError !== '') {
            AppLogger::log('ai-error', 'error', 'Ollama upstream cURL failure', [
                'correlation_id' => $correlationId,
                'error' => $curlError,
            ]);
            $this->respond(502, 'Echec de communication avec le service AI.');
            return;
        }

        $decoded = json_decode((string) $raw, true);
        if (!is_array($decoded)) {
            AppLogger::log('ai-error', 'error', 'Ollama upstream invalid JSON', [
                'correlation_id' => $correlationId,
                'http_code' => $httpCode,
                'raw_excerpt' => mb_substr((string) $raw, 0, 1000, 'UTF-8'),
            ]);
            $this->respond(502, 'Reponse AI invalide.');
            return;
        }

        $reply = trim((string) (($decoded['message']['content'] ?? '')));
        if ($reply === '') {
            AppLogger::log('ai-error', 'warning', 'Ollama empty reply', [
                'correlation_id' => $correlationId,
                'http_code' => $httpCode,
            ]);
            $this->respond(502, 'Le service AI a retourne une reponse vide.');
            return;
        }

        header('X-Correlation-Id: ' . $correlationId);

        $this->respond(200, 'Reponse AI', [
            'reply' => $reply,
            'model' => (string) ($decoded['model'] ?? $this->model),
            'correlation_id' => $correlationId,
        ]);
    }
}
