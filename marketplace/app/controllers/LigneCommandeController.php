<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/LigneCommandeModel.php';
require_once __DIR__ . '/../models/CommandeModel.php';

use App\Models\LigneCommande;
use App\Security\Auth\AuthContext;
use App\Security\Authorization\OwnershipGuard;

/**
 * API des lignes de commande, protegee par ownership/admin.
 */
class LigneCommandeController extends Controller
{
    /**
     * Liste les lignes visibles par l'utilisateur courant.
     */
    public function index(): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $lines = LigneCommande::getAll();
        if (!$auth['is_admin']) {
            $lines = array_values(array_filter(
                $lines,
                static fn(array $line): bool => OwnershipGuard::canAccessLigneCommande($line, $auth)
            ));
        }

        $this->respond(200, 'Liste des lignes de commande', $lines);
    }

    /**
     * Retourne une ligne par identifiant si acces autorise.
     */
    public function show(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = LigneCommande::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ligne de commande introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessLigneCommande($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Ligne de commande', $item);
    }

    /**
     * Liste les lignes d'une commande donnee.
     */
    public function indexByCommande(int $idCommande): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        if (!OwnershipGuard::canAccessCommande($idCommande, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $this->respond(200, 'Lignes de la commande', LigneCommande::getBy('id_commande', $idCommande));
    }

    /**
     * Cree une ligne sur une commande accessible.
     */
    public function store(): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $commandeId = (int) ($_POST['id_commande'] ?? 0);
        if ($commandeId <= 0 || !OwnershipGuard::canAccessCommande($commandeId, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $id = LigneCommande::createRecord($_POST);
        $this->respond(201, 'Ligne de commande creee', ['id_ligne_commande' => $id]);
    }

    /**
     * Met a jour une ligne de commande.
     */
    public function update(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = LigneCommande::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ligne de commande introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessLigneCommande($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $ok = LigneCommande::updateRecord($id, $_POST);
        $this->respond($ok ? 200 : 400, $ok ? 'Ligne de commande mise a jour' : 'Echec de mise a jour');
    }

    /**
     * Supprime une ligne de commande.
     */
    public function destroy(int $id): void
    {
        $auth = AuthContext::current();
        if ($auth === null) {
            $this->respond(401, 'Authentification requise');
            return;
        }

        $item = LigneCommande::getById($id);
        if ($item === null) {
            $this->respond(404, 'Ligne de commande introuvable');
            return;
        }

        if (!OwnershipGuard::canAccessLigneCommande($item, $auth)) {
            $this->respond(403, 'Acces interdit');
            return;
        }

        $ok = LigneCommande::deleteRecord($id);
        $this->respond($ok ? 200 : 400, $ok ? 'Ligne de commande supprimee' : 'Echec de suppression');
    }
}
