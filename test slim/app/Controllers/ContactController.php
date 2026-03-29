<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ContactController
{
    private const CONTACT_INFO = [
        'name' => 'Épicerie BIO NATURE',
        'email' => 'contact@epiceribio.fr',
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
        // Démarrer le buffering
        ob_start();
        
        // Variables pour la vue
        $pageTitle = 'Contact - Épicerie BIO NATURE';
        $contactInfo = self::CONTACT_INFO;
        
        // Inclure le contenu
        include __DIR__ . '/../Views/contact.php';
        $mainContent = ob_get_clean();
        
        // Démarrer le buffering pour le layout
        ob_start();
        include __DIR__ . '/../Views/layout.php';
        $output = ob_get_clean();
        
        $response->getBody()->write($output);
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }
}
