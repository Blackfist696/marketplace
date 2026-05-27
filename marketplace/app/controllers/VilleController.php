<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/VilleModel.php';

use App\Models\Ville;

class VilleController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des villes', Ville::getAll());
    }

    public function show(int $id): void
    {
        $item = Ville::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ville introuvable');
            return;
        }

        $this->respond(200, 'Ville', $item);
    }

    public function store(): void
    {
        $id = Ville::createRecord($_POST);
        $this->respond(201, 'Ville creee', ['id_ville' => $id]);
    }

    public function update(int $id): void
    {
        $ok = Ville::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Ville mise a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $ok = Ville::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Ville supprimee' : 'Echec de suppression');
    }
}
