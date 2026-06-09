<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/RUtilisateurAdresseModel.php';
require_once __DIR__ . '/../models/AdresseModel.php';
require_once __DIR__ . '/../models/VilleModel.php';

use App\Models\Adresse;
use App\Models\RUtilisateurAdresse;
use App\Models\Ville;

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

        $this->respond(200, 'Mes adresses', Adresse::getByUtilisateurId($sessionUser['user_id']));
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
            if (empty($data['rue'])) {
                $this->respond(400, 'Rue est requise pour creer une adresse');
                return;
            }

            if (!empty($data['id_ville'])) {
                $idVille = (int) $data['id_ville'];
            } elseif (!empty($data['code_postal'])) {
                $villes = Ville::getBy('code_postal', $data['code_postal']);
                if (empty($villes)) {
                    $this->respond(400, 'Code postal invalide ou ville introuvable');
                    return;
                }
                $idVille = (int) $villes[0]['id_ville'];
            } else {
                $this->respond(400, 'id_ville ou code_postal est requis pour creer une adresse');
                return;
            }

            $addressPayload = [
                'rue' => $data['rue'],
                'id_ville' => $idVille,
                'type_adresse' => $data['type_adresse'] ?? 'livraison',
                'principale' => 1,
            ];

            if (!empty($data['complement'])) {
                $addressPayload['complement'] = $data['complement'];
            }

            try {
                $data['id_adresse'] = Adresse::createRecord($addressPayload);
            } catch (\Exception $exception) {
                $this->respond(400, 'Impossible de creer l adresse: ' . $exception->getMessage());
                return;
            }
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
        $this->respond(201, 'Liaison creee', ['id_adresse' => (int) $data['id_adresse']]);
    }

    /**
     * Met a jour une adresse existante pour l'utilisateur courant.
     */
    public function update(int $idUtilisateur, int $idAdresse): void
    {
        $sessionUser = $this->requireSessionUser();
        if ($sessionUser === false) {
            return;
        }

        if ($sessionUser['role_id'] !== 1 && $sessionUser['user_id'] !== $idUtilisateur) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $address = Adresse::getById($idAdresse);
        if ($address === null) {
            $this->respond(404, 'Adresse introuvable');
            return;
        }

        $data = $_POST;
        $payload = [
            'rue' => $data['rue'] ?? $address['rue'] ?? '',
            'type_adresse' => $data['type_adresse'] ?? $address['type_adresse'] ?? 'livraison',
            'principale' => $data['principale'] ?? $address['principale'] ?? 1,
            'id_ville' => $data['id_ville'] ?? $address['id_ville'] ?? null,
        ];

        if (!empty($data['code_postal'])) {
            $villes = Ville::getBy('code_postal', $data['code_postal']);
            if (empty($villes)) {
                $this->respond(400, 'Code postal invalide ou ville introuvable');
                return;
            }
            $payload['id_ville'] = (int) $villes[0]['id_ville'];
        }

        if (!empty($data['complement'])) {
            $payload['complement'] = $data['complement'];
        } elseif (array_key_exists('complement', $address)) {
            $payload['complement'] = $address['complement'];
        }

        if (empty($payload['rue']) || empty($payload['type_adresse']) || empty($payload['id_ville'])) {
            $this->respond(400, 'Rue, type d adresse et ville sont requis');
            return;
        }

        try {
            Adresse::updateRecord($idAdresse, $payload);
            $this->respond(200, 'Adresse mise a jour', ['id_adresse' => $idAdresse]);
        } catch (\Exception $exception) {
            $this->respond(400, 'Impossible de mettre a jour l adresse: ' . $exception->getMessage());
        }
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
