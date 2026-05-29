<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ClasseModel.php';

use App\Models\Classe;

/**
 * Gere les liaisons categorie-produit (table de jointure classe).
 */
class ClasseController extends Controller
{
    /**
     * Liste toutes les liaisons categorie-produit.
     */
    public function index(): void
    {
        $this->respond(200, 'Liste des classes', Classe::getAll());
    }

    /**
     * Liste les liaisons d'une categorie.
     */
    public function indexByCategorie(int $idCategorie): void
    {
        $this->respond(200, 'Classes par categorie', Classe::getByCategorieId($idCategorie));
    }

    /**
     * Liste les liaisons d'un produit.
     */
    public function indexByProduit(int $idProduit): void
    {
        $this->respond(200, 'Classes par produit', Classe::getByProduitId($idProduit));
    }

    /**
     * Cree une relation categorie-produit.
     */
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

    /**
     * Supprime une relation categorie-produit.
     */
    public function destroy(int $idCategorie, int $idProduit): void
    {
        $ok = Classe::unlink($idCategorie, $idProduit);
        $this->respond($ok ? 200 : 400, $ok ? 'Relation supprimee' : 'Echec de suppression');
    }
}
