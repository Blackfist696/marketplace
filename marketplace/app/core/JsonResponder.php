<?php

namespace App\Core;

use Psr\Http\Message\ResponseInterface;

/**
 * Utilitaire de réponse JSON normalisée pour les contrôleurs et middlewares.
 *
 * Il fournit un point unique pour produire des réponses homogènes, avec un
 * format stable exploitable par le frontend et les clients API.
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
