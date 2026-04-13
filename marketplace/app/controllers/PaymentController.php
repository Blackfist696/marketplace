<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/CommandeModel.php';

use App\Models\Commande;

/**
 * Controller pour le paiement fictif (page Bancontact simulee, regle 3).
 */
class PaymentController extends Controller
{
    /**
     * Affiche la page de paiement fictive Bancontact.
     * Necessite une commande en attente associee a la session.
     */
    public function page(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $orderId = $_GET['id_commande'] ?? null;
        if (!$orderId) {
            $this->respond(400, 'Identifiant de commande requis');
            return;
        }

        $order = Commande::getById((int)$orderId);

        if ($order === null || (int)$order['id_utilisateur'] !== (int)$_SESSION['user_id']) {
            $this->respond(404, 'Commande introuvable');
            return;
        }

        if ($order['statut'] !== 'en_attente_paiement') {
            $this->respond(400, 'Cette commande ne peut plus etre payee');
            return;
        }

        $this->respond(200, 'Page de paiement Bancontact', [
            'id_commande' => $order[$this->getPrimaryKey()],
            'montant'     => $order['total_ttc'],
            'actions'     => ['accepter', 'refuser'],
        ]);
    }

    /**
     * Traite le resultat du paiement fictif.
     * POST : id_commande, resultat (accepte|refuse).
     */
    public function process(): void
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['user_id'])) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $data    = $_POST;
        $orderId = isset($data['id_commande']) ? (int)$data['id_commande'] : null;
        $result  = $data['resultat'] ?? null;

        if (!$orderId || !in_array($result, ['accepte', 'refuse'], true)) {
            $this->respond(400, 'Donnees invalides');
            return;
        }

        $order = Commande::getById($orderId);

        if ($order === null || (int)$order['id_utilisateur'] !== (int)$_SESSION['user_id']) {
            $this->respond(404, 'Commande introuvable');
            return;
        }

        if ($order['statut'] !== 'en_attente_paiement') {
            $this->respond(400, 'Cette commande a deja ete traitee');
            return;
        }

        if ($result === 'accepte') {
            Commande::updateRecord($orderId, [
                'statut'        => 'payee',
                'date_paiement' => date('Y-m-d H:i:s'),
            ]);
            $this->respond(200, 'Paiement accepte', ['id_commande' => $orderId]);
        } else {
            Commande::updateRecord($orderId, ['statut' => 'annulee']);
            $this->respond(200, 'Paiement refuse', ['id_commande' => $orderId]);
        }
    }

    private function getPrimaryKey(): string
    {
        return 'id_commande';
    }
}