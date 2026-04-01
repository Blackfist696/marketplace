<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';

use App\Models\Utilisateur;

/**
 * Controller gérant l'authentification et l'inscription utilisateur.
 */
class AuthController extends Controller
{
    /**
     * Affiche la structure du formulaire de connexion.
     */
    /**
     * Affiche la structure du formulaire de connexion.
     */
    public function loginForm(): void
    {
        $this->respond(200, 'Formulaire de connexion', ['fields' => ['email', 'mot_de_passe']]);
    }

    /**
     * Traite la connexion d'un utilisateur.
     *
     * @param array $data Données de connexion.
     */
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

    /**
     * Traite la déconnexion.
     */
    public function logout(): void
    {
        $this->respond(200, 'Déconnexion effectuée');
    }

    /**
     * Affiche la structure du formulaire d'inscription.
     */
    public function registerForm(): void
    {
        $this->respond(200, 'Formulaire d’inscription', ['fields' => ['email', 'mot_de_passe', 'id_role']]);
    }

    /**
     * Traite l'inscription d'un nouvel utilisateur.
     *
     * @param array $data Données d'inscription.
     */
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
