<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PanierModel.php';
require_once __DIR__ . '/../models/LignePanierModel.php';

use App\Models\Panier;
use App\Models\LignePanier;

class CartController extends Controller
{
    public function index(): void
    {
        $carts = Panier::getAll();
        $this->respond(200, 'Paniers', $carts);
    }

    public function add(array $data = []): void
    {
        $data = $data ?: $_POST;
        $id = LignePanier::createRecord($data);
        $this->respond(201, 'Article ajouté au panier', ['id_ligne' => $id]);
    }

    public function remove(int $id): void
    {
        $success = LignePanier::deleteRecord($id);

        if (!$success) {
            $this->respond(400, 'Échec de la suppression du panier');
            return;
        }

        $this->respond(200, 'Article supprimé du panier');
    }
}
