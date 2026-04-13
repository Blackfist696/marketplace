<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ProduitModel.php';

use App\Models\Produit;

/**
 * Controller pour les operations CRUD sur les produits.
 * Lecture libre, ecriture reservee aux artisans et admins.
 */
class ProductController extends Controller
{
    /**
     * Retourne la liste des produits actifs (public).
     */
    public function index(): void
    {
        $products = Produit::getBy('actif', 1);
        $this->respond(200, 'Liste des produits', $products);
    }

    /**
     * Retourne un produit par son identifiant (public).
     */
    public function show(int $id): void
    {
        $product = Produit::getById($id);

        if ($product === null || !$product['actif']) {
            $this->respond(404, 'Produit non trouve');
            return;
        }

        $this->respond(200, 'Produit', $product);
    }

    /**
     * Retourne les produits d'un artisan specifique (public).
     */
    public function indexByArtisan(int $artisan_id): void
    {
        $products = Produit::getBy('id_artisan', $artisan_id);
        $active   = array_values(array_filter($products, fn($p) => $p['actif']));
        $this->respond(200, 'Produits de l\'artisan', $active);
    }

    /**
     * Cree un produit (artisan connecte uniquement).
     */
    public function store(): void
    {
        if (!$this->requireRole([2])) {
            return;
        }

        $data = $_POST;
        $data['actif'] = 1;
        $id = Produit::createRecord($data);
        $this->respond(201, 'Produit cree', ['id_produit' => $id]);
    }

    /**
     * Met a jour un produit (artisan proprietaire ou admin).
     */
    public function update(int $id): void
    {
        if (!$this->requireAuth()) {
            return;
        }

        $product = Produit::getById($id);
        if ($product === null) {
            $this->respond(404, 'Produit non trouve');
            return;
        }

        if (!$this->requireOwnerOrAdmin((int)$product['id_artisan'])) {
            return;
        }

        $data = $_POST;
        $success = Produit::updateRecord($id, $data);

        if (!$success) {
            $this->respond(400, 'Echec de la mise a jour');
            return;
        }

        $this->respond(200, 'Produit mis a jour');
    }

    /**
     * Marque un produit comme inactif / supprime (artisan ou admin).
     */
    public function destroy(int $id): void
    {
        if (!$this->requireAuth()) {
            return;
        }

        $product = Produit::getById($id);
        if ($product === null) {
            $this->respond(404, 'Produit non trouve');
            return;
        }

        if (!$this->requireOwnerOrAdmin((int)$product['id_artisan'])) {
            return;
        }

        $success = Produit::updateRecord($id, ['actif' => 0]);

        if (!$success) {
            $this->respond(400, 'Echec de la suppression');
            return;
        }

        $this->respond(200, 'Produit desactive');
    }

    // ── Helpers de session ────────────────────────────────────────────────

    private function requireAuth(): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        return true;
    }

    private function requireRole(array $allowedRoles): bool
    {
        if (!$this->requireAuth()) {
            return false;
        }

        $roleId = $_SESSION['user_role'] ?? null;

        if (!in_array($roleId, $allowedRoles, true) && $roleId != 1) {
            $this->respond(403, 'Acces interdit');
            return false;
        }

        return true;
    }

    private function requireOwnerOrAdmin(int $artisanId): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $roleId  = $_SESSION['user_role'] ?? null;
        $isAdmin = ($roleId == 1);

        if (!$isAdmin && (int)$_SESSION['user_id'] !== $artisanId) {
            $this->respond(403, 'Acces interdit');
            return false;
        }

        return true;
    }
}