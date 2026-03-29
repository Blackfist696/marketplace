<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';

class HomeController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Accueil', ['message' => 'Bienvenue sur la marketplace artisanale']);
    }
}
