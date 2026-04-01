<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';

/**
 * Controller pour la page d'accueil.
 */
class HomeController extends Controller
{
    /**
     * Affiche la page d'accueil.
     */
    public function index(): void
    {
        $this->respond(200, 'Accueil', ['message' => 'Bienvenue sur la marketplace artisanale']);
    }
}
