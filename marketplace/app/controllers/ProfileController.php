<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';
require_once __DIR__ . '/../models/PersonneModel.php';
require_once __DIR__ . '/../models/AdresseModel.php';

use App\Models\Utilisateur;
use App\Models\Personne;
use App\Models\Adresse;

/**
 * Controller pour le profil du client authentifie (regle metier 4).
 */
class ProfileController extends Controller
{
    /**
     * Retourne le profil complet du client connecte.
     */
    public function show(): void
    {
        if (!$userId = $this->requireAuth()) {
            return;
        }

        $user     = Utilisateur::getById($userId);
        $personnes = Personne::getBy('id_utilisateur', $userId);
        $personne = $personnes[0] ?? null;
        $addresses = $personne ? Adresse::getBy('id_personne', $personne['id_personne']) : [];

        $this->respond(200, 'Profil', [
            'utilisateur' => $user,
            'personne'    => $personne,
            'adresses'    => $addresses,
        ]);
    }

    /**
     * Met a jour le profil du client connecte.
     */
    public function update(): void
    {
        if (!$userId = $this->requireAuth()) {
            return;
        }

        $data = $_POST;
        $personneData = [];
        $personneFields = ['nom', 'prenom', 'telephone'];

        foreach ($personneFields as $field) {
            if (isset($data[$field])) {
                $personneData[$field] = $data[$field];
                unset($data[$field]);
            }
        }

        if (!empty($data['mot_de_passe'])) {
            $data['mot_de_passe'] = password_hash($data['mot_de_passe'], PASSWORD_BCRYPT);
        }

        unset($data['id_role'], $data['actif'], $data['date_inscription']);

        if (!empty($data)) {
            Utilisateur::updateRecord($userId, $data);
        }

        if (!empty($personneData)) {
            $personnes = Personne::getBy('id_utilisateur', $userId);
            if (!empty($personnes)) {
                Personne::updateRecord((int)$personnes[0]['id_personne'], $personneData);
            }
        }

        $this->respond(200, 'Profil mis a jour');
    }

    /**
     * Marque le compte comme inactif — on n'efface jamais un compte client (regle 4).
     */
    public function deactivate(): void
    {
        if (!$userId = $this->requireAuth()) {
            return;
        }

        Utilisateur::updateRecord($userId, ['actif' => 0]);

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $_SESSION = [];
        session_destroy();

        $this->respond(200, 'Compte desactive');
    }

    private function requireAuth(): int|false
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        return (int)$_SESSION['user_id'];
    }
}