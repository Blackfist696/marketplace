-- =============================================================
-- Script SQL.sql
--
-- Role: schema principal de la base marketplace_artisanal.
-- Contenu: creation de la base puis creation des tables et contraintes.
-- Usage: a executer avant tout script de seed.
-- =============================================================

CREATE DATABASE marketplace_artisanal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marketplace_artisanal;

CREATE TABLE role(
   Id_role INT AUTO_INCREMENT,
   nom VARCHAR(50),
   description VARCHAR(50),
   PRIMARY KEY(Id_role)
);

CREATE TABLE utilisateur(
   Id_utilisateur INT AUTO_INCREMENT,
   email VARCHAR(150) NOT NULL,
   mot_de_passe VARCHAR(255),
   nom VARCHAR(100),
   prenom VARCHAR(100),
   telephone VARCHAR(20),
   date_inscription DATETIME,
   actif BOOLEAN,
   Id_role INT NOT NULL,
   PRIMARY KEY(Id_utilisateur),
   UNIQUE(email),
   FOREIGN KEY(Id_role) REFERENCES role(Id_role)
);

CREATE TABLE pays(
   Id_pays INT AUTO_INCREMENT,
   nom_pays VARCHAR(100),
   code_iso VARCHAR(2) NOT NULL,
   PRIMARY KEY(Id_pays),
   UNIQUE(code_iso)
);

CREATE TABLE ville(
   Id_ville INT AUTO_INCREMENT,
   nom_ville VARCHAR(100),
   code_postal VARCHAR(10),
   Id_pays INT NOT NULL,
   PRIMARY KEY(Id_ville),
   FOREIGN KEY(Id_pays) REFERENCES pays(Id_pays)
);

CREATE TABLE adresse(
   Id_adresse INT AUTO_INCREMENT,
   rue VARCHAR(255),
   complement VARCHAR(100),
   type_adresse VARCHAR(20),
   principale BOOLEAN,
   Id_ville INT NOT NULL,
   PRIMARY KEY(Id_adresse),
   FOREIGN KEY(Id_ville) REFERENCES ville(Id_ville)
);

CREATE TABLE artisan(
   Id_artisan INT AUTO_INCREMENT,
   nom_boutique VARCHAR(150),
   description VARCHAR(1000),
   numero_tva VARCHAR(20),
   iban VARCHAR(34),
   commission DECIMAL(5,2),
   valide BOOLEAN,
   date_validation DATETIME,
   logo VARCHAR(255),
   Id_utilisateur INT NOT NULL,
   PRIMARY KEY(Id_artisan),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE categorie(
   Id_categorie INT AUTO_INCREMENT,
   nom VARCHAR(100),
   description VARCHAR(1000),
   image VARCHAR(255),
   ordre INT,
   actif BOOLEAN,
   Id_categorie_1 INT,
   PRIMARY KEY(Id_categorie),
   FOREIGN KEY(Id_categorie_1) REFERENCES categorie(Id_categorie)
);

CREATE TABLE produit(
   Id_produit INT AUTO_INCREMENT,
   nom VARCHAR(200),
   description VARCHAR(1000),
   prix_ht DECIMAL(10,2) NOT NULL CHECK(prix_ht >= 0),
   taux_tva DECIMAL(5,2),
   stock INT NOT NULL CHECK(stock >= 0),
   poids DECIMAL(8,2),
   image_principale VARCHAR(255),
   actif BOOLEAN,
   mis_en_avant BOOLEAN,
   nb_vues INT,
   date_creation DATETIME,
   Id_artisan INT NOT NULL,
   PRIMARY KEY(Id_produit),
   FOREIGN KEY(Id_artisan) REFERENCES artisan(Id_artisan)
);

CREATE TABLE image_produit(
   Id_image_produit INT AUTO_INCREMENT,
   chemin VARCHAR(255),
   alt VARCHAR(200),
   ordre INT,
   Id_produit INT NOT NULL,
   PRIMARY KEY(Id_image_produit),
   FOREIGN KEY(Id_produit) REFERENCES produit(Id_produit)
);

CREATE TABLE commande(
   Id_commande INT AUTO_INCREMENT,
   reference VARCHAR(50) NOT NULL,
   statut VARCHAR(20) CHECK(statut IN ('en_attente','payee','expediee','livree','annulee')),
   total_ht DECIMAL(10,2),
   total_tva DECIMAL(10,2),
   frais_livraison DECIMAL(10,2),
   total_ttc DECIMAL(10,2),
   date_commande DATETIME,
   date_paiement DATETIME,
   Id_adresse INT NOT NULL,
   Id_utilisateur INT NOT NULL,
   PRIMARY KEY(Id_commande),
   UNIQUE(reference),
   FOREIGN KEY(Id_adresse) REFERENCES adresse(Id_adresse),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur)
);

CREATE TABLE ligne_commande(
   Id_ligne_commande INT AUTO_INCREMENT,
   quantite INT NOT NULL CHECK(quantite > 0),
   prix_unitaire_ht DECIMAL(10,2),
   taux_tva DECIMAL(5,2),
   Id_produit INT NOT NULL,
   Id_commande INT NOT NULL,
   PRIMARY KEY(Id_ligne_commande),
   FOREIGN KEY(Id_produit) REFERENCES produit(Id_produit),
   FOREIGN KEY(Id_commande) REFERENCES commande(Id_commande)
);

CREATE TABLE paiement(
   Id_paiement INT AUTO_INCREMENT,
   methode VARCHAR(20) NOT NULL CHECK (methode IN ('carte','virement','paypal')),
   reference_externe VARCHAR(255),
   montant DECIMAL(10,2),
   statut VARCHAR(20) CHECK(statut IN ('en_attente','valide','rembourse','echoue')),
   date_paiement DATETIME,
   Id_commande INT NOT NULL,
   PRIMARY KEY(Id_paiement),
   FOREIGN KEY(Id_commande) REFERENCES commande(Id_commande)
);

CREATE TABLE avis(
   Id_avis INT AUTO_INCREMENT,
   note INT NOT NULL CHECK(note BETWEEN 1 AND 5),
   commentaire VARCHAR(5000),
   date_avis DATETIME,
   valide BOOLEAN,
   Id_utilisateur INT NOT NULL,
   Id_produit INT NOT NULL,
   PRIMARY KEY(Id_avis),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur),
   FOREIGN KEY(Id_produit) REFERENCES produit(Id_produit)
);

CREATE TABLE statistique_artisan(
   Id_statistique INT AUTO_INCREMENT,
   id_utilisateur VARCHAR(50),
   date_consultation DATETIME NOT NULL,
   ip_adress VARCHAR(50) NOT NULL,
   id_produit VARCHAR(50) NOT NULL,
   Id_artisan INT NOT NULL,
   PRIMARY KEY(Id_statistique),
   FOREIGN KEY(Id_artisan) REFERENCES artisan(Id_artisan)
);

CREATE TABLE r_utilisateur_adresse(
   Id_utilisateur INT,
   Id_adresse INT,
   PRIMARY KEY(Id_utilisateur, Id_adresse),
   FOREIGN KEY(Id_utilisateur) REFERENCES utilisateur(Id_utilisateur),
   FOREIGN KEY(Id_adresse) REFERENCES adresse(Id_adresse)
);

CREATE TABLE classe(
   Id_categorie INT,
   Id_produit INT,
   PRIMARY KEY(Id_categorie, Id_produit),
   FOREIGN KEY(Id_categorie) REFERENCES categorie(Id_categorie),
   FOREIGN KEY(Id_produit) REFERENCES produit(Id_produit)
);

DELIMITER //
CREATE TRIGGER tr_artisan_date_validation
BEFORE UPDATE ON artisan
FOR EACH ROW
BEGIN
   IF NEW.valide = TRUE AND OLD.valide = FALSE THEN
      SET NEW.date_validation = NOW();
   END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER tr_decrement_stock
AFTER INSERT ON ligne_commande
FOR EACH ROW
BEGIN
   UPDATE produit 
   SET stock = stock - NEW.quantite
   WHERE Id_produit = NEW.Id_produit;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER tr_restore_stock
AFTER UPDATE ON commande
FOR EACH ROW
BEGIN
   IF NEW.statut = 'annulee' AND OLD.statut != 'annulee' THEN
      UPDATE produit p
      JOIN ligne_commande lc ON p.Id_produit = lc.Id_produit
      SET p.stock = p.stock + lc.quantite
      WHERE lc.Id_commande = NEW.Id_commande;
   END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER tr_check_stock
BEFORE INSERT ON ligne_commande
FOR EACH ROW
BEGIN
   DECLARE stock_dispo INT;
   SELECT stock INTO stock_dispo 
   FROM produit WHERE Id_produit = NEW.Id_produit;
   
   IF stock_dispo < NEW.quantite THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Stock insuffisant pour ce produit';
   END IF;
END //
DELIMITER ;


DELIMITER //
CREATE TRIGGER tr_check_adresse_utilisateur
BEFORE INSERT ON commande
FOR EACH ROW
BEGIN
   DECLARE has_link INT DEFAULT 0;
   SELECT COUNT(*) INTO has_link
   FROM r_utilisateur_adresse
   WHERE Id_adresse = NEW.Id_adresse
     AND Id_utilisateur = NEW.Id_utilisateur;

   IF has_link = 0 THEN
      SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Cette adresse n appartient pas a cet utilisateur';
   END IF;
END //
DELIMITER ;


-- SET GLOBAL event_scheduler = ON;
-- Avant le script
--
--
CREATE EVENT evt_stats_artisan_quotidien
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_TIMESTAMP + INTERVAL 1 DAY)
DO
   UPDATE statistique_artisan sa
   JOIN (
      SELECT p.Id_artisan,
             COUNT(DISTINCT lc.Id_commande) AS nb_cmd,
             SUM(lc.quantite * lc.prix_unitaire_ht) AS ca,
             AVG(lc.quantite * lc.prix_unitaire_ht) AS panier
      FROM ligne_commande lc
      JOIN produit p   ON lc.Id_produit  = p.Id_produit
      JOIN commande c  ON lc.Id_commande = c.Id_commande
      WHERE c.statut = 'payee'
      GROUP BY p.Id_artisan
   ) stats ON sa.Id_artisan = stats.Id_artisan
   SET sa.nb_commandes  = stats.nb_cmd,
       sa.ca_ht         = stats.ca,
       sa.panier_moyen  = stats.panier,
       sa.date_actuelle = CURDATE();

