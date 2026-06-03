<?php

namespace App\Core;

use Psr\Http\Message\ResponseInterface;

/**
 * Utilitaire de reponse JSON normalisee pour les controleurs/middlewares.
 */
final class JsonResponder
{
    /**
     * Ecrit un payload JSON et fixe le status HTTP + le Content-Type.
     */
    public static function write(ResponseInterface $response, int $status, array $payload): ResponseInterface
    {
        // Choix UNESCAPED_* pour des logs/API plus lisibles (UTF-8 et URLs intactes).
        $response->getBody()->write(json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return $response
            ->withStatus($status)
            // Contrat explicite pour le frontend et les clients API.
            ->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
