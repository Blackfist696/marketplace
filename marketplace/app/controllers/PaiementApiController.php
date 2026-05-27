<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PaiementModel.php';

use App\Models\Paiement;

class PaiementApiController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des paiements', Paiement::getAll());
    }

    public function show(int $id): void
    {
        $item = Paiement::getById($id);
        if ($item === null) {
            $this->respond(404, 'Paiement introuvable');
            return;
        }

        $this->respond(200, 'Paiement', $item);
    }

    public function store(): void
    {
        $data = $_POST;
        if (!isset($data['date_paiement']) && (($data['statut'] ?? '') === 'valide')) {
            $data['date_paiement'] = date('Y-m-d H:i:s');
        }

        $id = Paiement::createRecord($data);
        $this->respond(201, 'Paiement cree', ['id_paiement' => $id]);
    }

    public function update(int $id): void
    {
        $data = $_POST;
        if (!isset($data['date_paiement']) && (($data['statut'] ?? '') === 'valide')) {
            $data['date_paiement'] = date('Y-m-d H:i:s');
        }

        $ok = Paiement::updateRecord($id, $data);
        $this->respond($ok ? 200 : 400, $ok ? 'Paiement mis a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $ok = Paiement::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Paiement supprime' : 'Echec de suppression');
    }
}
