<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ProduitModel.php';

use App\Models\Produit;

/**
 * Controller pour la gestion du panier.
 * Fonctionne avec un panier en session pour visiteurs et clients authentifies.
 */
class CartController extends Controller
{
    /**
     * Retourne le panier courant avec ses lignes.
     */
    public function index(): void
    {
        $this->startSession();
        $lines = $_SESSION['cart'] ?? [];

        $detailed = [];
        foreach ($lines as $productId => $quantite) {
            $product = Produit::getById((int) $productId);
            if ($product === null) {
                continue;
            }

            $detailed[] = [
                'id_produit' => (int) $productId,
                'quantite' => (int) $quantite,
                'produit' => $product,
            ];
        }

        $this->respond(200, 'Panier session', [
            'nb_lignes' => count($detailed),
            'lines' => $detailed,
        ]);
    }

    /**
     * Ajoute ou met a jour une ligne dans le panier courant.
     */
    public function add(): void
    {
        $data = $_POST;

        if (empty($data['id_produit']) || empty($data['quantite'])) {
            $this->respond(400, 'id_produit et quantite sont requis');
            return;
        }

        $product = Produit::getById((int) $data['id_produit']);
        if ($product === null || !(bool) ($product['actif'] ?? false)) {
            $this->respond(404, 'Produit introuvable ou inactif');
            return;
        }

        $qtyToAdd = (int) $data['quantite'];
        if ($qtyToAdd < 1) {
            $this->respond(400, 'Quantite invalide');
            return;
        }

        $this->startSession();
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }

        $productId = (int) $data['id_produit'];
        $existingQty = (int) ($_SESSION['cart'][$productId] ?? 0);
        $_SESSION['cart'][$productId] = $existingQty + $qtyToAdd;

        $this->respond(201, 'Article ajoute au panier', ['id_produit' => $productId, 'quantite' => $_SESSION['cart'][$productId]]);
    }

    /**
     * Met a jour la quantite d'une ligne de panier.
     */
    public function updateLine(int $idProduit): void
    {
        $data = $_POST;

        if (empty($data['quantite']) || (int)$data['quantite'] < 1) {
            $this->respond(400, 'Quantite invalide');
            return;
        }

        $this->startSession();
        if (empty($_SESSION['cart'][$idProduit])) {
            $this->respond(404, 'Ligne de panier introuvable');
            return;
        }

        $_SESSION['cart'][$idProduit] = (int) $data['quantite'];

        $this->respond(200, 'Ligne mise a jour');
    }

    /**
     * Supprime une ligne de panier.
     */
    public function remove(int $idProduit): void
    {
        $this->startSession();
        if (isset($_SESSION['cart'][$idProduit])) {
            unset($_SESSION['cart'][$idProduit]);
            $this->respond(200, 'Article supprime du panier');
            return;
        }

        $this->respond(404, 'Article non present dans le panier');
    }

    /**
     * Demarre la session PHP si necessaire.
     */
    private function startSession(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }
}