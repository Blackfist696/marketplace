<?php
namespace App\Controllers;

use App\Core\AppLogger;
use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Response;

/**
 * Base controller permettant de renvoyer des réponses JSON standardisées.
 */
abstract class Controller
{
    // Reponse tamponnee: permet de conserver un style legacy void dans les actions
    // tout en restant compatible avec le pipeline PSR-7 de Slim.
    private ?ResponseInterface $response = null;

    /**
     * Envoie une réponse JSON uniforme au client.
     *
     * @param int $status Code HTTP de la réponse.
     * @param string $message Message descriptif.
     * @param array $data Données supplémentaires à renvoyer.
     */
    protected function readRequestData(): array
    {
        if (!empty($_POST) && is_array($_POST)) {
            return $_POST;
        }

        $raw = file_get_contents('php://input');
        if ($raw === false || $raw === '') {
            return [];
        }

        $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
        if (strpos($contentType, 'application/json') !== false) {
            $decoded = json_decode($raw, true);
            if (is_array($decoded)) {
                return $decoded;
            }
        }

        $data = [];
        parse_str($raw, $data);

        return is_array($data) ? $data : [];
    }

    protected function respond(int $status = 200, string $message = '', array $data = []): void
    {
        // Contrat JSON minimal commun a tous les controleurs.
        $payload = [
            'status' => $status,
            'message' => $message,
        ];

        if (!empty($data)) {
            $payload['data'] = $data;
        }

        // Journalisation standardisee des erreurs HTTP (4xx/5xx).
        if ($status >= 400) {
            AppLogger::log(
                $status >= 500 ? 'app-error' : 'client-error',
                $status >= 500 ? 'error' : 'warning',
                $message !== '' ? $message : 'Erreur HTTP',
                [
                    'status' => $status,
                    'method' => (string) ($_SERVER['REQUEST_METHOD'] ?? ''),
                    'uri' => (string) ($_SERVER['REQUEST_URI'] ?? ''),
                    'user_id' => (int) ($_SESSION['user_id'] ?? 0),
                    'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
                ]
            );
        }

        // Construction de la Response PSR-7 finale, lue ensuite par l'invoker.
        $this->response = JsonResponder::write(new Response(), $status, $payload);
    }

    public function consumeResponse(): ?ResponseInterface
    {
        // Consommation one-shot: evite de renvoyer deux fois la meme reponse.
        $response = $this->response;
        $this->response = null;

        return $response;
    }
}
