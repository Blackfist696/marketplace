<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ContactController
{
    private const CONTACT_INFO = [
        'name' => 'Épicerie BIO NATURE',
        'email' => 'contact@epiceribio.be',
        'phone' => '01 23 45 67 89',
        'address' => '123 Rue du Marché',
        'city' => 'Liège 4000',
        'hours' => [
            'Lundi - Vendredi: 8h00 - 19h00',
            'Samedi: 9h00 - 18h00',
            'Dimanche: 10h00 - 12h30'
        ]
    ];

    public function index(Request $request, Response $response): Response
    {
        // HTML view removed — use /api/contact
        $payload = json_encode(['error' => 'HTML views removed, use /api/contact'], JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8')->withStatus(410);
    }

    // API: retourner les informations de contact en JSON
    public function apiIndex(Request $request, Response $response): Response
    {
        $data = self::CONTACT_INFO;
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }

    // API: réception d'un message de contact (placeholder)
    public function apiSend(Request $request, Response $response): Response
    {
        $body = $request->getParsedBody();
        // Ici vous pouvez traiter/valider/sauvegarder le message
        $data = ['success' => true, 'received' => $body];
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
