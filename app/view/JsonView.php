<?php

namespace App\View;

/**
 * Vue JSON pour retourner les réponses HTTP au format JSON.
 */
class JsonView
{
    /**
     * Rende un payload JSON et envoie le code HTTP associé.
     *
     * @param array $payload Données à sérialiser en JSON.
     * @param int $status Code HTTP de la réponse.
     */
    public static function render(array $payload, int $status = 200): void
    {
        if (!headers_sent()) {
            header('Content-Type: application/json; charset=utf-8', true, $status);
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}
