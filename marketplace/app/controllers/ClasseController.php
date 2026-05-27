<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ClasseModel.php';

use App\Models\Classe;

class ClasseController extends Controller
{
    public function index(): void
    {
        $this->respond(200, 'Liste des classes', Classe::getAll());
    }

    public function indexByCategorie(int $idCategorie): void
    {
        $this->respond(200, 'Classes par categorie', Classe::getByCategorieId($idCategorie));
    }

    public function indexByProduit(int $idProduit): void
    {
        $this->respond(200, 'Classes par produit', Classe::getByProduitId($idProduit));
    }

    public function store(): void
    {
        $data = $_POST;
        if (empty($data['id_categorie']) || empty($data['id_produit'])) {
            $this->respond(400, 'id_categorie et id_produit sont requis');
            return;
        }

        $id = Classe::link((int) $data['id_categorie'], (int) $data['id_produit']);
        $this->respond(201, 'Relation categorie-produit creee', ['id' => $id]);
    }

    public function destroy(int $idCategorie, int $idProduit): void
    {
        $ok = Classe::unlink($idCategorie, $idProduit);
        $this->respond($ok ? 200 : 400, $ok ? 'Relation supprimee' : 'Echec de suppression');
    }
}
