<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';
require_once __DIR__ . '/../models/ArtisanModel.php';
require_once __DIR__ . '/../models/ProduitModel.php';
require_once __DIR__ . '/../models/CommandeModel.php';

use App\Models\Utilisateur;
use App\Models\Artisan;
use App\Models\Produit;
use App\Models\Commande;

/**
 * Controller administration (role admin requis, regles 7 et 8).
 */
class AdminController extends Controller
{
    // ── Utilisateurs ─────────────────────────────────────────────────────────

    public function users(): void
    {
        if (!$this->requireAdmin()) { return; }
        $this->respond(200, 'Utilisateurs', Utilisateur::getAll());
    }

    public function showUser(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $user = Utilisateur::getById($id);
        if ($user === null) { $this->respond(404, 'Utilisateur introuvable'); return; }
        $this->respond(200, 'Utilisateur', $user);
    }

    public function updateUser(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $data = $_POST;
        unset($data['mot_de_passe']);
        $success = Utilisateur::updateRecord($id, $data);
        $this->respond($success ? 200 : 400, $success ? 'Utilisateur mis a jour' : 'Echec');
    }

    /**
     * Desactive un compte client (on n'efface jamais, regle 7 + regle 4).
     */
    public function deactivateUser(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Utilisateur::updateRecord($id, ['actif' => 0]);
        $this->respond($success ? 200 : 400, $success ? 'Utilisateur desactive' : 'Echec');
    }

    // ── Artisans ─────────────────────────────────────────────────────────────

    public function artisans(): void
    {
        if (!$this->requireAdmin()) { return; }
        $this->respond(200, 'Artisans', Artisan::getAll());
    }

    public function showArtisan(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $artisan = Artisan::getById($id);
        if ($artisan === null) { $this->respond(404, 'Artisan introuvable'); return; }
        $this->respond(200, 'Artisan', $artisan);
    }

    public function updateArtisan(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Artisan::updateRecord($id, $_POST);
        $this->respond($success ? 200 : 400, $success ? 'Artisan mis a jour' : 'Echec');
    }

    /**
     * Invalide un artisan (rend inactif sans suppression).
     */
    public function deactivateArtisan(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Artisan::updateRecord($id, ['valide' => 0]);
        $this->respond($success ? 200 : 400, $success ? 'Artisan desactive' : 'Echec');
    }

    // ── Produits ─────────────────────────────────────────────────────────────

    public function products(): void
    {
        if (!$this->requireAdmin()) { return; }
        $this->respond(200, 'Produits', Produit::getAll());
    }

    public function updateProduct(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Produit::updateRecord($id, $_POST);
        $this->respond($success ? 200 : 400, $success ? 'Produit mis a jour' : 'Echec');
    }

    public function deactivateProduct(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Produit::updateRecord($id, ['actif' => 0]);
        $this->respond($success ? 200 : 400, $success ? 'Produit desactive' : 'Echec');
    }

    // ── Statistiques avancees (regle 8) ───────────────────────────────────────

    /**
     * Statistiques globales avec filtres : date_debut, date_fin, id_produit,
     * id_artisan, id_client, nom (partiel sur nom_boutique ou nom personne).
     */
    public function stats(): void
    {
        if (!$this->requireAdmin()) { return; }

        $filters = $_GET;

        $orders    = Commande::getAll();
        $artisans  = Artisan::getAll();
        $products  = Produit::getAll();
        $users     = Utilisateur::getAll();

        $filteredOrders = array_filter($orders, function ($order) use ($filters) {
            if (!empty($filters['date_debut']) && $order['date_commande'] < $filters['date_debut']) {
                return false;
            }
            if (!empty($filters['date_fin']) && $order['date_commande'] > $filters['date_fin'] . ' 23:59:59') {
                return false;
            }
            if (!empty($filters['id_client']) && (int)$order['id_utilisateur'] !== (int)$filters['id_client']) {
                return false;
            }
            return true;
        });

        $filteredProducts = array_filter($products, function ($p) use ($filters) {
            if (!empty($filters['id_artisan']) && (int)$p['id_artisan'] !== (int)$filters['id_artisan']) {
                return false;
            }
            if (!empty($filters['id_produit']) && (int)$p['id_produit'] !== (int)$filters['id_produit']) {
                return false;
            }
            if (!empty($filters['nom']) && stripos($p['nom'], $filters['nom']) === false) {
                return false;
            }
            return true;
        });

        $filteredArtisans = array_filter($artisans, function ($a) use ($filters) {
            if (!empty($filters['nom']) && stripos($a['nom_boutique'], $filters['nom']) === false) {
                return false;
            }
            if (!empty($filters['id_artisan']) && (int)$a['id_artisan'] !== (int)$filters['id_artisan']) {
                return false;
            }
            return true;
        });

        $this->respond(200, 'Statistiques admin', [
            'nb_utilisateurs' => count($users),
            'nb_artisans'     => count($artisans),
            'nb_produits'     => count($products),
            'nb_commandes'    => count($filteredOrders),
            'commandes'       => array_values($filteredOrders),
            'produits'        => array_values($filteredProducts),
            'artisans'        => array_values($filteredArtisans),
            'filtres'         => $filters,
        ]);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private function requireAdmin(): bool
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        if ($_SESSION['user_role'] != 1) {
            $this->respond(403, 'Acces reserve aux administrateurs');
            return false;
        }

        return true;
    }
}