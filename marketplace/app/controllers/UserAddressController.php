<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/RUtilisateurAdresseModel.php';

use App\Models\RUtilisateurAdresse;

/**
 * API de gestion des liaisons utilisateur-adresse.
 */
class UserAddressController extends Controller
{
    /**
     * Liste les liaisons visibles pour l'utilisateur courant.
     */
    public function index(): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] === 1) {
            $this->respond(200, 'Liaisons utilisateur-adresse', RUtilisateurAdresse::getAll());
            return;
        }

        $this->respond(200, 'Mes adresses', RUtilisateurAdresse::getByUtilisateurId($sessionUser['user_id']));
    }

    /**
     * Retourne les adresses d'un utilisateur donne.
     */
    public function indexByUtilisateur(int $idUtilisateur): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] !== 1 && $sessionUser['user_id'] !== $idUtilisateur) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Adresses de l utilisateur', RUtilisateurAdresse::getByUtilisateurId($idUtilisateur));
    }

    /**
     * Retourne les utilisateurs lies a une adresse (admin uniquement).
     */
    public function indexByAdresse(int $idAdresse): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] !== 1) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Utilisateurs de l adresse', RUtilisateurAdresse::getByAdresseId($idAdresse));
    }

    /**
     * Cree une liaison utilisateur-adresse.
     */
    public function store(): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        $data = $_POST;
        if (empty($data['id_adresse'])) {
            $this->respond(400, 'id_adresse est requis');
            return;
        }

        if ($sessionUser['role_id'] === 1) {
            if (empty($data['id_utilisateur'])) {
                $this->respond(400, 'id_utilisateur est requis pour un administrateur');
                return;
            }
            $targetUserId = (int) $data['id_utilisateur'];
        } else {
            $targetUserId = $sessionUser['user_id'];
            if (!empty($data['id_utilisateur']) && (int) $data['id_utilisateur'] !== $targetUserId) {
                $this->respond(403, 'Acces interdit');
                return;
            }
        }

        $id = RUtilisateurAdresse::link($targetUserId, (int) $data['id_adresse']);
        $this->respond(201, 'Liaison creee', ['id' => $id]);
    }

    /**
     * Supprime une liaison utilisateur-adresse.
     */
    public function destroy(int $idUtilisateur, int $idAdresse): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] !== 1 && $sessionUser['user_id'] !== $idUtilisateur) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $ok = RUtilisateurAdresse::unlink($idUtilisateur, $idAdresse);
        $this->respond($ok ? 200 : 400, $ok ? 'Liaison supprimee' : 'Echec de suppression');
    }

    /**
     * Construit le contexte utilisateur depuis la session active.
     *
     * @return array{user_id:int,role_id:int}|false
     */
    private function requireSessionUser(): array|false
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        return [
            'user_id' => (int) $_SESSION['user_id'],
            'role_id' => (int) ($_SESSION['user_role'] ?? 0),
        ];
    }
}
