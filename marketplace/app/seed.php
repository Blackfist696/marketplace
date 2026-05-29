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
use App\Models\ImageProduit;
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
require_once __DIR__ . '/models/ImageProduitModel.php';
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
    $roleArtisan = ensureRole(2, 'artisan', 'Artisan de la plateforme');
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

    echo "Seeding compte administrateur...\n";

    $adminUser = firstOrCreate(Utilisateur::class, ['email' => 'admin@example.com'], [
        'mot_de_passe' => password_hash('admin123', PASSWORD_BCRYPT),
        'nom' => 'Admin',
        'prenom' => 'Systeme',
        'telephone' => '0400 10 10 10',
        'id_role' => $roleAdmin['id_role'],
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

    echo "Seeding categories, artisans and catalogues...\n";

    $catalogues = [
        [
            'category' => [
                'nom' => 'Miels',
                'description' => 'Selection de miels artisanaux issus de ruchers locaux.',
                'image' => 'categories/miels.jpg',
                'ordre' => 1,
            ],
            'artisan' => [
                'email' => 'miels.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Lambert',
                'prenom' => 'Nora',
                'telephone' => '0470 10 20 30',
                'boutique' => 'Rucher des Collines',
                'description' => 'Production de miels de terroir et de saison.',
                'numero_tva' => 'BE0200000001',
                'iban' => 'BE68000111112222',
                'logo' => 'logos/rucher-collines.png',
                'rue' => 'Chemin des Abeilles 1',
                'ville' => $villeLyon,
            ],
            'products' => [
                ['nom' => 'Miel de fleurs sauvages', 'description' => 'Miel doux recolte sur des prairies fleuries.', 'prix_ht' => '8.90', 'stock' => 40, 'poids' => '0.25', 'image_principale' => 'products/miels/fleurs-sauvages.jpg', 'image_detail' => 'products/miels/fleurs-sauvages-detail.jpg'],
                ['nom' => 'Miel d acacia', 'description' => 'Texture fluide et notes legeres pour les petits dejeuners.', 'prix_ht' => '9.40', 'stock' => 32, 'poids' => '0.25', 'image_principale' => 'products/miels/acacia.jpg', 'image_detail' => 'products/miels/acacia-detail.jpg'],
                ['nom' => 'Miel de foret', 'description' => 'Miel ambré aux aromes boises et soutenus.', 'prix_ht' => '10.20', 'stock' => 28, 'poids' => '0.25', 'image_principale' => 'products/miels/foret.jpg', 'image_detail' => 'products/miels/foret-detail.jpg'],
                ['nom' => 'Miel de chataignier', 'description' => 'Saveur puissante et finale legerement amere.', 'prix_ht' => '10.80', 'stock' => 24, 'poids' => '0.25', 'image_principale' => 'products/miels/chataignier.jpg', 'image_detail' => 'products/miels/chataignier-detail.jpg'],
                ['nom' => 'Miel creme du rucher', 'description' => 'Miel foisonne ideal pour les tartines.', 'prix_ht' => '9.80', 'stock' => 30, 'poids' => '0.25', 'image_principale' => 'products/miels/creme.jpg', 'image_detail' => 'products/miels/creme-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Savons',
                'description' => 'Savons saponifies a froid aux ingredients naturels.',
                'image' => 'categories/savons.jpg',
                'ordre' => 2,
            ],
            'artisan' => [
                'email' => 'savons.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Bernier',
                'prenom' => 'Lea',
                'telephone' => '0470 11 21 31',
                'boutique' => 'Savonnerie du Verger',
                'description' => 'Savons doux enrichis en huiles vegetales et beurres naturels.',
                'numero_tva' => 'BE0200000002',
                'iban' => 'BE68000111112223',
                'logo' => 'logos/savonnerie-verger.png',
                'rue' => 'Rue des Herbiers 8',
                'ville' => $villeBruxelles,
            ],
            'products' => [
                ['nom' => 'Savon lavande apaisant', 'description' => 'Savon parfume a la lavande avec mousse cremeuse.', 'prix_ht' => '5.90', 'stock' => 60, 'poids' => '0.10', 'image_principale' => 'products/savons/lavande.jpg', 'image_detail' => 'products/savons/lavande-detail.jpg'],
                ['nom' => 'Savon miel et avoine', 'description' => 'Nettoie en douceur et apaise les peaux sensibles.', 'prix_ht' => '6.20', 'stock' => 48, 'poids' => '0.10', 'image_principale' => 'products/savons/miel-avoine.jpg', 'image_detail' => 'products/savons/miel-avoine-detail.jpg'],
                ['nom' => 'Savon charbon purifiant', 'description' => 'Formule minerale dediee aux peaux mixtes.', 'prix_ht' => '6.50', 'stock' => 45, 'poids' => '0.10', 'image_principale' => 'products/savons/charbon.jpg', 'image_detail' => 'products/savons/charbon-detail.jpg'],
                ['nom' => 'Savon agrumes tonique', 'description' => 'Notes fraiches d orange et de citron.', 'prix_ht' => '5.80', 'stock' => 52, 'poids' => '0.10', 'image_principale' => 'products/savons/agrumes.jpg', 'image_detail' => 'products/savons/agrumes-detail.jpg'],
                ['nom' => 'Savon lait d amande', 'description' => 'Texture onctueuse et parfum legerement gourmand.', 'prix_ht' => '6.40', 'stock' => 40, 'poids' => '0.10', 'image_principale' => 'products/savons/amande.jpg', 'image_detail' => 'products/savons/amande-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Confiseries',
                'description' => 'Douceurs artisanales au miel et aux fruits.',
                'image' => 'categories/confiseries.jpg',
                'ordre' => 3,
            ],
            'artisan' => [
                'email' => 'confiseries.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Renaud',
                'prenom' => 'Mila',
                'telephone' => '0470 12 22 32',
                'boutique' => 'Maison des Douceurs',
                'description' => 'Confiseries artisanales preparees en petites series.',
                'numero_tva' => 'BE0200000003',
                'iban' => 'BE68000111112224',
                'logo' => 'logos/maison-douceurs.png',
                'rue' => 'Place des Gourmands 3',
                'ville' => $villeLyon,
            ],
            'products' => [
                ['nom' => 'Pates de fruits framboise', 'description' => 'Bonbons moelleux a la framboise et au miel.', 'prix_ht' => '4.90', 'stock' => 55, 'poids' => '0.12', 'image_principale' => 'products/confiseries/pates-fruits.jpg', 'image_detail' => 'products/confiseries/pates-fruits-detail.jpg'],
                ['nom' => 'Nougat tendre aux amandes', 'description' => 'Nougat souple aux amandes grillees.', 'prix_ht' => '7.10', 'stock' => 35, 'poids' => '0.18', 'image_principale' => 'products/confiseries/nougat.jpg', 'image_detail' => 'products/confiseries/nougat-detail.jpg'],
                ['nom' => 'Caramels beurre sale', 'description' => 'Caramels fondants cuits au chaudron.', 'prix_ht' => '5.40', 'stock' => 50, 'poids' => '0.14', 'image_principale' => 'products/confiseries/caramels.jpg', 'image_detail' => 'products/confiseries/caramels-detail.jpg'],
                ['nom' => 'Guimauves vanille miel', 'description' => 'Guimauves legeres parfumees a la vanille.', 'prix_ht' => '4.70', 'stock' => 46, 'poids' => '0.11', 'image_principale' => 'products/confiseries/guimauves.jpg', 'image_detail' => 'products/confiseries/guimauves-detail.jpg'],
                ['nom' => 'Bonbons miel citron', 'description' => 'Pastilles artisanales aux notes fraiches.', 'prix_ht' => '3.90', 'stock' => 70, 'poids' => '0.09', 'image_principale' => 'products/confiseries/bonbons-miel-citron.jpg', 'image_detail' => 'products/confiseries/bonbons-miel-citron-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Cosmetiques',
                'description' => 'Soins artisanaux pour le visage et le corps.',
                'image' => 'categories/cosmetiques.jpg',
                'ordre' => 4,
            ],
            'artisan' => [
                'email' => 'cosmetiques.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Carpentier',
                'prenom' => 'Ines',
                'telephone' => '0470 13 23 33',
                'boutique' => 'Atelier Botanique',
                'description' => 'Cosmetiques solides et soins naturels issus de plantes locales.',
                'numero_tva' => 'BE0200000004',
                'iban' => 'BE68000111112225',
                'logo' => 'logos/atelier-botanique.png',
                'rue' => 'Clos des Fleurs 12',
                'ville' => $villeBruxelles,
            ],
            'products' => [
                ['nom' => 'Baume a levres miel', 'description' => 'Baume nourrissant enrichi en cire et miel.', 'prix_ht' => '4.20', 'stock' => 90, 'poids' => '0.02', 'image_principale' => 'products/cosmetiques/baume-levres.jpg', 'image_detail' => 'products/cosmetiques/baume-levres-detail.jpg'],
                ['nom' => 'Creme mains propolis', 'description' => 'Soin reparateur pour les mains seches.', 'prix_ht' => '8.60', 'stock' => 44, 'poids' => '0.08', 'image_principale' => 'products/cosmetiques/creme-mains.jpg', 'image_detail' => 'products/cosmetiques/creme-mains-detail.jpg'],
                ['nom' => 'Huile visage calendula', 'description' => 'Huile legere pour les peaux sensibles.', 'prix_ht' => '11.40', 'stock' => 30, 'poids' => '0.05', 'image_principale' => 'products/cosmetiques/huile-visage.jpg', 'image_detail' => 'products/cosmetiques/huile-visage-detail.jpg'],
                ['nom' => 'Gommage sucre et miel', 'description' => 'Exfoliant doux pour le corps.', 'prix_ht' => '9.80', 'stock' => 26, 'poids' => '0.16', 'image_principale' => 'products/cosmetiques/gommage.jpg', 'image_detail' => 'products/cosmetiques/gommage-detail.jpg'],
                ['nom' => 'Masque argile blanche', 'description' => 'Masque purifiant et apaisant pour le visage.', 'prix_ht' => '7.90', 'stock' => 34, 'poids' => '0.09', 'image_principale' => 'products/cosmetiques/masque.jpg', 'image_detail' => 'products/cosmetiques/masque-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Bougies',
                'description' => 'Bougies artisanales en cire naturelle et parfums fins.',
                'image' => 'categories/bougies.jpg',
                'ordre' => 5,
            ],
            'artisan' => [
                'email' => 'bougies.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Dumont',
                'prenom' => 'Hugo',
                'telephone' => '0470 14 24 34',
                'boutique' => 'Flamme Atelier',
                'description' => 'Bougies coulees a la main avec cire vegetale et meches coton.',
                'numero_tva' => 'BE0200000005',
                'iban' => 'BE68000111112226',
                'logo' => 'logos/flamme-atelier.png',
                'rue' => 'Rue des Chandelles 5',
                'ville' => $villeLyon,
            ],
            'products' => [
                ['nom' => 'Bougie miel dore', 'description' => 'Bougie chaleureuse a la cire d abeille.', 'prix_ht' => '12.50', 'stock' => 22, 'poids' => '0.30', 'image_principale' => 'products/bougies/miel-dore.jpg', 'image_detail' => 'products/bougies/miel-dore-detail.jpg'],
                ['nom' => 'Bougie fleur d oranger', 'description' => 'Parfum floral et diffusion reguliere.', 'prix_ht' => '13.20', 'stock' => 20, 'poids' => '0.30', 'image_principale' => 'products/bougies/fleur-oranger.jpg', 'image_detail' => 'products/bougies/fleur-oranger-detail.jpg'],
                ['nom' => 'Bougie pain d epices', 'description' => 'Notes gourmandes et epicees pour l hiver.', 'prix_ht' => '13.80', 'stock' => 18, 'poids' => '0.30', 'image_principale' => 'products/bougies/pain-epices.jpg', 'image_detail' => 'products/bougies/pain-epices-detail.jpg'],
                ['nom' => 'Bougie verveine', 'description' => 'Ambiance fraiche et vegetale.', 'prix_ht' => '11.90', 'stock' => 25, 'poids' => '0.28', 'image_principale' => 'products/bougies/verveine.jpg', 'image_detail' => 'products/bougies/verveine-detail.jpg'],
                ['nom' => 'Bougie bois ambré', 'description' => 'Sillage boise pour les interieurs cosy.', 'prix_ht' => '14.10', 'stock' => 16, 'poids' => '0.32', 'image_principale' => 'products/bougies/bois-ambre.jpg', 'image_detail' => 'products/bougies/bois-ambre-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Pollen',
                'description' => 'Pollen recolte, seche et conditionne artisanalement.',
                'image' => 'categories/pollen.jpg',
                'ordre' => 6,
            ],
            'artisan' => [
                'email' => 'pollen.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Marchal',
                'prenom' => 'Yanis',
                'telephone' => '0470 15 25 35',
                'boutique' => 'Le Grain Dore',
                'description' => 'Produits de la ruche centres sur le pollen de fleurs.',
                'numero_tva' => 'BE0200000006',
                'iban' => 'BE68000111112227',
                'logo' => 'logos/grain-dore.png',
                'rue' => 'Sentier des Ruches 14',
                'ville' => $villeBruxelles,
            ],
            'products' => [
                ['nom' => 'Pollen multifleurs', 'description' => 'Pollen sec aux notes florales variees.', 'prix_ht' => '7.50', 'stock' => 38, 'poids' => '0.12', 'image_principale' => 'products/pollen/multifleurs.jpg', 'image_detail' => 'products/pollen/multifleurs-detail.jpg'],
                ['nom' => 'Pollen frais congele', 'description' => 'Pollen preserve a froid pour garder ses aromes.', 'prix_ht' => '9.10', 'stock' => 20, 'poids' => '0.15', 'image_principale' => 'products/pollen/frais.jpg', 'image_detail' => 'products/pollen/frais-detail.jpg'],
                ['nom' => 'Pollen ciste', 'description' => 'Origine mediterraneenne et texture croquante.', 'prix_ht' => '8.80', 'stock' => 24, 'poids' => '0.12', 'image_principale' => 'products/pollen/ciste.jpg', 'image_detail' => 'products/pollen/ciste-detail.jpg'],
                ['nom' => 'Pollen aubepine', 'description' => 'Saveur douce et legumes secs en note finale.', 'prix_ht' => '8.40', 'stock' => 26, 'poids' => '0.12', 'image_principale' => 'products/pollen/aubepine.jpg', 'image_detail' => 'products/pollen/aubepine-detail.jpg'],
                ['nom' => 'Pollen printemps', 'description' => 'Melange saisonnier recolte au debut de saison.', 'prix_ht' => '7.90', 'stock' => 30, 'poids' => '0.12', 'image_principale' => 'products/pollen/printemps.jpg', 'image_detail' => 'products/pollen/printemps-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Propolis',
                'description' => 'Extraits et soins a base de propolis artisanale.',
                'image' => 'categories/propolis.jpg',
                'ordre' => 7,
            ],
            'artisan' => [
                'email' => 'propolis.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Garnier',
                'prenom' => 'Sofia',
                'telephone' => '0470 16 26 36',
                'boutique' => 'Essence de Propolis',
                'description' => 'Transformation artisanale de propolis brute et preparee.',
                'numero_tva' => 'BE0200000007',
                'iban' => 'BE68000111112228',
                'logo' => 'logos/essence-propolis.png',
                'rue' => 'Alee des Tilleuls 7',
                'ville' => $villeLyon,
            ],
            'products' => [
                ['nom' => 'Spray gorge propolis', 'description' => 'Spray concentre au gout doux et menthe.', 'prix_ht' => '8.30', 'stock' => 42, 'poids' => '0.04', 'image_principale' => 'products/propolis/spray-gorge.jpg', 'image_detail' => 'products/propolis/spray-gorge-detail.jpg'],
                ['nom' => 'Teinture mere propolis', 'description' => 'Extrait liquide prepare en petite serie.', 'prix_ht' => '10.90', 'stock' => 28, 'poids' => '0.05', 'image_principale' => 'products/propolis/teinture-mere.jpg', 'image_detail' => 'products/propolis/teinture-mere-detail.jpg'],
                ['nom' => 'Pastilles propolis miel', 'description' => 'Pastilles fondantes pour une pause reconfortante.', 'prix_ht' => '5.60', 'stock' => 54, 'poids' => '0.07', 'image_principale' => 'products/propolis/pastilles.jpg', 'image_detail' => 'products/propolis/pastilles-detail.jpg'],
                ['nom' => 'Baume propolis intense', 'description' => 'Baume polyvalent a appliquer localement.', 'prix_ht' => '7.40', 'stock' => 36, 'poids' => '0.03', 'image_principale' => 'products/propolis/baume.jpg', 'image_detail' => 'products/propolis/baume-detail.jpg'],
                ['nom' => 'Solution propolis brute', 'description' => 'Preparation artisanale a forte teneur en propolis.', 'prix_ht' => '11.70', 'stock' => 20, 'poids' => '0.05', 'image_principale' => 'products/propolis/solution-brute.jpg', 'image_detail' => 'products/propolis/solution-brute-detail.jpg'],
            ],
        ],
        [
            'category' => [
                'nom' => 'Coffrets',
                'description' => 'Coffrets cadeaux composant plusieurs creations artisanales.',
                'image' => 'categories/coffrets.jpg',
                'ordre' => 8,
            ],
            'artisan' => [
                'email' => 'coffrets.artisan@example.com',
                'password' => 'artisan123',
                'nom' => 'Petit',
                'prenom' => 'Clara',
                'telephone' => '0470 17 27 37',
                'boutique' => 'La Ruche en Coffret',
                'description' => 'Assemblages cadeaux autour des produits de la ruche.',
                'numero_tva' => 'BE0200000008',
                'iban' => 'BE68000111112229',
                'logo' => 'logos/ruche-coffret.png',
                'rue' => 'Quai des Artisans 19',
                'ville' => $villeBruxelles,
            ],
            'products' => [
                ['nom' => 'Coffret douceur du matin', 'description' => 'Selection petit dejeuner avec miel et tisane.', 'prix_ht' => '24.90', 'stock' => 14, 'poids' => '1.20', 'image_principale' => 'products/coffrets/douceur-matin.jpg', 'image_detail' => 'products/coffrets/douceur-matin-detail.jpg'],
                ['nom' => 'Coffret bain relaxant', 'description' => 'Savon, baume et bougie pour une pause detente.', 'prix_ht' => '29.50', 'stock' => 12, 'poids' => '1.35', 'image_principale' => 'products/coffrets/bain-relaxant.jpg', 'image_detail' => 'products/coffrets/bain-relaxant-detail.jpg'],
                ['nom' => 'Coffret gourmand au miel', 'description' => 'Miels et confiseries artisanales en coffret cadeau.', 'prix_ht' => '27.80', 'stock' => 16, 'poids' => '1.40', 'image_principale' => 'products/coffrets/gourmand.jpg', 'image_detail' => 'products/coffrets/gourmand-detail.jpg'],
                ['nom' => 'Coffret bien etre propolis', 'description' => 'Routine bien etre avec propolis, pollen et infusion.', 'prix_ht' => '31.20', 'stock' => 10, 'poids' => '1.10', 'image_principale' => 'products/coffrets/bien-etre.jpg', 'image_detail' => 'products/coffrets/bien-etre-detail.jpg'],
                ['nom' => 'Coffret maison parfumee', 'description' => 'Bougie, spray et douceurs pour offrir.', 'prix_ht' => '33.40', 'stock' => 8, 'poids' => '1.50', 'image_principale' => 'products/coffrets/maison-parfumee.jpg', 'image_detail' => 'products/coffrets/maison-parfumee-detail.jpg'],
            ],
        ],
    ];

    $createdProducts = [];
    $createdArtisans = [];

    foreach ($catalogues as $catalogueIndex => $catalogue) {
        $category = firstOrCreate(Categorie::class, ['nom' => $catalogue['category']['nom']], [
            'description' => $catalogue['category']['description'],
            'image' => $catalogue['category']['image'],
            'ordre' => $catalogue['category']['ordre'],
            'actif' => 1,
        ]);

        $artisanUser = firstOrCreate(Utilisateur::class, ['email' => $catalogue['artisan']['email']], [
            'mot_de_passe' => password_hash($catalogue['artisan']['password'], PASSWORD_BCRYPT),
            'nom' => $catalogue['artisan']['nom'],
            'prenom' => $catalogue['artisan']['prenom'],
            'telephone' => $catalogue['artisan']['telephone'],
            'id_role' => $roleArtisan['id_role'],
            'date_inscription' => date('Y-m-d H:i:s'),
            'actif' => 1,
        ]);

        $artisanAdresse = firstOrCreate(Adresse::class, [
            'rue' => $catalogue['artisan']['rue'],
            'id_ville' => $catalogue['artisan']['ville']['id_ville'],
        ], [
            'complement' => null,
            'type_adresse' => 'atelier',
            'principale' => 1,
        ]);

        firstOrCreate(RUtilisateurAdresse::class, [
            'id_utilisateur' => $artisanUser['id_utilisateur'],
            'id_adresse' => $artisanAdresse['id_adresse'],
        ]);

        $artisan = firstOrCreate(Artisan::class, ['id_utilisateur' => $artisanUser['id_utilisateur']], [
            'nom_boutique' => $catalogue['artisan']['boutique'],
            'description' => $catalogue['artisan']['description'],
            'numero_tva' => $catalogue['artisan']['numero_tva'],
            'iban' => $catalogue['artisan']['iban'],
            'commission' => 12.5,
            'date_validation' => date('Y-m-d H:i:s'),
            'logo' => $catalogue['artisan']['logo'],
            'valide' => 1,
        ]);

        $createdArtisans[] = $artisan;

        foreach ($catalogue['products'] as $productIndex => $product) {
            $created = firstOrCreate(Produit::class, ['nom' => $product['nom']], [
                'description' => $product['description'],
                'prix_ht' => $product['prix_ht'],
                'taux_tva' => '6.00',
                'stock' => $product['stock'],
                'poids' => $product['poids'],
                'image_principale' => $product['image_principale'],
                'actif' => 1,
                'mis_en_avant' => $productIndex === 0 ? 1 : 0,
                'id_artisan' => $artisan['id_artisan'],
                'date_creation' => date('Y-m-d H:i:s', strtotime('-' . ($catalogueIndex + $productIndex) . ' days')),
            ]);

            $createdProducts[] = $created;

            firstOrCreate(Classe::class, [
                'id_categorie' => $category['id_categorie'],
                'id_produit' => $created['id_produit'],
            ]);

            firstOrCreate(ImageProduit::class, [
                'id_produit' => $created['id_produit'],
                'chemin' => $product['image_principale'],
            ], [
                'alt' => $product['nom'] . ' - vue principale',
                'ordre' => 1,
            ]);

            firstOrCreate(ImageProduit::class, [
                'id_produit' => $created['id_produit'],
                'chemin' => $product['image_detail'],
            ], [
                'alt' => $product['nom'] . ' - detail',
                'ordre' => 2,
            ]);
        }
    }

    echo "Seeding commande, ligne_commande, paiement, avis et statistiques...\n";

    $firstClient = $clientUsers[0] ?? null;
    if ($firstClient !== null && !empty($createdProducts)) {
        try {
            $adressesClient = RUtilisateurAdresse::getByUtilisateurId((int) $firstClient['id_utilisateur']);
            $idAdresse = (int) ($adressesClient[0]['id_adresse'] ?? 0);

            if ($idAdresse > 0) {
                $reference = 'CMD-SEED-0001';
                $selectedProducts = array_values(array_filter([
                    $createdProducts[0] ?? null,
                    $createdProducts[1] ?? null,
                ]));
                $totalHt = array_reduce($selectedProducts, static function (float $carry, array $product): float {
                    return $carry + (float) $product['prix_ht'];
                }, 0.0);
                $totalTva = array_reduce($selectedProducts, static function (float $carry, array $product): float {
                    return $carry + (((float) $product['prix_ht']) * ((float) $product['taux_tva']) / 100);
                }, 0.0);
                $fraisLivraison = 5.00;
                $commandePayload = [
                    'id_utilisateur' => $firstClient['id_utilisateur'],
                    'id_adresse' => $idAdresse,
                    'statut' => 'payee',
                    'total_ht' => round($totalHt, 2),
                    'total_tva' => round($totalTva, 2),
                    'frais_livraison' => $fraisLivraison,
                    'total_ttc' => round($totalHt + $totalTva + $fraisLivraison, 2),
                    'date_commande' => date('Y-m-d H:i:s', strtotime('-1 day')),
                    'date_paiement' => date('Y-m-d H:i:s', strtotime('-1 day +30 minutes')),
                ];
                $commande = firstOrCreate(Commande::class, ['reference' => $reference], [
                    ...$commandePayload,
                ]);

                if (!empty($commande['id_commande'])) {
                    Commande::updateRecord((int) $commande['id_commande'], $commandePayload);
                }

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
                    'montant' => $commandePayload['total_ttc'],
                    'statut' => 'valide',
                    'date_paiement' => date('Y-m-d H:i:s', strtotime('-1 day +30 minutes')),
                ]);

                $payments = Paiement::where('id_commande', $commande['id_commande']);
                if (!empty($payments[0]['id_paiement'])) {
                    Paiement::updateRecord((int) $payments[0]['id_paiement'], [
                        'methode' => 'carte',
                        'reference_externe' => 'TX-SEED-0001',
                        'montant' => $commandePayload['total_ttc'],
                        'statut' => 'valide',
                        'date_paiement' => date('Y-m-d H:i:s', strtotime('-1 day +30 minutes')),
                    ]);
                }

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

        $artisanForStat = $createdArtisans[0] ?? null;
        if ($artisanForStat !== null) {
            firstOrCreate(StatistiqueArtisan::class, ['id_artisan' => $artisanForStat['id_artisan']], [
            'id_utilisateur' => (string) $firstClient['id_utilisateur'],
            'date_consultation' => date('Y-m-d H:i:s'),
            'ip_adress' => '127.0.0.1',
            'id_produit' => (string) $createdProducts[0]['id_produit'],
            ]);
        }
    }

    echo "Seed complete. Roles (client, artisan, administrateur), referentiels, produits, commandes et avis crees.\n";
} catch (Throwable $e) {
    echo 'Error: ' . $e->getMessage() . "\n";
    exit(1);
}
