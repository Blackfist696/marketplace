<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';

use App\Models\Utilisateur;

/**
 * Controller gerant l'authentification et l'inscription utilisateur.
 */
class AuthController extends Controller
{
    /**
     * Affiche la structure du formulaire de connexion.
     */
    public function loginForm(): void
    {
        $this->respond(200, 'Formulaire de connexion', ['fields' => ['email', 'mot_de_passe']]);
    }

    /**
     * Traite la connexion d'un utilisateur.
     */
    public function login(): void
    {
        $data = $_POST;

        if (empty($data['email']) || empty($data['mot_de_passe'])) {
            $this->respond(400, 'Email et mot de passe requis');
            return;
        }

        $users = Utilisateur::getBy('email', $data['email']);
        $user  = $users[0] ?? null;

        if ($user === null || !$user['actif']) {
            $this->respond(401, 'Identifiants invalides');
            return;
        }

        if (!password_verify($data['mot_de_passe'], $user['mot_de_passe'])) {
            $this->respond(401, 'Identifiants invalides');
            return;
        }

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION['user_id']   = $user['id_utilisateur'];
        $_SESSION['user_role'] = $user['id_role'];

        $this->respond(200, 'Connexion reussie', ['id_utilisateur' => $user['id_utilisateur']]);
    }

    /**
     * Traite la deconnexion.
     */
    public function logout(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION = [];
        session_destroy();

        $this->respond(200, 'Deconnexion effectuee');
    }

    /**
     * Affiche la structure du formulaire d'inscription.
     */
    public function registerForm(): void
    {
        $this->respond(200, "Formulaire d'inscription", ['fields' => ['email', 'mot_de_passe', 'id_role']]);
    }

    /**
     * Traite l'inscription d'un nouvel utilisateur.
     */
    public function register(): void
    {
        $data = $_POST;

        if (empty($data['email']) || empty($data['mot_de_passe']) || empty($data['id_role'])) {
            $this->respond(400, 'Champs requis manquants');
            return;
        }

        $existing = Utilisateur::getBy('email', $data['email']);
        if (!empty($existing)) {
            $this->respond(409, 'Cet email est deja utilise');
            return;
        }

        $data['mot_de_passe'] = password_hash($data['mot_de_passe'], PASSWORD_BCRYPT);
        $data['actif']        = 1;

        $id = Utilisateur::createRecord($data);
        $this->respond(201, 'Utilisateur inscrit', ['id_utilisateur' => $id]);
    }
}