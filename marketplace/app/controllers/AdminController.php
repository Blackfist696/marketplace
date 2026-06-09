<?php
namespace App\Controllers;

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../models/UtilisateurModel.php';
require_once __DIR__ . '/../models/ArtisanModel.php';
require_once __DIR__ . '/../models/ProduitModel.php';
require_once __DIR__ . '/../models/CommandeModel.php';
require_once __DIR__ . '/../models/CategorieModel.php';

use App\Models\Utilisateur;
use App\Models\Artisan;
use App\Models\Produit;
use App\Models\Commande;
use App\Models\Categorie;

/**
 * Controller administration (role admin requis, regles 7 et 8).
 */
class AdminController extends Controller
{
    private function readRequestData(): array
    {
        if (!empty($_POST)) {
            return $_POST;
        }

        $raw = file_get_contents('php://input');
        if ($raw === false || $raw === '') {
            return [];
        }

        $data = [];
        parse_str($raw, $data);
        return $data;
    }

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

    public function createUser(): void
    {
        if (!$this->requireAdmin()) { return; }

        $data = $this->readRequestData();
        if (empty($data['email']) || empty($data['mot_de_passe'])) {
            $this->respond(400, 'Email et mot de passe requis');
            return;
        }

        $existing = Utilisateur::getBy('email', $data['email']);
        if (!empty($existing)) {
            $this->respond(409, 'Cet email est deja utilise');
            return;
        }

        $data['mot_de_passe'] = password_hash((string) $data['mot_de_passe'], PASSWORD_BCRYPT);
        $data['actif'] = isset($data['actif']) ? (int) $data['actif'] : 1;
        $data['id_role'] = isset($data['id_role']) ? (int) $data['id_role'] : 3;
        $data['date_inscription'] = date('Y-m-d H:i:s');

        $id = Utilisateur::createRecord($data);
        $this->respond(201, 'Utilisateur cree', ['id_utilisateur' => $id]);
    }

    public function updateUser(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $data = $this->readRequestData();
        if (isset($data['mot_de_passe']) && $data['mot_de_passe'] !== '') {
            $data['mot_de_passe'] = password_hash((string) $data['mot_de_passe'], PASSWORD_BCRYPT);
        } else {
            unset($data['mot_de_passe']);
        }
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

    public function createArtisan(): void
    {
        if (!$this->requireAdmin()) { return; }

        $data = $this->readRequestData();
        if (empty($data['email']) || empty($data['mot_de_passe']) || empty($data['nom_boutique'])) {
            $this->respond(400, 'Email, mot de passe et nom de boutique requis');
            return;
        }

        $existing = Utilisateur::getBy('email', $data['email']);
        if (!empty($existing)) {
            $this->respond(409, 'Cet email est deja utilise');
            return;
        }

        $userData = [
            'email' => (string) ($data['email'] ?? ''),
            'mot_de_passe' => password_hash((string) ($data['mot_de_passe'] ?? ''), PASSWORD_BCRYPT),
            'nom' => (string) ($data['nom'] ?? ''),
            'prenom' => (string) ($data['prenom'] ?? ''),
            'telephone' => (string) ($data['telephone'] ?? ''),
            'id_role' => 2,
            'date_inscription' => date('Y-m-d H:i:s'),
            'actif' => 1,
        ];
        $userId = Utilisateur::createRecord($userData);

        $artisanData = [
            'id_utilisateur' => $userId,
            'nom_boutique' => (string) ($data['nom_boutique'] ?? ''),
            'description' => (string) ($data['description'] ?? ''),
            'numero_tva' => (string) ($data['numero_tva'] ?? ''),
            'iban' => (string) ($data['iban'] ?? ''),
            'commission' => isset($data['commission']) ? (float) $data['commission'] : 0,
            'valide' => isset($data['valide']) ? (int) $data['valide'] : 1,
            'date_validation' => date('Y-m-d H:i:s'),
            'logo' => (string) ($data['logo'] ?? ''),
        ];

        $artisanId = Artisan::createRecord($artisanData);
        $this->respond(201, 'Artisan cree', ['id_artisan' => $artisanId]);
    }

    public function updateArtisan(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $data = $this->readRequestData();
        $success = Artisan::updateRecord($id, $data);
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

    // ── Commandes ───────────────────────────────────────────────────────────

    public function orders(): void
    {
        if (!$this->requireAdmin()) { return; }
        $this->respond(200, 'Commandes', Commande::getAll());
    }

    public function showOrder(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $order = Commande::getById($id);
        if ($order === null) { $this->respond(404, 'Commande introuvable'); return; }
        $this->respond(200, 'Commande', $order);
    }

    public function updateOrder(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Commande::updateRecord($id, $_POST);
        $this->respond($success ? 200 : 400, $success ? 'Commande mise a jour' : 'Echec');
    }

    // ── Categories ──────────────────────────────────────────────────────────

    public function categories(): void
    {
        if (!$this->requireAdmin()) { return; }
        $this->respond(200, 'Categories', Categorie::getAll());
    }

    public function updateCategory(int $id): void
    {
        if (!$this->requireAdmin()) { return; }
        $success = Categorie::updateRecord($id, $_POST);
        $this->respond($success ? 200 : 400, $success ? 'Categorie mise a jour' : 'Echec');
    }

    /**
     * Met a jour plusieurs categories.
     * Payload accepte:
     * - {"categories":[{"id_categorie":1,"nom":"x"}, ...]}
     * - {"ids":[1,2], "data":{"actif":0}}
     */
    public function updateCategoriesBulk(): void
    {
        if (!$this->requireAdmin()) { return; }

        $updated = 0;
        $errors = [];

        $categories = $_POST['categories'] ?? null;
        if (is_array($categories)) {
            foreach ($categories as $index => $item) {
                if (!is_array($item) || !isset($item['id_categorie'])) {
                    $errors[] = ['index' => $index, 'message' => 'id_categorie manquant'];
                    continue;
                }

                $id = (int) $item['id_categorie'];
                unset($item['id_categorie']);

                if (empty($item)) {
                    $errors[] = ['id_categorie' => $id, 'message' => 'Aucune donnee a mettre a jour'];
                    continue;
                }

                if (Categorie::updateRecord($id, $item)) {
                    $updated++;
                    continue;
                }

                $errors[] = ['id_categorie' => $id, 'message' => 'Echec de mise a jour'];
            }

            $this->respond(200, 'Mise a jour multiple categories terminee', [
                'updated' => $updated,
                'errors' => $errors,
            ]);
            return;
        }

        $ids = $_POST['ids'] ?? null;
        $data = $_POST['data'] ?? null;
        if (!is_array($ids) || !is_array($data) || empty($data)) {
            $this->respond(400, 'Payload invalide pour mise a jour multiple');
            return;
        }

        foreach ($ids as $rawId) {
            $id = (int) $rawId;
            if ($id <= 0) {
                $errors[] = ['id_categorie' => $rawId, 'message' => 'Identifiant invalide'];
                continue;
            }

            if (Categorie::updateRecord($id, $data)) {
                $updated++;
                continue;
            }

            $errors[] = ['id_categorie' => $id, 'message' => 'Echec de mise a jour'];
        }

        $this->respond(200, 'Mise a jour multiple categories terminee', [
            'updated' => $updated,
            'errors' => $errors,
        ]);
    }

    /**
     * Met a jour toutes les categories avec les memes donnees.
     */
    public function updateAllCategories(): void
    {
        if (!$this->requireAdmin()) { return; }

        if (empty($_POST) || !is_array($_POST)) {
            $this->respond(400, 'Payload invalide pour mise a jour globale');
            return;
        }

        $categories = Categorie::getAll();
        $updated = 0;
        $errors = [];

        foreach ($categories as $cat) {
            $id = (int) ($cat['id_categorie'] ?? 0);
            if ($id <= 0) {
                continue;
            }

            if (Categorie::updateRecord($id, $_POST)) {
                $updated++;
                continue;
            }

            $errors[] = ['id_categorie' => $id, 'message' => 'Echec de mise a jour'];
        }

        $this->respond(200, 'Mise a jour globale categories terminee', [
            'updated' => $updated,
            'errors' => $errors,
        ]);
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