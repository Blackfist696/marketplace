<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/CommandeModel.php';
require_once __DIR__ . '/../models/PanierModel.php';
require_once __DIR__ . '/../models/LignePanierModel.php';

use App\Models\Commande;
use App\Models\Panier;
use App\Models\LignePanier;

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

        $data = $_POST;
        $data['id_utilisateur'] = $_SESSION['user_id'];
        $data['statut']         = 'en_attente_paiement';
        $data['date_commande']  = date('Y-m-d H:i:s');

        if (empty($data['id_adresse_livraison']) || empty($data['id_adresse_facturation'])) {
            $this->respond(400, 'Adresses de livraison et de facturation requises');
            return;
        }

        $id = Commande::createRecord($data);
        $this->respond(201, 'Commande creee', ['id_commande' => $id]);
    }
}