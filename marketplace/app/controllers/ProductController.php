<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ProduitModel.php';

use App\Models\Produit;

class ProductController extends Controller
{
    public function index(): void
    {
        $products = Produit::getAll();
        $this->respond(200, 'Liste des produits', $products);
    }

    public function show(int $id): void
    {
        $product = Produit::getById($id);

        if ($product === null) {
            $this->respond(404, 'Produit non trouvé');
            return;
        }

        $this->respond(200, 'Produit trouvé', $product);
    }

    public function store(array $data = []): void
    {
        $data = $data ?: $_POST;
        $id = Produit::createRecord($data);
        $this->respond(201, 'Produit créé', ['id_produit' => $id]);
    }

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
