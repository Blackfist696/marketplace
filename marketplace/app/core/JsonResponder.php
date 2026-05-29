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
        $response->getBody()->write(json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

        return $response
            ->withStatus($status)
            ->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
