CREATE DATABASE marketplace_artisanale;
USE marketplace_artisanale;

-- =====================================================
-- TABLE ROLES
-- =====================================================

CREATE TABLE roles (
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- =====================================================
-- TABLE UTILISATEURS
-- =====================================================

CREATE TABLE utilisateurs (
    id_utilisateur INT AUTO_INCREMENT PRIMARY KEY,
    id_role INT NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,

    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20),

    date_naissance DATE,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,

    actif BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_utilisateur_role
        FOREIGN KEY (id_role)
        REFERENCES roles(id_role)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE ADRESSES
-- =====================================================

CREATE TABLE adresses (
    id_adresse INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL,

    type_adresse ENUM('livraison', 'facturation') NOT NULL,

    rue VARCHAR(255) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    code_postal VARCHAR(10) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    pays VARCHAR(100) NOT NULL,

    principale BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_adresse_utilisateur
        FOREIGN KEY (id_utilisateur)
        REFERENCES utilisateurs(id_utilisateur)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE ARTISANS
-- =====================================================

CREATE TABLE artisans (
    id_artisan INT AUTO_INCREMENT PRIMARY KEY,
    id_utilisateur INT NOT NULL UNIQUE,

    nom_boutique VARCHAR(150) NOT NULL,
    description TEXT,

    logo VARCHAR(255),

    siret VARCHAR(14) UNIQUE,
    iban VARCHAR(34),

    commission DECIMAL(5,2) DEFAULT 0.00,

    valide BOOLEAN DEFAULT FALSE,
    date_validation DATETIME,

    CONSTRAINT fk_artisan_utilisateur
        FOREIGN KEY (id_utilisateur)
        REFERENCES utilisateurs(id_utilisateur)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE CATEGORIES
-- =====================================================

CREATE TABLE categories (
    id_categorie INT AUTO_INCREMENT PRIMARY KEY,

    nom VARCHAR(100) NOT NULL,
    description TEXT,

    image VARCHAR(255),

    parent_id INT NULL,

    ordre INT DEFAULT 0,
    actif BOOLEAN DEFAULT TRUE,

    CONSTRAINT fk_categorie_parent
        FOREIGN KEY (parent_id)
        REFERENCES categories(id_categorie)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE PRODUITS
-- =====================================================

CREATE TABLE produits (
    id_produit INT AUTO_INCREMENT PRIMARY KEY,

    id_artisan INT NOT NULL,
    id_categorie INT NOT NULL,

    nom VARCHAR(200) NOT NULL,
    description TEXT,

    prix_ht DECIMAL(10,2) NOT NULL,
    taux_tva DECIMAL(5,2) NOT NULL DEFAULT 21.00,

    stock INT NOT NULL DEFAULT 0,

    poids DECIMAL(8,2),

    image_principale VARCHAR(255),

    actif BOOLEAN DEFAULT TRUE,
    mis_en_avant BOOLEAN DEFAULT FALSE,

    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_produit_artisan
        FOREIGN KEY (id_artisan)
        REFERENCES artisans(id_artisan)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_produit_categorie
        FOREIGN KEY (id_categorie)
        REFERENCES categories(id_categorie)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE IMAGES_PRODUITS
-- =====================================================

CREATE TABLE images_produits (
    id_image INT AUTO_INCREMENT PRIMARY KEY,

    id_produit INT NOT NULL,

    chemin VARCHAR(255) NOT NULL,
    alt VARCHAR(200),

    ordre INT DEFAULT 0,

    CONSTRAINT fk_image_produit
        FOREIGN KEY (id_produit)
        REFERENCES produits(id_produit)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE COMMANDES
-- =====================================================

CREATE TABLE commandes (
    id_commande INT AUTO_INCREMENT PRIMARY KEY,

    reference VARCHAR(50) NOT NULL UNIQUE,

    id_utilisateur INT NOT NULL,

    id_adresse_livraison INT NOT NULL,
    id_adresse_facturation INT NOT NULL,

    statut ENUM(
        'en_attente',
        'payee',
        'expediee',
        'livree',
        'annulee'
    ) DEFAULT 'en_attente',

    total_ht DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_tva DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    frais_livraison DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    total_ttc DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_paiement DATETIME NULL,

    CONSTRAINT fk_commande_utilisateur
        FOREIGN KEY (id_utilisateur)
        REFERENCES utilisateurs(id_utilisateur)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_commande_adresse_livraison
        FOREIGN KEY (id_adresse_livraison)
        REFERENCES adresses(id_adresse)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_commande_adresse_facturation
        FOREIGN KEY (id_adresse_facturation)
        REFERENCES adresses(id_adresse)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE LIGNES_COMMANDE
-- =====================================================

CREATE TABLE lignes_commande (
    id_ligne INT AUTO_INCREMENT PRIMARY KEY,

    id_commande INT NOT NULL,
    id_produit INT NOT NULL,
    id_artisan INT NOT NULL,

    quantite INT NOT NULL,

    prix_unitaire_ht DECIMAL(10,2) NOT NULL,
    taux_tva DECIMAL(5,2) NOT NULL,

    CONSTRAINT fk_ligne_commande
        FOREIGN KEY (id_commande)
        REFERENCES commandes(id_commande)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_ligne_produit
        FOREIGN KEY (id_produit)
        REFERENCES produits(id_produit)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_ligne_artisan
        FOREIGN KEY (id_artisan)
        REFERENCES artisans(id_artisan)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE AVIS
-- =====================================================

CREATE TABLE avis (
    id_avis INT AUTO_INCREMENT PRIMARY KEY,

    id_produit INT NOT NULL,
    id_utilisateur INT NOT NULL,

    note TINYINT NOT NULL CHECK (note BETWEEN 1 AND 5),

    commentaire TEXT,

    date_avis DATETIME DEFAULT CURRENT_TIMESTAMP,

    valide BOOLEAN DEFAULT FALSE,

    CONSTRAINT fk_avis_produit
        FOREIGN KEY (id_produit)
        REFERENCES produits(id_produit)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_avis_utilisateur
        FOREIGN KEY (id_utilisateur)
        REFERENCES utilisateurs(id_utilisateur)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- TABLE PAIEMENTS
-- =====================================================

CREATE TABLE paiements (
    id_paiement INT AUTO_INCREMENT PRIMARY KEY,

    id_commande INT NOT NULL,

    methode ENUM(
        'carte',
        'paypal',
        'virement'
    ) NOT NULL,

    reference_externe VARCHAR(255),

    montant DECIMAL(10,2) NOT NULL,

    statut ENUM(
        'en_attente',
        'valide',
        'refuse',
        'rembourse'
    ) DEFAULT 'en_attente',

    date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_paiement_commande
        FOREIGN KEY (id_commande)
        REFERENCES commandes(id_commande)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =====================================================
-- INSERTION DES ROLES
-- =====================================================

INSERT INTO roles (nom, description) VALUES
('Anonyme', 'Consultation du catalogue'),
('Client', 'Achat et suivi des commandes'),
('Artisan', 'Gestion de boutique et produits'),
('Administrateur', 'Gestion complète de la plateforme');