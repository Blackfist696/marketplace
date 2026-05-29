<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/PaiementModel.php';

use App\Models\Paiement;
use App\Security\Auth\AuthContext;
use App\Security\Authorization\OwnershipGuard;

/**
 * API CRUD des paiements avec controle d'acces proprietaire/admin.
 */
class PaiementApiController extends Controller
{
    /**
     * Liste les paiements visibles par l'utilisateur courant.
     */
    public function index(): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $payments = Paiement::getAll();
        if (!$auth['is_admin']) {
            $payments = array_values(array_filter(
                $payments,
                static fn(array $payment): bool => OwnershipGuard::canAccessPaiement($payment, $auth)
            ));
        }

        $this->respond(200, 'Liste des paiements', $payments);
    }

    /**
     * Retourne un paiement si l'utilisateur y a acces.
     */
    public function show(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = Paiement::getById($id);
        if ($item === null) {
            $this->respond(404, 'Paiement introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessPaiement($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Paiement', $item);
    }

    /**
     * Cree un paiement rattache a une commande accessible.
     */
    public function store(): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $data = $_POST;
        if (!isset($data['date_paiement']) && (($data['statut'] ?? '') === 'valide')) {
            $data['date_paiement'] = date('Y-m-d H:i:s');
        }

        if (empty($data['id_commande']) || !OwnershipGuard::canAccessCommande((int) $data['id_commande'], $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $id = Paiement::createRecord($data);
        $this->respond(201, 'Paiement cree', ['id_paiement' => $id]);
    }

    /**
     * Met a jour un paiement existant.
     */
    public function update(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = Paiement::getById($id);
        if ($item === null) {
            $this->respond(404, 'Paiement introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessPaiement($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $data = $_POST;
        if (!isset($data['date_paiement']) && (($data['statut'] ?? '') === 'valide')) {
            $data['date_paiement'] = date('Y-m-d H:i:s');
        }

        $ok = Paiement::updateRecord($id, $data);
        $this->respond($ok ? 200 : 400, $ok ? 'Paiement mis a jour' : 'Echec de mise a jour');
    }

    /**
     * Supprime un paiement existant.
     */
    public function destroy(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = Paiement::getById($id);
        if ($item === null) {
            $this->respond(404, 'Paiement introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessPaiement($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $ok = Paiement::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Paiement supprime' : 'Echec de suppression');
    }
}
