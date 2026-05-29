-- Seed complementaire du catalogue specialise.
-- Prerequis: la base schema est deja en place avec les villes Bruxelles et Lyon.

START TRANSACTION;

DROP TEMPORARY TABLE IF EXISTS tmp_seed_artisans;
CREATE TEMPORARY TABLE tmp_seed_artisans (
    email VARCHAR(255) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(50) NOT NULL,
    nom_boutique VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    numero_tva VARCHAR(50) NOT NULL,
    iban VARCHAR(50) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    rue VARCHAR(255) NOT NULL,
    nom_ville VARCHAR(100) NOT NULL
);

INSERT INTO tmp_seed_artisans (email, mot_de_passe, nom, prenom, telephone, nom_boutique, description, numero_tva, iban, logo, rue, nom_ville) VALUES
('miels.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Lambert', 'Nora', '0470 10 20 30', 'Rucher des Collines', 'Production de miels de terroir et de saison.', 'BE0200000001', 'BE68000111112222', 'logos/rucher-collines.png', 'Chemin des Abeilles 1', 'Lyon'),
('savons.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Bernier', 'Lea', '0470 11 21 31', 'Savonnerie du Verger', 'Savons doux enrichis en huiles vegetales et beurres naturels.', 'BE0200000002', 'BE68000111112223', 'logos/savonnerie-verger.png', 'Rue des Herbiers 8', 'Bruxelles'),
('confiseries.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Renaud', 'Mila', '0470 12 22 32', 'Maison des Douceurs', 'Confiseries artisanales preparees en petites series.', 'BE0200000003', 'BE68000111112224', 'logos/maison-douceurs.png', 'Place des Gourmands 3', 'Lyon'),
('cosmetiques.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Carpentier', 'Ines', '0470 13 23 33', 'Atelier Botanique', 'Cosmetiques solides et soins naturels issus de plantes locales.', 'BE0200000004', 'BE68000111112225', 'logos/atelier-botanique.png', 'Clos des Fleurs 12', 'Bruxelles'),
('bougies.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Dumont', 'Hugo', '0470 14 24 34', 'Flamme Atelier', 'Bougies coulees a la main avec cire vegetale et meches coton.', 'BE0200000005', 'BE68000111112226', 'logos/flamme-atelier.png', 'Rue des Chandelles 5', 'Lyon'),
('pollen.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Marchal', 'Yanis', '0470 15 25 35', 'Le Grain Dore', 'Produits de la ruche centres sur le pollen de fleurs.', 'BE0200000006', 'BE68000111112227', 'logos/grain-dore.png', 'Sentier des Ruches 14', 'Bruxelles'),
('propolis.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Garnier', 'Sofia', '0470 16 26 36', 'Essence de Propolis', 'Transformation artisanale de propolis brute et preparee.', 'BE0200000007', 'BE68000111112228', 'logos/essence-propolis.png', 'Alee des Tilleuls 7', 'Lyon'),
('coffrets.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Petit', 'Clara', '0470 17 27 37', 'La Ruche en Coffret', 'Assemblages cadeaux autour des produits de la ruche.', 'BE0200000008', 'BE68000111112229', 'logos/ruche-coffret.png', 'Quai des Artisans 19', 'Bruxelles');

DROP TEMPORARY TABLE IF EXISTS tmp_seed_categories;
CREATE TEMPORARY TABLE tmp_seed_categories (
    nom VARCHAR(100) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    image VARCHAR(255) NOT NULL,
    ordre INT NOT NULL,
    artisan_email VARCHAR(255) NOT NULL
);

INSERT INTO tmp_seed_categories (nom, description, image, ordre, artisan_email) VALUES
('Miels', 'Selection de miels artisanaux issus de ruchers locaux.', 'categories/miels.jpg', 1, 'miels.artisan@example.com'),
('Savons', 'Savons saponifies a froid aux ingredients naturels.', 'categories/savons.jpg', 2, 'savons.artisan@example.com'),
('Confiseries', 'Douceurs artisanales au miel et aux fruits.', 'categories/confiseries.jpg', 3, 'confiseries.artisan@example.com'),
('Cosmetiques', 'Soins artisanaux pour le visage et le corps.', 'categories/cosmetiques.jpg', 4, 'cosmetiques.artisan@example.com'),
('Bougies', 'Bougies artisanales en cire naturelle et parfums fins.', 'categories/bougies.jpg', 5, 'bougies.artisan@example.com'),
('Pollen', 'Pollen recolte, seche et conditionne artisanalement.', 'categories/pollen.jpg', 6, 'pollen.artisan@example.com'),
('Propolis', 'Extraits et soins a base de propolis artisanale.', 'categories/propolis.jpg', 7, 'propolis.artisan@example.com'),
('Coffrets', 'Coffrets cadeaux composant plusieurs creations artisanales.', 'categories/coffrets.jpg', 8, 'coffrets.artisan@example.com');

DROP TEMPORARY TABLE IF EXISTS tmp_seed_products;
CREATE TEMPORARY TABLE tmp_seed_products (
    category_nom VARCHAR(100) NOT NULL,
    artisan_email VARCHAR(255) NOT NULL,
    nom VARCHAR(200) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    prix_ht DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL,
    poids DECIMAL(8,2) NOT NULL,
    image_principale VARCHAR(255) NOT NULL,
    image_detail VARCHAR(255) NOT NULL,
    mis_en_avant BOOLEAN NOT NULL,
    days_offset INT NOT NULL
);

INSERT INTO tmp_seed_products (category_nom, artisan_email, nom, description, prix_ht, stock, poids, image_principale, image_detail, mis_en_avant, days_offset) VALUES
('Miels', 'miels.artisan@example.com', 'Miel de fleurs sauvages', 'Miel doux recolte sur des prairies fleuries.', 8.90, 40, 0.25, 'products/miels/fleurs-sauvages.jpg', 'products/miels/fleurs-sauvages-detail.jpg', 1, 0),
('Miels', 'miels.artisan@example.com', 'Miel d acacia', 'Texture fluide et notes legeres pour les petits dejeuners.', 9.40, 32, 0.25, 'products/miels/acacia.jpg', 'products/miels/acacia-detail.jpg', 0, 1),
('Miels', 'miels.artisan@example.com', 'Miel de foret', 'Miel ambre aux aromes boises et soutenus.', 10.20, 28, 0.25, 'products/miels/foret.jpg', 'products/miels/foret-detail.jpg', 0, 2),
('Miels', 'miels.artisan@example.com', 'Miel de chataignier', 'Saveur puissante et finale legerement amere.', 10.80, 24, 0.25, 'products/miels/chataignier.jpg', 'products/miels/chataignier-detail.jpg', 0, 3),
('Miels', 'miels.artisan@example.com', 'Miel creme du rucher', 'Miel foisonne ideal pour les tartines.', 9.80, 30, 0.25, 'products/miels/creme.jpg', 'products/miels/creme-detail.jpg', 0, 4),
('Savons', 'savons.artisan@example.com', 'Savon lavande apaisant', 'Savon parfume a la lavande avec mousse cremeuse.', 5.90, 60, 0.10, 'products/savons/lavande.jpg', 'products/savons/lavande-detail.jpg', 1, 1),
('Savons', 'savons.artisan@example.com', 'Savon miel et avoine', 'Nettoie en douceur et apaise les peaux sensibles.', 6.20, 48, 0.10, 'products/savons/miel-avoine.jpg', 'products/savons/miel-avoine-detail.jpg', 0, 2),
('Savons', 'savons.artisan@example.com', 'Savon charbon purifiant', 'Formule minerale dediee aux peaux mixtes.', 6.50, 45, 0.10, 'products/savons/charbon.jpg', 'products/savons/charbon-detail.jpg', 0, 3),
('Savons', 'savons.artisan@example.com', 'Savon agrumes tonique', 'Notes fraiches d orange et de citron.', 5.80, 52, 0.10, 'products/savons/agrumes.jpg', 'products/savons/agrumes-detail.jpg', 0, 4),
('Savons', 'savons.artisan@example.com', 'Savon lait d amande', 'Texture onctueuse et parfum legerement gourmand.', 6.40, 40, 0.10, 'products/savons/amande.jpg', 'products/savons/amande-detail.jpg', 0, 5),
('Confiseries', 'confiseries.artisan@example.com', 'Pates de fruits framboise', 'Bonbons moelleux a la framboise et au miel.', 4.90, 55, 0.12, 'products/confiseries/pates-fruits.jpg', 'products/confiseries/pates-fruits-detail.jpg', 1, 2),
('Confiseries', 'confiseries.artisan@example.com', 'Nougat tendre aux amandes', 'Nougat souple aux amandes grillees.', 7.10, 35, 0.18, 'products/confiseries/nougat.jpg', 'products/confiseries/nougat-detail.jpg', 0, 3),
('Confiseries', 'confiseries.artisan@example.com', 'Caramels beurre sale', 'Caramels fondants cuits au chaudron.', 5.40, 50, 0.14, 'products/confiseries/caramels.jpg', 'products/confiseries/caramels-detail.jpg', 0, 4),
('Confiseries', 'confiseries.artisan@example.com', 'Guimauves vanille miel', 'Guimauves legeres parfumees a la vanille.', 4.70, 46, 0.11, 'products/confiseries/guimauves.jpg', 'products/confiseries/guimauves-detail.jpg', 0, 5),
('Confiseries', 'confiseries.artisan@example.com', 'Bonbons miel citron', 'Pastilles artisanales aux notes fraiches.', 3.90, 70, 0.09, 'products/confiseries/bonbons-miel-citron.jpg', 'products/confiseries/bonbons-miel-citron-detail.jpg', 0, 6),
('Cosmetiques', 'cosmetiques.artisan@example.com', 'Baume a levres miel', 'Baume nourrissant enrichi en cire et miel.', 4.20, 90, 0.02, 'products/cosmetiques/baume-levres.jpg', 'products/cosmetiques/baume-levres-detail.jpg', 1, 3),
('Cosmetiques', 'cosmetiques.artisan@example.com', 'Creme mains propolis', 'Soin reparateur pour les mains seches.', 8.60, 44, 0.08, 'products/cosmetiques/creme-mains.jpg', 'products/cosmetiques/creme-mains-detail.jpg', 0, 4),
('Cosmetiques', 'cosmetiques.artisan@example.com', 'Huile visage calendula', 'Huile legere pour les peaux sensibles.', 11.40, 30, 0.05, 'products/cosmetiques/huile-visage.jpg', 'products/cosmetiques/huile-visage-detail.jpg', 0, 5),
('Cosmetiques', 'cosmetiques.artisan@example.com', 'Gommage sucre et miel', 'Exfoliant doux pour le corps.', 9.80, 26, 0.16, 'products/cosmetiques/gommage.jpg', 'products/cosmetiques/gommage-detail.jpg', 0, 6),
('Cosmetiques', 'cosmetiques.artisan@example.com', 'Masque argile blanche', 'Masque purifiant et apaisant pour le visage.', 7.90, 34, 0.09, 'products/cosmetiques/masque.jpg', 'products/cosmetiques/masque-detail.jpg', 0, 7),
('Bougies', 'bougies.artisan@example.com', 'Bougie miel dore', 'Bougie chaleureuse a la cire d abeille.', 12.50, 22, 0.30, 'products/bougies/miel-dore.jpg', 'products/bougies/miel-dore-detail.jpg', 1, 4),
('Bougies', 'bougies.artisan@example.com', 'Bougie fleur d oranger', 'Parfum floral et diffusion reguliere.', 13.20, 20, 0.30, 'products/bougies/fleur-oranger.jpg', 'products/bougies/fleur-oranger-detail.jpg', 0, 5),
('Bougies', 'bougies.artisan@example.com', 'Bougie pain d epices', 'Notes gourmandes et epicees pour l hiver.', 13.80, 18, 0.30, 'products/bougies/pain-epices.jpg', 'products/bougies/pain-epices-detail.jpg', 0, 6),
('Bougies', 'bougies.artisan@example.com', 'Bougie verveine', 'Ambiance fraiche et vegetale.', 11.90, 25, 0.28, 'products/bougies/verveine.jpg', 'products/bougies/verveine-detail.jpg', 0, 7),
('Bougies', 'bougies.artisan@example.com', 'Bougie bois ambre', 'Sillage boise pour les interieurs cosy.', 14.10, 16, 0.32, 'products/bougies/bois-ambre.jpg', 'products/bougies/bois-ambre-detail.jpg', 0, 8),
('Pollen', 'pollen.artisan@example.com', 'Pollen multifleurs', 'Pollen sec aux notes florales variees.', 7.50, 38, 0.12, 'products/pollen/multifleurs.jpg', 'products/pollen/multifleurs-detail.jpg', 1, 5),
('Pollen', 'pollen.artisan@example.com', 'Pollen frais congele', 'Pollen preserve a froid pour garder ses aromes.', 9.10, 20, 0.15, 'products/pollen/frais.jpg', 'products/pollen/frais-detail.jpg', 0, 6),
('Pollen', 'pollen.artisan@example.com', 'Pollen ciste', 'Origine mediterraneenne et texture croquante.', 8.80, 24, 0.12, 'products/pollen/ciste.jpg', 'products/pollen/ciste-detail.jpg', 0, 7),
('Pollen', 'pollen.artisan@example.com', 'Pollen aubepine', 'Saveur douce et legumes secs en note finale.', 8.40, 26, 0.12, 'products/pollen/aubepine.jpg', 'products/pollen/aubepine-detail.jpg', 0, 8),
('Pollen', 'pollen.artisan@example.com', 'Pollen printemps', 'Melange saisonnier recolte au debut de saison.', 7.90, 30, 0.12, 'products/pollen/printemps.jpg', 'products/pollen/printemps-detail.jpg', 0, 9),
('Propolis', 'propolis.artisan@example.com', 'Spray gorge propolis', 'Spray concentre au gout doux et menthe.', 8.30, 42, 0.04, 'products/propolis/spray-gorge.jpg', 'products/propolis/spray-gorge-detail.jpg', 1, 6),
('Propolis', 'propolis.artisan@example.com', 'Teinture mere propolis', 'Extrait liquide prepare en petite serie.', 10.90, 28, 0.05, 'products/propolis/teinture-mere.jpg', 'products/propolis/teinture-mere-detail.jpg', 0, 7),
('Propolis', 'propolis.artisan@example.com', 'Pastilles propolis miel', 'Pastilles fondantes pour une pause reconfortante.', 5.60, 54, 0.07, 'products/propolis/pastilles.jpg', 'products/propolis/pastilles-detail.jpg', 0, 8),
('Propolis', 'propolis.artisan@example.com', 'Baume propolis intense', 'Baume polyvalent a appliquer localement.', 7.40, 36, 0.03, 'products/propolis/baume.jpg', 'products/propolis/baume-detail.jpg', 0, 9),
('Propolis', 'propolis.artisan@example.com', 'Solution propolis brute', 'Preparation artisanale a forte teneur en propolis.', 11.70, 20, 0.05, 'products/propolis/solution-brute.jpg', 'products/propolis/solution-brute-detail.jpg', 0, 10),
('Coffrets', 'coffrets.artisan@example.com', 'Coffret douceur du matin', 'Selection petit dejeuner avec miel et tisane.', 24.90, 14, 1.20, 'products/coffrets/douceur-matin.jpg', 'products/coffrets/douceur-matin-detail.jpg', 1, 7),
('Coffrets', 'coffrets.artisan@example.com', 'Coffret bain relaxant', 'Savon, baume et bougie pour une pause detente.', 29.50, 12, 1.35, 'products/coffrets/bain-relaxant.jpg', 'products/coffrets/bain-relaxant-detail.jpg', 0, 8),
('Coffrets', 'coffrets.artisan@example.com', 'Coffret gourmand au miel', 'Miels et confiseries artisanales en coffret cadeau.', 27.80, 16, 1.40, 'products/coffrets/gourmand.jpg', 'products/coffrets/gourmand-detail.jpg', 0, 9),
('Coffrets', 'coffrets.artisan@example.com', 'Coffret bien etre propolis', 'Routine bien etre avec propolis, pollen et infusion.', 31.20, 10, 1.10, 'products/coffrets/bien-etre.jpg', 'products/coffrets/bien-etre-detail.jpg', 0, 10),
('Coffrets', 'coffrets.artisan@example.com', 'Coffret maison parfumee', 'Bougie, spray et douceurs pour offrir.', 33.40, 8, 1.50, 'products/coffrets/maison-parfumee.jpg', 'products/coffrets/maison-parfumee-detail.jpg', 0, 11);

INSERT INTO utilisateur (email, mot_de_passe, nom, prenom, telephone, date_inscription, actif, Id_role)
SELECT a.email, a.mot_de_passe, a.nom, a.prenom, a.telephone, NOW(), 1, 2
FROM tmp_seed_artisans a
WHERE NOT EXISTS (
    SELECT 1
    FROM utilisateur u
    WHERE u.email = a.email
);

INSERT INTO adresse (rue, complement, type_adresse, principale, Id_ville)
SELECT a.rue, NULL, 'atelier', 1, v.Id_ville
FROM tmp_seed_artisans a
INNER JOIN ville v ON v.nom_ville = a.nom_ville
WHERE NOT EXISTS (
    SELECT 1
    FROM adresse ad
    WHERE ad.rue = a.rue
      AND ad.Id_ville = v.Id_ville
);

INSERT INTO r_utilisateur_adresse (Id_utilisateur, Id_adresse)
SELECT u.Id_utilisateur, ad.Id_adresse
FROM tmp_seed_artisans a
INNER JOIN utilisateur u ON u.email = a.email
INNER JOIN ville v ON v.nom_ville = a.nom_ville
INNER JOIN adresse ad ON ad.rue = a.rue AND ad.Id_ville = v.Id_ville
WHERE NOT EXISTS (
    SELECT 1
    FROM r_utilisateur_adresse rua
    WHERE rua.Id_utilisateur = u.Id_utilisateur
      AND rua.Id_adresse = ad.Id_adresse
);

INSERT INTO artisan (nom_boutique, description, numero_tva, iban, commission, valide, date_validation, logo, Id_utilisateur)
SELECT a.nom_boutique, a.description, a.numero_tva, a.iban, 12.50, 1, NOW(), a.logo, u.Id_utilisateur
FROM tmp_seed_artisans a
INNER JOIN utilisateur u ON u.email = a.email
WHERE NOT EXISTS (
    SELECT 1
    FROM artisan ar
    WHERE ar.Id_utilisateur = u.Id_utilisateur
);

INSERT INTO categorie (nom, description, image, ordre, actif, Id_categorie_1)
SELECT c.nom, c.description, c.image, c.ordre, 1, NULL
FROM tmp_seed_categories c
WHERE NOT EXISTS (
    SELECT 1
    FROM categorie cat
    WHERE cat.nom = c.nom
);

INSERT INTO produit (nom, description, prix_ht, taux_tva, stock, poids, image_principale, actif, mis_en_avant, nb_vues, date_creation, Id_artisan)
SELECT p.nom, p.description, p.prix_ht, 6.00, p.stock, p.poids, p.image_principale, 1, p.mis_en_avant, 0, DATE_SUB(NOW(), INTERVAL p.days_offset DAY), ar.Id_artisan
FROM tmp_seed_products p
INNER JOIN utilisateur u ON u.email = p.artisan_email
INNER JOIN artisan ar ON ar.Id_utilisateur = u.Id_utilisateur
WHERE NOT EXISTS (
    SELECT 1
    FROM produit pr
    WHERE pr.nom = p.nom
);

INSERT INTO classe (Id_categorie, Id_produit)
SELECT c.Id_categorie, p.Id_produit
FROM tmp_seed_products sp
INNER JOIN categorie c ON c.nom = sp.category_nom
INNER JOIN produit p ON p.nom = sp.nom
WHERE NOT EXISTS (
    SELECT 1
    FROM classe cl
    WHERE cl.Id_categorie = c.Id_categorie
      AND cl.Id_produit = p.Id_produit
);

INSERT INTO image_produit (chemin, alt, ordre, Id_produit)
SELECT sp.image_principale, CONCAT(sp.nom, ' - vue principale'), 1, p.Id_produit
FROM tmp_seed_products sp
INNER JOIN produit p ON p.nom = sp.nom
WHERE NOT EXISTS (
    SELECT 1
    FROM image_produit ip
    WHERE ip.Id_produit = p.Id_produit
      AND ip.chemin = sp.image_principale
);

INSERT INTO image_produit (chemin, alt, ordre, Id_produit)
SELECT sp.image_detail, CONCAT(sp.nom, ' - detail'), 2, p.Id_produit
FROM tmp_seed_products sp
INNER JOIN produit p ON p.nom = sp.nom
WHERE NOT EXISTS (
    SELECT 1
    FROM image_produit ip
    WHERE ip.Id_produit = p.Id_produit
      AND ip.chemin = sp.image_detail
);

DROP TEMPORARY TABLE IF EXISTS tmp_seed_products;
DROP TEMPORARY TABLE IF EXISTS tmp_seed_categories;
DROP TEMPORARY TABLE IF EXISTS tmp_seed_artisans;

COMMIT;