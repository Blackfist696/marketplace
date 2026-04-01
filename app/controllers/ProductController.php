<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ProduitModel.php';

use App\Models\Produit;

/**
 * Controller pour les opérations CRUD sur les produits.
 */
class ProductController extends Controller
{
    /**
     * Retourne la liste des produits.
     */
    /**
     * Retourne la liste des produits.
     */
    public function index(): void
    {
        $products = Produit::getAll();
        $this->respond(200, 'Liste des produits', $products);
    }

    /**
     * Retourne un produit par son identifiant.
     *
     * @param int $id Identifiant du produit.
     */
    public function show(int $id): void
    {
        $product = Produit::getById($id);

        if ($product === null) {
            $this->respond(404, 'Produit non trouvé');
            return;
        }

        $this->respond(200, 'Produit trouvé', $product);
    }

    /**
     * Crée un nouveau produit.
     *
     * @param array $data Données du produit.
     */
    public function store(array $data = []): void
    {
        $data = $data ?: $_POST;
        $id = Produit::createRecord($data);
        $this->respond(201, 'Produit créé', ['id_produit' => $id]);
    }

    /**
     * Met à jour un produit existant.
     *
     * @param int $id Identifiant du produit.
     * @param array $data Données mises à jour.
     */
    public function update(int $id, array $data = []): void
    {
        $data = $data ?: $_POST;
        $success = Produit::updateRecord($id, $data);

        if (!$success) {
            $this->respond(400, 'Échec de la mise à jour');
            return;
        }

        $this->respond(200, 'Produit mis à jour');
    }

    /**
     * Supprime un produit.
     *
     * @param int $id Identifiant du produit.
     */
    public function destroy(int $id): void
    {
        $success = Produit::deleteRecord($id);

        if (!$success) {
            $this->respond(400, 'Échec de la suppression');
            return;
        }

        $this->respond(200, 'Produit supprimé');
    }
}
