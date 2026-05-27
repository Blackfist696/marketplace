-- Full clone setup script (database + schema + seed)
-- WARNING: this script drops and recreates marketplace_artisanal.

DROP DATABASE IF EXISTS marketplace_artisanal;
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
   UNIQUE(Id_artisan),
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



-- Seed data script.
-- Prerequisite: run schema from sql/Script SQL.sql first
-- in the CURRENTLY SELECTED database.
--
-- Example workflow:
-- 1) Create/select your target database in MariaDB.
-- 2) Import sql/Script SQL.sql into that database.
-- 3) Run this seed file in the same selected database.

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM paiement;
DELETE FROM avis;
DELETE FROM ligne_commande;
DELETE FROM commande;
DELETE FROM classe;
DELETE FROM image_produit;
DELETE FROM produit;
DELETE FROM artisan;
DELETE FROM r_utilisateur_adresse;
DELETE FROM adresse;
DELETE FROM ville;
DELETE FROM pays;
DELETE FROM categorie;
DELETE FROM utilisateur;
DELETE FROM role;
DELETE FROM statistique_artisan;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO role (Id_role, nom, description) VALUES
(1, 'administrateur', 'Administrateur de la plateforme'),
(2, 'vendeur', 'Vendeur artisan'),
(3, 'client', 'Client standard');

INSERT INTO utilisateur (Id_utilisateur, email, mot_de_passe, nom, prenom, telephone, date_inscription, actif, Id_role) VALUES
(1, 'admin@example.com', '$2y$10$LrKCS1k61f7oW2JCEi0a8.4f6q5fhnf2mQ0fLeA6prxDl04hC2WMe', 'Admin', 'Systeme', '0400 10 10 10', NOW(), 1, 1),
(2, 'vendeur@example.com', '$2y$10$fWBwXh4EAbfPn/Jf2dhrfuzA3z7nS2dQI0Q2PS8Q2rQ0izYQ4wbkW', 'Vendeur', 'Demo', '0400 20 20 20', NOW(), 1, 2),
(3, 'client1@example.com', '$2y$10$4d3CGf66rJEa.UTBfdlB9uEi53r7Y8WQbn8hA0w8Uz6ScuvtR4qYu', 'Dupont', 'Alice', '0485 11 22 33', NOW(), 1, 3),
(4, 'client2@example.com', '$2y$10$Y7qWvYO6fvp0x5n0gIxzR.v7Qf16dSzxI/5hNLMiiCWb6v2xqAVpS', 'Martin', 'Benoit', '0496 44 55 66', NOW(), 1, 3),
(5, 'client3@example.com', '$2y$10$N5az5a3bG5kvWmA0QVziAOS7D8yb3xS8hM8WJf5sy2jJxjI4L/6Ta', 'Lefevre', 'Camille', '0477 77 88 99', NOW(), 1, 3);

INSERT INTO pays (Id_pays, nom_pays, code_iso) VALUES
(1, 'Belgique', 'BE'),
(2, 'France', 'FR');

INSERT INTO ville (Id_ville, nom_ville, code_postal, Id_pays) VALUES
(1, 'Bruxelles', '1000', 1),
(2, 'Lyon', '69000', 2);

INSERT INTO adresse (Id_adresse, rue, complement, type_adresse, principale, Id_ville) VALUES
(1, 'Avenue Admin 1', NULL, 'facturation', 1, 1),
(2, 'Rue du Vendeur 2', NULL, 'livraison', 1, 1),
(3, 'Rue du Client 3', NULL, 'livraison', 1, 1),
(4, 'Rue du Client 4', NULL, 'livraison', 1, 1),
(5, 'Rue du Client 5', NULL, 'livraison', 1, 2);

INSERT INTO r_utilisateur_adresse (Id_utilisateur, Id_adresse) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

INSERT INTO artisan (Id_artisan, nom_boutique, description, numero_tva, iban, commission, valide, date_validation, logo, Id_utilisateur) VALUES
(1, 'Atelier du Marche', 'Boutique artisanale de bijoux faits main.', 'BE0123456789', 'BE68539007547034', 12.50, 1, NOW(), 'atelier-logo.png', 2);

INSERT INTO categorie (Id_categorie, nom, description, image, ordre, actif, Id_categorie_1) VALUES
(1, 'Bijoux', 'Bijoux et accessoires artisanaux', 'bijoux.jpg', 1, 1, NULL),
(2, 'Decoration', 'Objets decoratifs artisanaux', 'deco.jpg', 2, 1, NULL);

INSERT INTO produit (Id_produit, nom, description, prix_ht, taux_tva, stock, poids, image_principale, actif, mis_en_avant, nb_vues, date_creation, Id_artisan) VALUES
(1, 'Collier en perles', 'Collier artisanal en perles naturelles.', 45.00, 6.00, 12, 0.15, 'collier.jpg', 1, 1, 0, NOW(), 1),
(2, 'Bracelet cuir', 'Bracelet en cuir veritable et fermoir acier.', 35.00, 6.00, 20, 0.08, 'bracelet.jpg', 1, 0, 0, NOW(), 1),
(3, 'Boucles doreilles dorees', 'Boucles doreilles fines et elegantes.', 28.00, 6.00, 25, 0.04, 'boucles.jpg', 1, 0, 0, NOW(), 1),
(4, 'Bague en argent', 'Bague artisanale en argent 925.', 55.00, 6.00, 10, 0.06, 'bague.jpg', 1, 0, 0, NOW(), 1),
(5, 'Pendentif grave', 'Pendentif personnalise en acier inoxydable.', 32.00, 6.00, 18, 0.05, 'pendentif.jpg', 1, 0, 0, NOW(), 1);

INSERT INTO classe (Id_categorie, Id_produit) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(2, 1);

INSERT INTO commande (Id_commande, reference, statut, total_ht, total_tva, frais_livraison, total_ttc, date_commande, date_paiement, Id_adresse, Id_utilisateur) VALUES
(1, 'CMD-SEED-0001', 'payee', 80.00, 4.80, 5.00, 89.80, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 23 HOUR), 3, 3);

INSERT INTO ligne_commande (Id_ligne_commande, quantite, prix_unitaire_ht, taux_tva, Id_produit, Id_commande) VALUES
(1, 1, 45.00, 6.00, 1, 1),
(2, 1, 35.00, 6.00, 2, 1);

INSERT INTO paiement (Id_paiement, methode, reference_externe, montant, statut, date_paiement, Id_commande) VALUES
(1, 'carte', 'TX-SEED-0001', 89.80, 'valide', DATE_SUB(NOW(), INTERVAL 23 HOUR), 1);

INSERT INTO avis (Id_avis, note, commentaire, date_avis, valide, Id_utilisateur, Id_produit) VALUES
(1, 5, 'Produit de tres bonne qualite', NOW(), 1, 3, 1);

INSERT INTO statistique_artisan (Id_statistique, id_utilisateur, date_consultation, ip_adress, id_produit, Id_artisan) VALUES
(1, '3', NOW(), '127.0.0.1', '1', 1);


