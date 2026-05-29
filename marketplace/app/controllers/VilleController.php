<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/VilleModel.php';

use App\Models\Ville;

/**
 * CRUD du referentiel ville.
 */
class VilleController extends Controller
{
    /**
     * Retourne la liste des villes.
     */
    public function index(): void
    {
        $this->respond(200, 'Liste des villes', Ville::getAll());
    }

    /**
     * Retourne une ville par identifiant.
     */
    public function show(int $id): void
    {
        $item = Ville::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ville introuvable');
            return;
        }

        $this->respond(200, 'Ville', $item);
    }

    /**
     * Cree une ville.
     */
    public function store(): void
    {
        $id = Ville::createRecord($_POST);
        $this->respond(201, 'Ville creee', ['id_ville' => $id]);
    }

    /**
     * Met a jour une ville.
     */
    public function update(int $id): void
    {
        $ok = Ville::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Ville mise a jour' : 'Echec de mise a jour');
    }

    /**
     * Supprime une ville.
     */
    public function destroy(int $id): void
    {
        $ok = Ville::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Ville supprimee' : 'Echec de suppression');
    }
}
