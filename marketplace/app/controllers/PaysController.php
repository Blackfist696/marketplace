<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PaysModel.php';

use App\Models\Pays;

/**
 * CRUD du referentiel pays.
 */
class PaysController extends Controller
{
    /**
     * Retourne la liste des pays.
     */
    public function index(): void
    {
        $this->respond(200, 'Liste des pays', Pays::getAll());
    }

    /**
     * Retourne un pays par identifiant.
     */
    public function show(int $id): void
    {
        $item = Pays::getById($id);
        if ($item === null) {
            $this->respond(404, 'Pays introuvable');
            return;
        }

        $this->respond(200, 'Pays', $item);
    }

    /**
     * Cree un pays.
     */
    public function store(): void
    {
        $id = Pays::createRecord($_POST);
        $this->respond(201, 'Pays cree', ['id_pays' => $id]);
    }

    /**
     * Met a jour un pays.
     */
    public function update(int $id): void
    {
        $ok = Pays::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Pays mis a jour' : 'Echec de mise a jour');
    }

    /**
     * Supprime un pays.
     */
    public function destroy(int $id): void
    {
        $ok = Pays::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Pays supprime' : 'Echec de suppression');
    }
}
