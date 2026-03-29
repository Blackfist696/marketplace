-- ============================================================
--  MARKETPLACE DE PRODUITS ARTISANAUX
--  Base de données : marketplace_artisanal
--  SGBD : MariaDB 10.11+ / MySQL 8.0+
--  Encodage : utf8mb4
--  Auteurs : Ramy - Pascal
--  Projet d'intégration 2025-2026
-- ============================================================

-- Création de la base de données
CREATE DATABASE IF NOT EXISTS marketplace_artisanal
  CHARACTER SET utf8mb4 
  COLLATE utf8mb4_unicode_ci;

USE marketplace_artisanal;

-- ============================================================
-- TABLES
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- Table : roles
-- Description : Rôles et permissions des utilisateurs
-- ────────────────────────────────────────────────────────────
CREATE TABLE roles (
  id_role     INT AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  
  INDEX idx_nom (nom)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : utilisateurs
-- Description : Comptes de connexion
-- ────────────────────────────────────────────────────────────
CREATE TABLE utilisateurs (
  id_utilisateur   INT AUTO_INCREMENT PRIMARY KEY,
  email            VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe     VARCHAR(255) NOT NULL,
  id_role          INT NOT NULL,
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  actif            BOOLEAN DEFAULT TRUE,
  
  CONSTRAINT fk_util_role
    FOREIGN KEY (id_role) REFERENCES roles(id_role)
    ON DELETE RESTRICT 
    ON UPDATE CASCADE,
    
  INDEX idx_email (email),
  INDEX idx_role (id_role)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : personnes
-- Description : Informations personnelles des utilisateurs
-- ────────────────────────────────────────────────────────────
CREATE TABLE personnes (
  id_personne    INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateur INT NOT NULL UNIQUE,
  nom            VARCHAR(100) NOT NULL,
  prenom         VARCHAR(100) NOT NULL,
  telephone      VARCHAR(20),
  
  CONSTRAINT fk_pers_util
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
    ON DELETE CASCADE,
    
  INDEX idx_utilisateur (id_utilisateur)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : adresses
-- Description : Adresses de livraison et facturation
-- ────────────────────────────────────────────────────────────
CREATE TABLE adresses (
  id_adresse   INT AUTO_INCREMENT PRIMARY KEY,
  id_personne  INT NOT NULL,
  type_adresse ENUM('livraison', 'facturation') NOT NULL,
  rue          VARCHAR(255) NOT NULL,
  numero       VARCHAR(10) NOT NULL,
  code_postal  VARCHAR(10) NOT NULL,
  ville        VARCHAR(100) NOT NULL,
  pays         VARCHAR(100) NOT NULL DEFAULT 'Belgique',
  principale   BOOLEAN DEFAULT FALSE,
  
  CONSTRAINT fk_adr_pers
    FOREIGN KEY (id_personne) REFERENCES personnes(id_personne)
    ON DELETE CASCADE,
    
  INDEX idx_personne (id_personne),
  INDEX idx_type (type_adresse)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : templates_css
-- Description : Thèmes visuels pour les boutiques artisans
-- ────────────────────────────────────────────────────────────
CREATE TABLE templates_css (
  id_template INT AUTO_INCREMENT PRIMARY KEY,
  nom         VARCHAR(100) NOT NULL,
  description TEXT,
  fichier_css VARCHAR(255) NOT NULL,
  apercu      VARCHAR(255)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : artisans
-- Description : Profils et boutiques des artisans vendeurs
-- ────────────────────────────────────────────────────────────
CREATE TABLE artisans (
  id_artisan          INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateur      INT NOT NULL UNIQUE,
  id_template         INT,
  nom_boutique        VARCHAR(150) NOT NULL,
  description         TEXT,
  logo                VARCHAR(255),
  banniere            VARCHAR(255),
  siret               VARCHAR(14) UNIQUE,
  iban                VARCHAR(34),
  couleur_primaire    VARCHAR(7) DEFAULT '#D4A855',
  couleur_secondaire  VARCHAR(7),
  police_principale   VARCHAR(100),
  commission          DECIMAL(5,2) DEFAULT 5.00,
  valide              BOOLEAN DEFAULT FALSE,
  date_validation     DATETIME,
  
  CONSTRAINT fk_art_util
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
    ON DELETE CASCADE,
  CONSTRAINT fk_art_tmpl
    FOREIGN KEY (id_template) REFERENCES templates_css(id_template)
    ON DELETE SET NULL,
    
  INDEX idx_utilisateur (id_utilisateur),
  INDEX idx_valide (valide),
  INDEX idx_siret (siret)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : categories
-- Description : Catégories hiérarchiques de produits
-- ────────────────────────────────────────────────────────────
CREATE TABLE categories (
  id_categorie INT AUTO_INCREMENT PRIMARY KEY,
  parent_id    INT NULL,
  nom          VARCHAR(100) NOT NULL,
  description  TEXT,
  image        VARCHAR(255),
  ordre        INT DEFAULT 0,
  actif        BOOLEAN DEFAULT TRUE,
  
  CONSTRAINT fk_cat_parent
    FOREIGN KEY (parent_id) REFERENCES categories(id_categorie)
    ON DELETE SET NULL,
    
  INDEX idx_parent (parent_id),
  INDEX idx_actif (actif)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : produits
-- Description : Fiches produits artisanaux
-- ────────────────────────────────────────────────────────────
CREATE TABLE produits (
  id_produit       INT AUTO_INCREMENT PRIMARY KEY,
  id_artisan       INT NOT NULL,
  id_categorie     INT NOT NULL,
  nom              VARCHAR(200) NOT NULL,
  description      TEXT,
  prix_ht          DECIMAL(10,2) NOT NULL,
  taux_tva         DECIMAL(5,2) DEFAULT 6.00,
  stock            INT DEFAULT 0,
  poids            DECIMAL(8,2),
  image_principale VARCHAR(255),
  actif            BOOLEAN DEFAULT TRUE,
  mis_en_avant     BOOLEAN DEFAULT FALSE,
  nb_vues          INT DEFAULT 0,
  date_creation    DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_prod_art
    FOREIGN KEY (id_artisan) REFERENCES artisans(id_artisan)
    ON DELETE RESTRICT,
  CONSTRAINT fk_prod_cat
    FOREIGN KEY (id_categorie) REFERENCES categories(id_categorie)
    ON DELETE RESTRICT,
    
  INDEX idx_artisan (id_artisan),
  INDEX idx_categorie (id_categorie),
  INDEX idx_actif (actif),
  INDEX idx_mis_en_avant (mis_en_avant),
  INDEX idx_date_creation (date_creation)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : images_produits
-- Description : Galerie photos des produits
-- ────────────────────────────────────────────────────────────
CREATE TABLE images_produits (
  id_image   INT AUTO_INCREMENT PRIMARY KEY,
  id_produit INT NOT NULL,
  chemin     VARCHAR(255) NOT NULL,
  alt        VARCHAR(200),
  ordre      INT DEFAULT 0,
  
  CONSTRAINT fk_img_prod
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit)
    ON DELETE CASCADE,
    
  INDEX idx_produit (id_produit)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : paniers
-- Description : Paniers d'achat (connectés et sessions)
-- ────────────────────────────────────────────────────────────
CREATE TABLE paniers (
  id_panier         INT AUTO_INCREMENT PRIMARY KEY,
  id_utilisateur    INT NULL,
  session_id        VARCHAR(255),
  date_creation     DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_modification DATETIME ON UPDATE CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_pan_util
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
    ON DELETE CASCADE,
    
  INDEX idx_utilisateur (id_utilisateur),
  INDEX idx_session (session_id)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : lignes_panier
-- Description : Articles dans les paniers
-- ────────────────────────────────────────────────────────────
CREATE TABLE lignes_panier (
  id_ligne      INT AUTO_INCREMENT PRIMARY KEY,
  id_panier     INT NOT NULL,
  id_produit    INT NOT NULL,
  quantite      INT NOT NULL DEFAULT 1,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  
  CONSTRAINT fk_lpan_pan
    FOREIGN KEY (id_panier) REFERENCES paniers(id_panier)
    ON DELETE CASCADE,
  CONSTRAINT fk_lpan_prod
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit)
    ON DELETE CASCADE,
    
  INDEX idx_panier (id_panier),
  INDEX idx_produit (id_produit)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : commandes
-- Description : Commandes passées par les clients
-- ────────────────────────────────────────────────────────────
CREATE TABLE commandes (
  id_commande            INT AUTO_INCREMENT PRIMARY KEY,
  reference              VARCHAR(50) NOT NULL UNIQUE,
  id_utilisateur         INT NOT NULL,
  id_adresse_livraison   INT NOT NULL,
  id_adresse_facturation INT NOT NULL,
  statut                 ENUM('en_attente', 'payee', 'en_preparation', 
                              'expediee', 'livree', 'annulee') 
                         DEFAULT 'en_attente',
  total_ht               DECIMAL(10,2) NOT NULL,
  total_tva              DECIMAL(10,2) NOT NULL,
  frais_livraison        DECIMAL(10,2) DEFAULT 0.00,
  total_ttc              DECIMAL(10,2) NOT NULL,
  date_commande          DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_paiement          DATETIME,
  
  CONSTRAINT fk_cmd_util
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
    ON DELETE RESTRICT,
  CONSTRAINT fk_cmd_adr_liv
    FOREIGN KEY (id_adresse_livraison) REFERENCES adresses(id_adresse)
    ON DELETE RESTRICT,
  CONSTRAINT fk_cmd_adr_fac
    FOREIGN KEY (id_adresse_facturation) REFERENCES adresses(id_adresse)
    ON DELETE RESTRICT,
    
  INDEX idx_reference (reference),
  INDEX idx_utilisateur (id_utilisateur),
  INDEX idx_statut (statut),
  INDEX idx_date_commande (date_commande)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : lignes_commande
-- Description : Détail des produits commandés
-- ────────────────────────────────────────────────────────────
CREATE TABLE lignes_commande (
  id_ligne         INT AUTO_INCREMENT PRIMARY KEY,
  id_commande      INT NOT NULL,
  id_produit       INT NOT NULL,
  id_artisan       INT NOT NULL,
  quantite         INT NOT NULL,
  prix_unitaire_ht DECIMAL(10,2) NOT NULL,
  taux_tva         DECIMAL(5,2) NOT NULL,
  
  CONSTRAINT fk_lcmd_cmd
    FOREIGN KEY (id_commande) REFERENCES commandes(id_commande)
    ON DELETE CASCADE,
  CONSTRAINT fk_lcmd_prod
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit)
    ON DELETE RESTRICT,
  CONSTRAINT fk_lcmd_art
    FOREIGN KEY (id_artisan) REFERENCES artisans(id_artisan)
    ON DELETE RESTRICT,
    
  INDEX idx_commande (id_commande),
  INDEX idx_produit (id_produit),
  INDEX idx_artisan (id_artisan)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : paiements
-- Description : Paiements et transactions
-- ────────────────────────────────────────────────────────────
CREATE TABLE paiements (
  id_paiement       INT AUTO_INCREMENT PRIMARY KEY,
  id_commande       INT NOT NULL UNIQUE,
  methode           ENUM('carte', 'paypal', 'virement') NOT NULL,
  reference_externe VARCHAR(255),
  montant           DECIMAL(10,2) NOT NULL,
  statut            ENUM('en_attente', 'valide', 'refuse', 'rembourse') 
                    DEFAULT 'en_attente',
  date_paiement     DATETIME,
  
  CONSTRAINT fk_pay_cmd
    FOREIGN KEY (id_commande) REFERENCES commandes(id_commande)
    ON DELETE CASCADE,
    
  INDEX idx_commande (id_commande),
  INDEX idx_statut (statut)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : avis
-- Description : Avis et notes clients sur les produits
-- ────────────────────────────────────────────────────────────
CREATE TABLE avis (
  id_avis        INT AUTO_INCREMENT PRIMARY KEY,
  id_produit     INT NOT NULL,
  id_utilisateur INT NOT NULL,
  note           TINYINT NOT NULL CHECK (note BETWEEN 1 AND 5),
  commentaire    TEXT,
  date_avis      DATETIME DEFAULT CURRENT_TIMESTAMP,
  valide         BOOLEAN DEFAULT FALSE,
  
  CONSTRAINT fk_avis_prod
    FOREIGN KEY (id_produit) REFERENCES produits(id_produit)
    ON DELETE CASCADE,
  CONSTRAINT fk_avis_util
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id_utilisateur)
    ON DELETE CASCADE,
    
  INDEX idx_produit (id_produit),
  INDEX idx_utilisateur (id_utilisateur),
  INDEX idx_valide (valide)
) ENGINE=InnoDB;


-- ────────────────────────────────────────────────────────────
-- Table : statistiques_artisans
-- Description : Statistiques quotidiennes par artisan
-- ────────────────────────────────────────────────────────────
CREATE TABLE statistiques_artisans (
  id_stat       INT AUTO_INCREMENT PRIMARY KEY,
  id_artisan    INT NOT NULL,
  date          DATE NOT NULL,
  nb_visites    INT DEFAULT 0,
  nb_commandes  INT DEFAULT 0,
  ca_ht         DECIMAL(10,2) DEFAULT 0.00,
  panier_moyen  DECIMAL(10,2) DEFAULT 0.00,
  
  CONSTRAINT fk_stat_art
    FOREIGN KEY (id_artisan) REFERENCES artisans(id_artisan)
    ON DELETE CASCADE,
  
  UNIQUE KEY uk_stat_artisan_date (id_artisan, date),
  INDEX idx_date (date)
) ENGINE=InnoDB;


-- ============================================================
-- DONNÉES INITIALES
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- Rôles
-- ────────────────────────────────────────────────────────────
INSERT INTO roles (nom, description) VALUES
  ('anonyme',        'Accès public au catalogue sans connexion'),
  ('client',         'Achat de produits et suivi de commandes'),
  ('artisan',        'Gestion autonome de sa boutique en ligne'),
  ('administrateur', 'Gestion complète de la plateforme');


-- ────────────────────────────────────────────────────────────
-- Templates CSS
-- ────────────────────────────────────────────────────────────
INSERT INTO templates_css (nom, description, fichier_css, apercu) VALUES
  ('Nature',    'Tons chauds dorés, inspiration apicole et naturelle',  
   'nature.css',    'apercu_nature.png'),
  ('Elegance',  'Lignes épurées, tons crème et noir pour un style sobre',      
   'elegance.css',  'apercu_elegance.png'),
  ('Moderne',   'Design contemporain avec couleurs vives et dynamiques',     
   'moderne.css',   'apercu_moderne.png'),
  ('Rustique',  'Aspect artisanal traditionnel et chaleureux',          
   'rustique.css',  'apercu_rustique.png');


-- ────────────────────────────────────────────────────────────
-- Catégories de produits
-- ────────────────────────────────────────────────────────────
INSERT INTO categories (nom, description, ordre, actif) VALUES
  ('Miels',        'Miels monofloral, toutes fleurs et miels de terroir',           1, TRUE),
  ('Savons',       'Savons artisanaux saponifiés à froid, 100% naturels',           2, TRUE),
  ('Confiseries',  'Bonbons, nougats, caramels et douceurs à base de miel',        3, TRUE),
  ('Cosmétiques',  'Crèmes, baumes, soins du visage et du corps aux ingrédients naturels', 4, TRUE),
  ('Bougies',      'Bougies en cire d\'abeille pure, fabriquées artisanalement',    5, TRUE);


-- ============================================================
-- FIN DU SCRIPT
-- ============================================================

-- Vérification de la création des tables
SELECT 
  TABLE_NAME AS 'Table', 
  TABLE_ROWS AS 'Lignes',
  ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024, 2) AS 'Taille (Ko)'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = 'marketplace_artisanal'
ORDER BY TABLE_NAME;


