<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/ArtisanModel.php';
require_once __DIR__ . '/../models/ProduitModel.php';
require_once __DIR__ . '/../models/CommandeModel.php';
require_once __DIR__ . '/../models/LigneCommandeModel.php';

use App\Models\Artisan;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\LigneCommande;

/**
 * Controller artisan : liste publique et espace prive artisan (regles 5 et 6).
 */
class ArtisanController extends Controller
{
    /**
     * Liste publique des artisans valides (lecture anonyme).
     */
    public function index(): void
    {
        $artisans = Artisan::getBy('valide', 1);
        $this->respond(200, 'Artisans', $artisans);
    }

    /**
     * Profil public d'un artisan (lecture anonyme).
     */
    public function show(int $id): void
    {
        $artisan = Artisan::getById($id);

        if ($artisan === null || !$artisan['valide']) {
            $this->respond(404, 'Artisan introuvable');
            return;
        }

        $this->respond(200, 'Artisan', $artisan);
    }

    /**
     * Liste des produits de l'artisan connecte (espace prive, regle 5).
     */
    public function myProducts(): void
    {
        if (!$userId = $this->requireRole(2)) {
            return;
        }

        $artisans = Artisan::getBy('id_utilisateur', $userId);
        if (empty($artisans)) {
            $this->respond(404, 'Profil artisan introuvable');
            return;
        }

        $artisanId = (int)$artisans[0]['id_artisan'];
        $products  = Produit::getBy('id_artisan', $artisanId);
        $this->respond(200, 'Mes produits', $products);
    }

    /**
     * Statistiques de ventes de l'artisan connecte (regle 6).
     * Filtres optionnels : date_debut, date_fin, id_produit, id_client.
     */
    public function stats(): void
    {
        if (!$userId = $this->requireRole(2)) {
            return;
        }

        $artisans = Artisan::getBy('id_utilisateur', $userId);
        if (empty($artisans)) {
            $this->respond(404, 'Profil artisan introuvable');
            return;
        }

        $artisanId = (int)$artisans[0]['id_artisan'];
        $filters   = $_GET;

        $stats = $this->buildArtisanStats($artisanId, $filters);
        $this->respond(200, 'Statistiques', $stats);
    }

    /**
     * Endpoint dashboard artisan (alias sur les statistiques).
     */
    public function dashboard(): void
    {
        $this->stats();
    }

    /**
     * Retourne les commandes visibles dans l'espace artisan.
     */
    public function orders(): void
    {
        if (!$userId = $this->requireRole(2)) {
            return;
        }

        $artisans = Artisan::getBy('id_utilisateur', $userId);
        if (empty($artisans)) {
            $this->respond(404, 'Profil artisan introuvable');
            return;
        }

        $artisanId = (int)$artisans[0]['id_artisan'];
        $filters   = $_GET;

        $orders = $this->buildStrictArtisanOrders($artisanId, $filters);
        $this->respond(200, 'Commandes artisan', $orders);
    }

    /**
     * Retourne uniquement les commandes contenant au moins un produit
     * appartenant a l'artisan connecte.
     */
    private function buildStrictArtisanOrders(int $artisanId, array $filters): array
    {
        $products = Produit::getBy('id_artisan', $artisanId);
        $productIds = array_map('intval', array_column($products, 'id_produit'));

        if (!empty($filters['id_produit'])) {
            $requestedProductId = (int) $filters['id_produit'];
            $productIds = in_array($requestedProductId, $productIds, true) ? [$requestedProductId] : [];
        }

        if (empty($productIds)) {
            return [];
        }

        $productIdsLookup = array_fill_keys($productIds, true);
        $lines = LigneCommande::getAll();

        $orderIdsLookup = [];
        foreach ($lines as $line) {
            $lineProductId = (int) ($line['id_produit'] ?? 0);
            if (!isset($productIdsLookup[$lineProductId])) {
                continue;
            }

            $orderId = (int) ($line['id_commande'] ?? 0);
            if ($orderId > 0) {
                $orderIdsLookup[$orderId] = true;
            }
        }

        if (empty($orderIdsLookup)) {
            return [];
        }

        $dateDebut = $filters['date_debut'] ?? null;
        $dateFin = $filters['date_fin'] ?? null;
        $idClient = isset($filters['id_client']) ? (int) $filters['id_client'] : null;
        $idCommande = isset($filters['id_commande']) ? (int) $filters['id_commande'] : null;

        $orders = Commande::getAll();
        $filteredOrders = array_filter($orders, function ($order) use ($orderIdsLookup, $dateDebut, $dateFin, $idClient, $idCommande) {
            $orderId = (int) ($order['id_commande'] ?? 0);
            if (!isset($orderIdsLookup[$orderId])) {
                return false;
            }

            if ($idCommande !== null && $orderId !== $idCommande) {
                return false;
            }

            if ($dateDebut && ($order['date_commande'] ?? '') < $dateDebut) {
                return false;
            }

            if ($dateFin && ($order['date_commande'] ?? '') > $dateFin . ' 23:59:59') {
                return false;
            }

            if ($idClient !== null && (int) ($order['id_utilisateur'] ?? 0) !== $idClient) {
                return false;
            }

            return true;
        });

        return array_values($filteredOrders);
    }

    private function buildArtisanStats(int $artisanId, array $filters): array
    {
        $products = Produit::getBy('id_artisan', $artisanId);
        $productIds = array_map('intval', array_column($products, 'id_produit'));

        if (!empty($filters['id_produit'])) {
            $requestedProductId = (int) $filters['id_produit'];
            $productIds = in_array($requestedProductId, $productIds, true) ? [$requestedProductId] : [];
        }

        $strictOrders = $this->buildStrictArtisanOrders($artisanId, $filters);

        return [
            'artisan_id'    => $artisanId,
            'nb_produits'   => count($products),
            'ids_produits'  => $productIds,
            'nb_commandes'  => count($strictOrders),
            'commandes'     => $strictOrders,
            'filtres'       => $filters,
        ];
    }

    private function requireRole(int $role): int|false
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return false;
        }

        $userRole = $_SESSION['user_role'] ?? null;

        if ($userRole != $role && $userRole != 1) {
            $this->respond(403, 'Acces interdit');
            return false;
        }

        return (int)$_SESSION['user_id'];
    }
}