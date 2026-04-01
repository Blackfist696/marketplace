<?php

namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PanierModel.php';
require_once __DIR__ . '/../models/LignePanierModel.php';

use App\Models\Panier;
use App\Models\LignePanier;

/**
 * Controller pour la gestion du panier.
 */
class CartController extends Controller
{
    /**
     * Retourne la liste des paniers.
     */
    public function index(): void
    {
        $carts = Panier::getAll();
        $this->respond(200, 'Paniers', $carts);
    }

    /**
     * Ajoute une ligne au panier.
     *
     * @param array $data Données de la ligne de panier.
     */
    public function add(array $data = []): void
    {
        $data = $data ?: $_POST;
        $id = LignePanier::createRecord($data);
        $this->respond(201, 'Article ajouté au panier', ['id_ligne' => $id]);
    }

    /**
     * Supprime une ligne de panier.
     *
     * @param int $id Identifiant de la ligne de panier.
     */
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
