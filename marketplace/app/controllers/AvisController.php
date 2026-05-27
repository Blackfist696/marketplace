<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/AvisModel.php';

use App\Models\Avis;

class AvisController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des avis', Avis::getAll());
    }

    public function show(int $id): void
    {
        $item = Avis::getById($id);
        if ($item === null) {
            $this->respond(404, 'Avis introuvable');
            return;
        }

        $this->respond(200, 'Avis', $item);
    }

    public function indexByProduit(int $idProduit): void
    {
        $this->respond(200, 'Avis du produit', Avis::getBy('id_produit', $idProduit));
    }

    public function store(): void
    {
        $data = $_POST;
        if (!isset($data['date_avis'])) {
            $data['date_avis'] = date('Y-m-d H:i:s');
        }

        $id = Avis::createRecord($data);
        $this->respond(201, 'Avis cree', ['id_avis' => $id]);
    }

    public function update(int $id): void
    {
        $ok = Avis::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Avis mis a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $ok = Avis::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Avis supprime' : 'Echec de suppression');
    }
}
