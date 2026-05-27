<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/LigneCommandeModel.php';

use App\Models\LigneCommande;

class LigneCommandeController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des lignes de commande', LigneCommande::getAll());
    }

    public function show(int $id): void
    {
        $item = LigneCommande::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ligne de commande introuvable');
            return;
        }

        $this->respond(200, 'Ligne de commande', $item);
    }

    public function indexByCommande(int $idCommande): void
    {
        $this->respond(200, 'Lignes de la commande', LigneCommande::getBy('id_commande', $idCommande));
    }

    public function store(): void
    {
        $id = LigneCommande::createRecord($_POST);
        $this->respond(201, 'Ligne de commande creee', ['id_ligne_commande' => $id]);
    }

    public function update(int $id): void
    {
        $ok = LigneCommande::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Ligne de commande mise a jour' : 'Echec de mise a jour');
    }

    public function destroy(int $id): void
    {
        $ok = LigneCommande::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Ligne de commande supprimee' : 'Echec de suppression');
    }
}
