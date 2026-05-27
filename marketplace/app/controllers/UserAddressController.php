<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/RUtilisateurAdresseModel.php';

use App\Models\RUtilisateurAdresse;

class UserAddressController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liaisons utilisateur-adresse', RUtilisateurAdresse::getAll());
    }

    public function indexByUtilisateur(int $idUtilisateur): void
    {
        $this->respond(200, 'Adresses de l utilisateur', RUtilisateurAdresse::getByUtilisateurId($idUtilisateur));
    }

    public function indexByAdresse(int $idAdresse): void
    {
        $this->respond(200, 'Utilisateurs de l adresse', RUtilisateurAdresse::getByAdresseId($idAdresse));
    }

    public function store(): void
    {
        $data = $_POST;
        if (empty($data['id_utilisateur']) || empty($data['id_adresse'])) {
            $this->respond(400, 'id_utilisateur et id_adresse sont requis');
            return;
        }

        $id = RUtilisateurAdresse::link((int) $data['id_utilisateur'], (int) $data['id_adresse']);
        $this->respond(201, 'Liaison creee', ['id' => $id]);
    }

    public function destroy(int $idUtilisateur, int $idAdresse): void
    {
        $ok = RUtilisateurAdresse::unlink($idUtilisateur, $idAdresse);
        $this->respond($ok ? 200 : 400, $ok ? 'Liaison supprimee' : 'Echec de suppression');
    }
}
