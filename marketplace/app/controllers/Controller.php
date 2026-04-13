<?php
namespace App\Controllers;

use App\View\JsonView;

/**
 * Base controller permettant de renvoyer des réponses JSON standardisées.
 */
abstract class Controller
{
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

        JsonView::render($payload, $status);
    }
}
