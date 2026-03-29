<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class HomeController
{
    public function index(Request $request, Response $response): Response
    {
        // Démarrer le buffering
        ob_start();
        
        // Variables pour la vue
        $pageTitle = 'Accueil - Épicerie BIO NATURE';
        
        // Inclure le contenu de la page
        include __DIR__ . '/../Views/home.php';
        $mainContent = ob_get_clean();
        
        // Démarrer le buffering pour le layout
        ob_start();
        include __DIR__ . '/../Views/layout.php';
        $output = ob_get_clean();
        
        $response->getBody()->write($output);
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }
}
