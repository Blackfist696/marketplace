<?php

require_once __DIR__ . '/autoload.php';

use App\Models\Role;
use App\Models\Utilisateur;
use App\Models\Personne;
use App\Models\Categorie;
use App\Models\Artisan;
use App\Models\Produit;

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
                if (!array_key_exists($column, $item) || $item[$column] !== $value) {
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
    return $class::find($id);
}

try {
    echo "Seeding roles...\n";

    $roleClient = firstOrCreate(Role::class, ['nom' => 'client'], ['description' => 'Client standard']);
    $roleArtisan = firstOrCreate(Role::class, ['nom' => 'artisan'], ['description' => 'Artisan vendeur']);

    echo "Seeding client comptes et profils...\n";

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
            'mot_de_passe' => $client['mot_de_passe'],
            'id_role' => $roleClient['id_role'],
            'actif' => 1,
        ]);

        $clientUsers[] = $user;

        firstOrCreate(Personne::class, ['id_utilisateur' => $user['id_utilisateur']], [
            'nom' => $client['nom'],
            'prenom' => $client['prenom'],
            'telephone' => $client['telephone'],
        ]);
    }

    echo "Seeding category and artisan support data...\n";

    $category = firstOrCreate(Categorie::class, ['nom' => 'Bijoux'], [
        'description' => 'Bijoux et accessoires artisanaux',
        'image' => 'bijoux.jpg',
        'ordre' => 1,
        'actif' => 1,
    ]);

    $artisanUser = firstOrCreate(Utilisateur::class, ['email' => 'artisan@example.com'], [
        'mot_de_passe' => 'artisan123',
        'id_role' => $roleArtisan['id_role'],
        'actif' => 1,
    ]);

    $artisan = firstOrCreate(Artisan::class, ['id_utilisateur' => $artisanUser['id_utilisateur']], [
        'id_template' => null,
        'nom_boutique' => 'Atelier du Marché',
        'description' => 'Boutique artisanale de bijoux faits main.',
        'logo' => 'atelier-logo.png',
        'banniere' => 'atelier-banner.png',
        'siret' => '12345678901234',
        'iban' => 'BE68539007547034',
        'couleur_primaire' => '#D4A855',
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

    foreach ($products as $product) {
        firstOrCreate(Produit::class, ['nom' => $product['nom']], array_merge($product, [
            'id_artisan' => $artisan['id_artisan'],
            'id_categorie' => $category['id_categorie'],
            'actif' => 1,
        ]));
    }

    echo "Seed complete. 5 clients, 5 products and required support records are now in the database.\n";
} catch (Throwable $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
    exit(1);
}
