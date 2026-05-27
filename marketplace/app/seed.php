<?php

require_once __DIR__ . '/autoload.php';

use App\Models\Role;
use App\Models\Utilisateur;
use App\Models\Pays;
use App\Models\Ville;
use App\Models\Adresse;
use App\Models\RUtilisateurAdresse;
use App\Models\Categorie;
use App\Models\Artisan;
use App\Models\Produit;
use App\Models\Classe;
use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Paiement;
use App\Models\Avis;
use App\Models\StatistiqueArtisan;

require_once __DIR__ . '/models/PaysModel.php';
require_once __DIR__ . '/models/VilleModel.php';
require_once __DIR__ . '/models/AdresseModel.php';
require_once __DIR__ . '/models/RUtilisateurAdresseModel.php';
require_once __DIR__ . '/models/ClasseModel.php';
require_once __DIR__ . '/models/LigneCommandeModel.php';
require_once __DIR__ . '/models/PaiementModel.php';
require_once __DIR__ . '/models/AvisModel.php';
require_once __DIR__ . '/models/StatistiqueArtisanModel.php';

function firstOrCreate(string $class, array $where, array $data = []): array
{
    $result = null;

    if (count($where) === 1) {
        $column = key($where);
        $value = current($where);
        $items = $class::where($column, $value);
        $result = $items[0] ?? null;
    } else {
        $items = $class::all();
        foreach ($items as $item) {
            $match = true;
            foreach ($where as $column => $value) {
                if (!array_key_exists($column, $item) || $item[$column] != $value) {
                    $match = false;
                    break;
                }
            }
            if ($match) {
                $result = $item;
                break;
            }
        }
    }

    if ($result !== null) {
        return $result;
    }

    $payload = array_merge($where, $data);
    $id = $class::createRecord($payload);

    $created = null;
    if ($id > 0 && method_exists($class, 'find')) {
        $created = $class::find($id);
    }

    if (is_array($created)) {
        return $created;
    }

    if (count($where) === 1) {
        $column = key($where);
        $value = current($where);
        $items = $class::where($column, $value);
        if (!empty($items)) {
            return $items[0];
        }
    }

    $items = $class::all();
    foreach ($items as $item) {
        $match = true;
        foreach ($where as $column => $value) {
            if (!array_key_exists($column, $item) || $item[$column] != $value) {
                $match = false;
                break;
            }
        }

        if ($match) {
            return $item;
        }
    }

    return $payload;
}

function ensureRole(int $idRole, string $nom, string $description): array
{
    $pdo = Role::getPDO();

    $stmt = $pdo->prepare('SELECT * FROM role WHERE Id_role = :id_role');
    $stmt->execute(['id_role' => $idRole]);
    $existing = $stmt->fetch();

    if ($existing !== false) {
        $update = $pdo->prepare('UPDATE role SET nom = :nom, description = :description WHERE Id_role = :id_role');
        $update->execute([
            'nom' => $nom,
            'description' => $description,
            'id_role' => $idRole,
        ]);

        $stmt->execute(['id_role' => $idRole]);
        return array_change_key_case((array) $stmt->fetch(), CASE_LOWER);
    }

    $insert = $pdo->prepare('INSERT INTO role (Id_role, nom, description) VALUES (:id_role, :nom, :description)');
    $insert->execute([
        'id_role' => $idRole,
        'nom' => $nom,
        'description' => $description,
    ]);

    $stmt->execute(['id_role' => $idRole]);
    return array_change_key_case((array) $stmt->fetch(), CASE_LOWER);
}

try {
    echo "Seeding roles...\n";

    $roleAdmin = ensureRole(1, 'administrateur', 'Administrateur de la plateforme');
    $roleVendeur = ensureRole(2, 'vendeur', 'Vendeur artisan');
    $roleClient = ensureRole(3, 'client', 'Client standard');

    echo "Seeding pays et villes...\n";

    $paysBelgique = firstOrCreate(Pays::class, ['code_iso' => 'BE'], ['nom_pays' => 'Belgique']);
    $paysFrance = firstOrCreate(Pays::class, ['code_iso' => 'FR'], ['nom_pays' => 'France']);

    $villeBruxelles = firstOrCreate(Ville::class, ['nom_ville' => 'Bruxelles'], [
        'code_postal' => '1000',
        'id_pays' => $paysBelgique['id_pays'],
    ]);

    $villeLyon = firstOrCreate(Ville::class, ['nom_ville' => 'Lyon'], [
        'code_postal' => '69000',
        'id_pays' => $paysFrance['id_pays'],
    ]);

    echo "Seeding comptes administrateur et vendeur...\n";

    $adminUser = firstOrCreate(Utilisateur::class, ['email' => 'admin@example.com'], [
        'mot_de_passe' => password_hash('admin123', PASSWORD_BCRYPT),
        'nom' => 'Admin',
        'prenom' => 'Systeme',
        'telephone' => '0400 10 10 10',
        'id_role' => $roleAdmin['id_role'],
        'date_inscription' => date('Y-m-d H:i:s'),
        'actif' => 1,
    ]);

    $vendeurUser = firstOrCreate(Utilisateur::class, ['email' => 'vendeur@example.com'], [
        'mot_de_passe' => password_hash('vendeur123', PASSWORD_BCRYPT),
        'nom' => 'Vendeur',
        'prenom' => 'Demo',
        'telephone' => '0400 20 20 20',
        'id_role' => $roleVendeur['id_role'],
        'date_inscription' => date('Y-m-d H:i:s'),
        'actif' => 1,
    ]);

    echo "Seeding client comptes...\n";

    $clients = [
        ['email' => 'client1@example.com', 'mot_de_passe' => 'client123', 'nom' => 'Dupont', 'prenom' => 'Alice', 'telephone' => '0485 11 22 33'],
        ['email' => 'client2@example.com', 'mot_de_passe' => 'client123', 'nom' => 'Martin', 'prenom' => 'Benoit', 'telephone' => '0496 44 55 66'],
        ['email' => 'client3@example.com', 'mot_de_passe' => 'client123', 'nom' => 'Lefevre', 'prenom' => 'Camille', 'telephone' => '0477 77 88 99'],
        ['email' => 'client4@example.com', 'mot_de_passe' => 'client123', 'nom' => 'Moreau', 'prenom' => 'David', 'telephone' => '0468 00 11 22'],
        ['email' => 'client5@example.com', 'mot_de_passe' => 'client123', 'nom' => 'Bernard', 'prenom' => 'Elodie', 'telephone' => '0459 33 44 55'],
    ];

    $clientUsers = [];
    foreach ($clients as $client) {
        $user = firstOrCreate(Utilisateur::class, ['email' => $client['email']], [
            'mot_de_passe' => password_hash($client['mot_de_passe'], PASSWORD_BCRYPT),
            'nom' => $client['nom'],
            'prenom' => $client['prenom'],
            'telephone' => $client['telephone'],
            'id_role' => $roleClient['id_role'],
            'date_inscription' => date('Y-m-d H:i:s'),
            'actif' => 1,
        ]);

        $clientUsers[] = $user;

        $adresse = firstOrCreate(Adresse::class, [
            'rue' => 'Rue du Client ' . $user['id_utilisateur'],
            'id_ville' => $villeBruxelles['id_ville'],
        ], [
            'complement' => null,
            'type_adresse' => 'livraison',
            'principale' => 1,
        ]);

        firstOrCreate(RUtilisateurAdresse::class, [
            'id_utilisateur' => $user['id_utilisateur'],
            'id_adresse' => $adresse['id_adresse'],
        ]);
    }

    $adminAdresse = firstOrCreate(Adresse::class, [
        'rue' => 'Avenue Admin 1',
        'id_ville' => $villeBruxelles['id_ville'],
    ], [
        'complement' => null,
        'type_adresse' => 'facturation',
        'principale' => 1,
    ]);

    firstOrCreate(RUtilisateurAdresse::class, [
        'id_utilisateur' => $adminUser['id_utilisateur'],
        'id_adresse' => $adminAdresse['id_adresse'],
    ]);

    echo "Seeding category and artisan support data...\n";

    $category = firstOrCreate(Categorie::class, ['nom' => 'Bijoux'], [
        'description' => 'Bijoux et accessoires artisanaux',
        'image' => 'bijoux.jpg',
        'ordre' => 1,
        'actif' => 1,
    ]);

    $categoryMaison = firstOrCreate(Categorie::class, ['nom' => 'Decoration'], [
        'description' => 'Objets decoratifs artisanaux',
        'image' => 'deco.jpg',
        'ordre' => 2,
        'actif' => 1,
    ]);

    $artisan = firstOrCreate(Artisan::class, ['id_utilisateur' => $vendeurUser['id_utilisateur']], [
        'nom_boutique' => 'Atelier du Marché',
        'description' => 'Boutique artisanale de bijoux faits main.',
        'numero_tva' => 'BE0123456789',
        'iban' => 'BE68539007547034',
        'commission' => 12.5,
        'date_validation' => date('Y-m-d H:i:s'),
        'logo' => 'atelier-logo.png',
        'valide' => 1,
    ]);

    echo "Seeding produits...\n";

    $products = [
        ['nom' => 'Collier en perles', 'description' => 'Collier artisanal en perles naturelles.', 'prix_ht' => '45.00', 'taux_tva' => '6.00', 'stock' => 12, 'poids' => '0.15', 'image_principale' => 'collier.jpg', 'mis_en_avant' => 1],
        ['nom' => 'Bracelet cuir', 'description' => 'Bracelet en cuir véritable et fermoir acier.', 'prix_ht' => '35.00', 'taux_tva' => '6.00', 'stock' => 20, 'poids' => '0.08', 'image_principale' => 'bracelet.jpg'],
        ['nom' => 'Boucles d’oreilles dorées', 'description' => 'Boucles d’oreilles fines et élégantes.', 'prix_ht' => '28.00', 'taux_tva' => '6.00', 'stock' => 25, 'poids' => '0.04', 'image_principale' => 'boucles.jpg'],
        ['nom' => 'Bague en argent', 'description' => 'Bague artisanale en argent 925.', 'prix_ht' => '55.00', 'taux_tva' => '6.00', 'stock' => 10, 'poids' => '0.06', 'image_principale' => 'bague.jpg'],
        ['nom' => 'Pendentif gravé', 'description' => 'Pendentif personnalisé en acier inoxydable.', 'prix_ht' => '32.00', 'taux_tva' => '6.00', 'stock' => 18, 'poids' => '0.05', 'image_principale' => 'pendentif.jpg'],
    ];

    $createdProducts = [];
    foreach ($products as $product) {
        $created = firstOrCreate(Produit::class, ['nom' => $product['nom']], array_merge($product, [
            'id_artisan' => $artisan['id_artisan'],
            'date_creation' => date('Y-m-d H:i:s'),
            'actif' => 1,
        ]));

        $createdProducts[] = $created;
        firstOrCreate(Classe::class, [
            'id_categorie' => $category['id_categorie'],
            'id_produit' => $created['id_produit'],
        ]);
    }

    if (!empty($createdProducts[0])) {
        firstOrCreate(Classe::class, [
            'id_categorie' => $categoryMaison['id_categorie'],
            'id_produit' => $createdProducts[0]['id_produit'],
        ]);
    }

    echo "Seeding commande, ligne_commande, paiement, avis et statistiques...\n";

    $firstClient = $clientUsers[0] ?? null;
    if ($firstClient !== null && !empty($createdProducts)) {
        try {
            $adressesClient = RUtilisateurAdresse::getByUtilisateurId((int) $firstClient['id_utilisateur']);
            $idAdresse = (int) ($adressesClient[0]['id_adresse'] ?? 0);

            if ($idAdresse > 0) {
                $reference = 'CMD-SEED-0001';
                $commande = firstOrCreate(Commande::class, ['reference' => $reference], [
                    'id_utilisateur' => $firstClient['id_utilisateur'],
                    'id_adresse' => $idAdresse,
                    'statut' => 'payee',
                    'total_ht' => 80.00,
                    'total_tva' => 4.80,
                    'frais_livraison' => 5.00,
                    'total_ttc' => 89.80,
                    'date_commande' => date('Y-m-d H:i:s', strtotime('-1 day')),
                    'date_paiement' => date('Y-m-d H:i:s', strtotime('-1 day +30 minutes')),
                ]);

                firstOrCreate(LigneCommande::class, [
                    'id_commande' => $commande['id_commande'],
                    'id_produit' => $createdProducts[0]['id_produit'],
                ], [
                    'quantite' => 1,
                    'prix_unitaire_ht' => $createdProducts[0]['prix_ht'],
                    'taux_tva' => $createdProducts[0]['taux_tva'],
                ]);

                if (!empty($createdProducts[1])) {
                    firstOrCreate(LigneCommande::class, [
                        'id_commande' => $commande['id_commande'],
                        'id_produit' => $createdProducts[1]['id_produit'],
                    ], [
                        'quantite' => 1,
                        'prix_unitaire_ht' => $createdProducts[1]['prix_ht'],
                        'taux_tva' => $createdProducts[1]['taux_tva'],
                    ]);
                }

                firstOrCreate(Paiement::class, ['id_commande' => $commande['id_commande']], [
                    'methode' => 'carte',
                    'reference_externe' => 'TX-SEED-0001',
                    'montant' => 89.80,
                    'statut' => 'valide',
                    'date_paiement' => date('Y-m-d H:i:s', strtotime('-1 day +30 minutes')),
                ]);

                firstOrCreate(Avis::class, [
                    'id_utilisateur' => $firstClient['id_utilisateur'],
                    'id_produit' => $createdProducts[0]['id_produit'],
                ], [
                    'note' => 5,
                    'commentaire' => 'Produit de tres bonne qualite',
                    'date_avis' => date('Y-m-d H:i:s'),
                    'valide' => 1,
                ]);
            }
        } catch (Throwable $e) {
            echo "Warning: section commande/paiement ignoree: " . $e->getMessage() . "\n";
        }

        firstOrCreate(StatistiqueArtisan::class, ['id_artisan' => $artisan['id_artisan']], [
            'id_utilisateur' => (string) $firstClient['id_utilisateur'],
            'date_consultation' => date('Y-m-d H:i:s'),
            'ip_adress' => '127.0.0.1',
            'id_produit' => (string) $createdProducts[0]['id_produit'],
        ]);
    }

    echo "Seed complete. Roles (client, vendeur, administrateur), referentiels, produits, commandes et avis crees.\n";
} catch (Throwable $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
    exit(1);
}
