<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PanierModel.php';
require_once __DIR__ . '/../models/LignePanierModel.php';

use App\Models\Panier;
use App\Models\LignePanier;

/**
 * Controller pour la gestion du panier.
 * Fonctionne pour les visiteurs anonymes (via session_id) et les clients authentifies.
 */
class CartController extends Controller
{
    /**
     * Retourne le panier courant avec ses lignes.
     */
    public function index(): void
    {
        $cart = $this->getOrCreateCart();
        $lines = LignePanier::getBy('id_panier', $cart['id_panier']);
        $this->respond(200, 'Panier', ['cart' => $cart, 'lines' => $lines]);
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

        $cart = $this->getOrCreateCart();
        $existing = LignePanier::getBy('id_panier', $cart['id_panier']);

        foreach ($existing as $line) {
            if ((int)$line['id_produit'] === (int)$data['id_produit']) {
                $newQty = (int)$line['quantite'] + (int)$data['quantite'];
                LignePanier::updateRecord((int)$line['id_ligne'], ['quantite' => $newQty]);
                $this->respond(200, 'Quantite mise a jour', ['id_ligne' => $line['id_ligne']]);
                return;
            }
        }

        $data['id_panier'] = $cart['id_panier'];
        $id = LignePanier::createRecord($data);
        $this->respond(201, 'Article ajoute au panier', ['id_ligne' => $id]);
    }

    /**
     * Met a jour la quantite d'une ligne de panier.
     */
    public function updateLine(int $id): void
    {
        $data = $_POST;

        if (empty($data['quantite']) || (int)$data['quantite'] < 1) {
            $this->respond(400, 'Quantite invalide');
            return;
        }

        $success = LignePanier::updateRecord($id, ['quantite' => (int)$data['quantite']]);

        if (!$success) {
            $this->respond(400, 'Echec de la mise a jour');
            return;
        }

        $this->respond(200, 'Ligne mise a jour');
    }

    /**
     * Supprime une ligne de panier.
     */
    public function remove(int $id): void
    {
        $success = LignePanier::deleteRecord($id);

        if (!$success) {
            $this->respond(400, 'Echec de la suppression');
            return;
        }

        $this->respond(200, 'Article supprime du panier');
    }

    /**
     * Recupere ou cree le panier associe a la session ou a l'utilisateur connecte.
     */
    private function getOrCreateCart(): array
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $userId    = $_SESSION['user_id'] ?? null;
        $sessionId = session_id();

        if ($userId !== null) {
            $carts = Panier::getBy('id_utilisateur', $userId);
            if (!empty($carts)) {
                return $carts[0];
            }
        } else {
            $carts = Panier::getBy('session_id', $sessionId);
            if (!empty($carts)) {
                return $carts[0];
            }
        }

        $newId = Panier::createRecord([
            'id_utilisateur'   => $userId,
            'session_id'        => $userId === null ? $sessionId : null,
            'date_creation'     => date('Y-m-d H:i:s'),
            'date_modification' => date('Y-m-d H:i:s'),
        ]);

        return Panier::find($newId) ?? ['id_panier' => $newId];
    }
}