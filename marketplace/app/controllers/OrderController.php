<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/CommandeModel.php';
require_once __DIR__ . '/../models/LigneCommandeModel.php';
require_once __DIR__ . '/../models/ProduitModel.php';

use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;

/**
 * Controller pour la gestion des commandes (clients authentifies uniquement).
 */
class OrderController extends Controller
{
    /**
     * Retourne les commandes du client connecte (ou toutes si admin).
     */
    public function index(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $roleId = $_SESSION['user_role'] ?? null;
        $isAdmin = ($roleId == 1);

        if ($isAdmin) {
            $orders = Commande::getAll();
        } else {
            $orders = Commande::getBy('id_utilisateur', $_SESSION['user_id']);
        }

        $this->respond(200, 'Commandes', $orders);
    }

    /**
     * Retourne une commande par son id (verif ownership ou admin).
     */
    public function show(int $id): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $order = Commande::getById($id);

        if ($order === null) {
            $this->respond(404, 'Commande introuvable');
            return;
        }

        $roleId  = $_SESSION['user_role'] ?? null;
        $isAdmin = ($roleId == 1);

        if (!$isAdmin && (int)$order['id_utilisateur'] !== (int)$_SESSION['user_id']) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Commande', $order);
    }

    /**
     * Cree une commande a partir du panier courant.
     * Necessite un utilisateur authentifie (regle metier 2 et 3).
     */
    public function store(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Vous devez etre connecte pour passer commande');
            return;
        }

        $cartLines = $_SESSION['cart'] ?? [];
        if (empty($cartLines)) {
            $this->respond(400, 'Votre panier est vide');
            return;
        }

        $data = $_POST;
        $data['id_utilisateur'] = $_SESSION['user_id'];
        $data['statut']         = 'en_attente';
        $data['date_commande']  = date('Y-m-d H:i:s');
        $data['reference']      = sprintf('CMD-%s-%04d', date('YmdHis'), random_int(0, 9999));

        if (empty($data['id_adresse'])) {
            $this->respond(400, 'Adresse de livraison requise');
            return;
        }

        $totalHt = 0.0;
        $totalTva = 0.0;
        $fraisLivraison = isset($data['frais_livraison']) ? (float) $data['frais_livraison'] : 0.0;
        $linesToCreate = [];

        foreach ($cartLines as $productId => $qty) {
            $product = Produit::getById((int) $productId);
            if ($product === null || !(bool) ($product['actif'] ?? false)) {
                $this->respond(400, sprintf('Produit %d invalide', (int) $productId));
                return;
            }

            $quantity = (int) $qty;
            if ($quantity < 1) {
                $this->respond(400, sprintf('Quantite invalide pour le produit %d', (int) $productId));
                return;
            }

            $stock = (int) ($product['stock'] ?? 0);
            if ($stock < $quantity) {
                $this->respond(400, sprintf('Stock insuffisant pour le produit %d', (int) $productId));
                return;
            }

            $prixHt = (float) ($product['prix_ht'] ?? 0);
            $tauxTva = (float) ($product['taux_tva'] ?? 0);
            $ligneHt = $prixHt * $quantity;
            $ligneTva = $ligneHt * ($tauxTva / 100);

            $totalHt += $ligneHt;
            $totalTva += $ligneTva;

            $linesToCreate[] = [
                'id_produit' => (int) $productId,
                'quantite' => $quantity,
                'prix_unitaire_ht' => $prixHt,
                'taux_tva' => $tauxTva,
            ];
        }

        $data['total_ht'] = round($totalHt, 2);
        $data['total_tva'] = round($totalTva, 2);
        $data['frais_livraison'] = round($fraisLivraison, 2);
        $data['total_ttc'] = round($totalHt + $totalTva + $fraisLivraison, 2);

        $id = Commande::createRecord($data);

        foreach ($linesToCreate as $line) {
            LigneCommande::createRecord([
                'id_commande' => $id,
                'id_produit' => $line['id_produit'],
                'quantite' => $line['quantite'],
                'prix_unitaire_ht' => $line['prix_unitaire_ht'],
                'taux_tva' => $line['taux_tva'],
            ]);
        }

        $_SESSION['cart'] = [];

        $this->respond(201, 'Commande creee', ['id_commande' => $id]);
    }
}