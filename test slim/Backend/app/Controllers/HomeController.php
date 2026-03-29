<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController
{
    public function index(Request $request, Response $response): Response
    {
        // Méthode HTML supprimée — utilisez l'API JSON `/api/home`
        $payload = json_encode(['error' => 'HTML views removed, use /api/home'], JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8')->withStatus(410);
    }

    // API: retourner des informations d'accueil en JSON
    public function apiIndex(Request $request, Response $response): Response
    {
        $data = [
            'title' => 'Accueil - Épicerie BIO NATURE',
            'message' => 'Bienvenue sur l\'API de l\'épicerie'
        ];
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
