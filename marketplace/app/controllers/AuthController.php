<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';

use App\Models\Utilisateur;

class AuthController extends Controller
{
    public function loginForm(): void
    {
        $this->respond(200, 'Formulaire de connexion', ['fields' => ['email', 'mot_de_passe']]);
    }

    public function login(array $data = []): void
    {
        $data = $data ?: $_POST;

        if (empty($data['email']) || empty($data['mot_de_passe'])) {
            $this->respond(400, 'Email et mot de passe requis');
            return;
        }

        $users = Utilisateur::getBy('email', $data['email']);
        $user = $users[0] ?? null;

        if ($user === null || $user['mot_de_passe'] !== $data['mot_de_passe']) {
            $this->respond(401, 'Identifiants invalides');
            return;
        }

        $this->respond(200, 'Connexion réussie', ['id_utilisateur' => $user['id_utilisateur']]);
    }

    public function logout(): void
    {
        $this->respond(200, 'Déconnexion effectuée');
    }

    public function registerForm(): void
    {
        $this->respond(200, 'Formulaire d’inscription', ['fields' => ['email', 'mot_de_passe', 'id_role']]);
    }

    public function register(array $data = []): void
    {
        $data = $data ?: $_POST;

        if (empty($data['email']) || empty($data['mot_de_passe']) || empty($data['id_role'])) {
            $this->respond(400, 'Champs requis manquants');
            return;
        }

        $id = Utilisateur::createRecord($data);
        $this->respond(201, 'Utilisateur inscrit', ['id_utilisateur' => $id]);
    }
}
