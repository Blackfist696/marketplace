<?php
namespace App\Controllers;

use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Slim\Psr7\Response;

/**
 * Base controller permettant de renvoyer des réponses JSON standardisées.
 */
abstract class Controller
{
    private ?ResponseInterface $response = null;

    /**
     * Envoie une réponse JSON uniforme au client.
     *
     * @param int $status Code HTTP de la réponse.
     * @param string $message Message descriptif.
     * @param array $data Données supplémentaires à renvoyer.
     */
    protected function respond(int $status = 200, string $message = '', array $data = []): void
    {
        $payload = [
            'status' => $status,
            'message' => $message,
        ];

        if (!empty($data)) {
            $payload['data'] = $data;
        }

        $this->response = JsonResponder::write(new Response(), $status, $payload);
    }

    public function consumeResponse(): ?ResponseInterface
    {
        $response = $this->response;
        $this->response = null;

        return $response;
    }
}
