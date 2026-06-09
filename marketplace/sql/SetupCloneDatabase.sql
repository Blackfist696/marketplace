-- =============================================================
-- SetupCloneDatabase.sql
--
-- Role: reinitialiser une base complete (drop/create + schema + seeds).
-- Attention: detruit puis recree marketplace_artisanal.
-- =============================================================

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
(2, 'artisan', 'Artisan de la plateforme'),
(3, 'client', 'Client standard');

INSERT INTO utilisateur (Id_utilisateur, email, mot_de_passe, nom, prenom, telephone, date_inscription, actif, Id_role) VALUES
(1, 'admin@example.com', '$2y$10$Ua1/Y3m0LBcj9l5wCvtkd.ZvXoliBrNihnAIIo8r7wO010SEvLDaW', 'Admin', 'Systeme', '0400 10 10 10', '2026-05-27 13:06:17', 1, 1),
(3, 'client1@example.com', '$2y$10$CNbENvqdb0qCfk1cMFji1eGP7UvSkYu07eByV3opA1mgFOnfVdmSa', 'Dupont', 'Alice', '0485 11 22 33', '2026-05-27 13:06:17', 1, 3),
(4, 'client2@example.com', '$2y$10$0JXEj.zg4MlY25P48S5AfOe05kfc0evWfGyjV8GRDZ097xWzoyN9e', 'Martin', 'Benoit', '0496 44 55 66', '2026-05-27 13:06:51', 1, 3),
(5, 'client3@example.com', '$2y$10$axCgGxELcoTuoP90PDuX8O82Q8eqRJodEaWAuLJp.YUJwOrJ7FlZq', 'Lefevre', 'Camille', '0477 77 88 99', '2026-05-27 13:06:51', 1, 3),
(6, 'client4@example.com', '$2y$10$jsApsgrSexbh5fenBNg6IuEkm/H7ypRA3dgsMO6k7b3Aru3RfV2ZC', 'Moreau', 'David', '0468 00 11 22', '2026-05-27 13:06:51', 1, 3),
(7, 'client5@example.com', '$2y$10$NRckz0I5TOG5JsHnQ607deP76rtuOdEESoQDfGIhbAigTGF8nQGDu', 'Bernard', 'Elodie', '0459 33 44 55', '2026-05-27 13:06:51', 1, 3),
(9, 'miels.artisan@example.com', '$2y$10$Ge0I/fSyEXXztG2gGmCNpuZOkgeJUyBi3hpZQlngd60AkoPCTj0BS', 'Lambert', 'Nora', '0470 10 20 30', '2026-05-29 19:42:00', 1, 2),
(10, 'savons.artisan@example.com', '$2y$10$UGi2cLbypXXBWFZ414RlbOSP.68hqf2Q5nNzDhO4aTmeKzgQ5VbUC', 'Bernier', 'Lea', '0470 11 21 31', '2026-05-29 19:42:00', 1, 2),
(11, 'confiseries.artisan@example.com', '$2y$10$6CjnS.KbqXj57.AHYErvoO9pYzXcUNuHFCBoMM6n.pkbD/JDKg/TS', 'Renaud', 'Mila', '0470 12 22 32', '2026-05-29 19:42:00', 1, 2),
(12, 'cosmetiques.artisan@example.com', '$2y$10$jmGAUlKaQssESLY81Huxm.mp39mdbfGX4uVqlKVHUHrpL9i9WSRQS', 'Carpentier', 'Ines', '0470 13 23 33', '2026-05-29 19:42:00', 1, 2),
(13, 'bougies.artisan@example.com', '$2y$10$m6d9djJ1VDZT.ygihr28nuIbbYBzb6rM7WyorPTTOx6NCuOcquT9e', 'Dumont', 'Hugo', '0470 14 24 34', '2026-05-29 19:42:00', 1, 2),
(14, 'pollen.artisan@example.com', '$2y$10$7H6zwnRD1MWqWbm6k9PB7e9rQ6K8OHD1XSZKnSWkCwTs5LJJmk4i.', 'Marchal', 'Yanis', '0470 15 25 35', '2026-05-29 19:42:00', 1, 2),
(15, 'propolis.artisan@example.com', '$2y$10$UZMlXKNCUKwQED9fkhukoO4Ht62vIRSTPVuAiSW8m8qJJerVSu6yK', 'Garnier', 'Sofia', '0470 16 26 36', '2026-05-29 19:42:00', 1, 2),
(16, 'coffrets.artisan@example.com', '$2y$10$cqF0A/mRWcYucmXX77WNwuaZbygDkPQJSE6eOcBAo1PWewTXDglGS', 'Petit', 'Clara', '0470 17 27 37', '2026-05-29 19:42:00', 1, 2);

INSERT INTO pays (Id_pays, nom_pays, code_iso) VALUES
(1, 'Belgique', 'BE'),
(2, 'France', 'FR');

INSERT INTO ville (Id_ville, nom_ville, code_postal, Id_pays) VALUES
(1, 'Bruxelles', 1000, 1),
(2, 'Lyon', 69000, 2);

INSERT INTO adresse (Id_adresse, rue, complement, type_adresse, principale, Id_ville) VALUES
(1, 'Rue du Client 3', NULL, 'livraison', 1, 1),
(2, 'Rue du Client 4', NULL, 'livraison', 1, 1),
(3, 'Rue du Client 5', NULL, 'livraison', 1, 1),
(4, 'Rue du Client 6', NULL, 'livraison', 1, 1),
(5, 'Rue du Client 7', NULL, 'livraison', 1, 1),
(6, 'Avenue Admin 1', NULL, 'facturation', 1, 1),
(7, 'Chemin des Abeilles 1', NULL, 'atelier', 1, 2),
(8, 'Rue des Herbiers 8', NULL, 'atelier', 1, 1),
(9, 'Place des Gourmands 3', NULL, 'atelier', 1, 2),
(10, 'Clos des Fleurs 12', NULL, 'atelier', 1, 1),
(11, 'Rue des Chandelles 5', NULL, 'atelier', 1, 2),
(12, 'Sentier des Ruches 14', NULL, 'atelier', 1, 1),
(13, 'Alee des Tilleuls 7', NULL, 'atelier', 1, 2),
(14, 'Quai des Artisans 19', NULL, 'atelier', 1, 1);

INSERT INTO r_utilisateur_adresse (Id_utilisateur, Id_adresse) VALUES
(1, 6),
(3, 1),
(4, 2),
(5, 3),
(6, 4),
(7, 5),
(9, 7),
(10, 8),
(11, 9),
(12, 10),
(13, 11),
(14, 12),
(15, 13),
(16, 14);

INSERT INTO artisan (Id_artisan, nom_boutique, description, numero_tva, iban, commission, valide, date_validation, logo, Id_utilisateur) VALUES
(3, 'Rucher des Collines', 'Production de miels de terroir et de saison.', 'BE0200000001', 'BE68000111112222', 12.50, 1, '2026-05-29 19:42:00', 'logos/rucher-collines.png', 9),
(4, 'Savonnerie du Verger', 'Savons doux enrichis en huiles vegetales et beurres naturels.', 'BE0200000002', 'BE68000111112223', 12.50, 1, '2026-05-29 19:42:00', 'logos/savonnerie-verger.png', 10),
(5, 'Maison des Douceurs', 'Confiseries artisanales preparees en petites series.', 'BE0200000003', 'BE68000111112224', 12.50, 1, '2026-05-29 19:42:00', 'logos/maison-douceurs.png', 11),
(6, 'Atelier Botanique', 'Cosmetiques solides et soins naturels issus de plantes locales.', 'BE0200000004', 'BE68000111112225', 12.50, 1, '2026-05-29 19:42:00', 'logos/atelier-botanique.png', 12),
(7, 'Flamme Atelier', 'Bougies coulees a la main avec cire vegetale et meches coton.', 'BE0200000005', 'BE68000111112226', 12.50, 1, '2026-05-29 19:42:00', 'logos/flamme-atelier.png', 13),
(8, 'Le Grain Dore', 'Produits de la ruche centres sur le pollen de fleurs.', 'BE0200000006', 'BE68000111112227', 12.50, 1, '2026-05-29 19:42:00', 'logos/grain-dore.png', 14),
(9, 'Essence de Propolis', 'Transformation artisanale de propolis brute et preparee.', 'BE0200000007', 'BE68000111112228', 12.50, 1, '2026-05-29 19:42:00', 'logos/essence-propolis.png', 15),
(10, 'La Ruche en Coffret', 'Assemblages cadeaux autour des produits de la ruche.', 'BE0200000008', 'BE68000111112229', 12.50, 1, '2026-05-29 19:42:00', 'logos/ruche-coffret.png', 16);

INSERT INTO categorie (Id_categorie, nom, description, image, ordre, actif, Id_categorie_1) VALUES
(3, 'Miels', 'Selection de miels artisanaux issus de ruchers locaux.', 'categories/miels.jpg', 1, 1, NULL),
(4, 'Savons', 'Savons saponifies a froid aux ingredients naturels.', 'categories/savons.jpg', 2, 1, NULL),
(5, 'Confiseries', 'Douceurs artisanales au miel et aux fruits.', 'categories/confiseries.jpg', 3, 1, NULL),
(6, 'Cosmetiques', 'Soins artisanaux pour le visage et le corps.', 'categories/cosmetiques.jpg', 4, 1, NULL),
(7, 'Bougies', 'Bougies artisanales en cire naturelle et parfums fins.', 'categories/bougies.jpg', 5, 1, NULL),
(8, 'Pollen', 'Pollen recolte, seche et conditionne artisanalement.', 'categories/pollen.jpg', 6, 1, NULL),
(9, 'Propolis', 'Extraits et soins a base de propolis artisanale.', 'categories/propolis.jpg', 7, 1, NULL),
(10, 'Coffrets', 'Coffrets cadeaux composant plusieurs creations artisanales.', 'categories/coffrets.jpg', 8, 1, NULL);

INSERT INTO produit (Id_produit, nom, description, prix_ht, taux_tva, stock, poids, image_principale, actif, mis_en_avant, nb_vues, date_creation, Id_artisan) VALUES
(6, 'Miel de fleurs sauvages', 'Miel doux recolte sur des prairies fleuries.', 8.90, 6.00, 39, 0.25, 'assets/products/miels/fleurs-sauvages.jpg', 1, 1, NULL, '2026-05-29 19:42:00', 3),
(7, 'Miel d acacia', 'Texture fluide et notes legeres pour les petits dejeuners.', 9.40, 6.00, 31, 0.25, 'assets/products/miels/acacia.jpg', 1, 0, NULL, '2026-05-28 19:42:00', 3),
(8, 'Miel de foret', 'Miel ambré aux aromes boises et soutenus.', 10.20, 6.00, 28, 0.25, 'assets/products/miels/foret.jpg', 1, 0, NULL, '2026-05-27 19:42:00', 3),
(9, 'Miel de chataignier', 'Saveur puissante et finale legerement amere.', 10.80, 6.00, 24, 0.25, 'assets/products/miels/chataignier.jpg', 1, 0, NULL, '2026-05-26 19:42:00', 3),
(10, 'Miel creme du rucher', 'Miel foisonne ideal pour les tartines.', 9.80, 6.00, 30, 0.25, 'assets/products/miels/creme.jpg', 1, 0, NULL, '2026-05-25 19:42:00', 3),
(11, 'Savon lavande apaisant', 'Savon parfume a la lavande avec mousse cremeuse.', 5.90, 6.00, 60, 0.10, 'assets/products/savons/lavande.jpg', 1, 1, NULL, '2026-05-28 19:42:00', 4),
(12, 'Savon miel et avoine', 'Nettoie en douceur et apaise les peaux sensibles.', 6.20, 6.00, 48, 0.10, 'assets/products/savons/miel-avoine.jpg', 1, 0, NULL, '2026-05-27 19:42:00', 4),
(13, 'Savon charbon purifiant', 'Formule minerale dediee aux peaux mixtes.', 6.50, 6.00, 45, 0.10, 'assets/products/savons/charbon.jpg', 1, 0, NULL, '2026-05-26 19:42:00', 4),
(14, 'Savon agrumes tonique', 'Notes fraiches d orange et de citron.', 5.80, 6.00, 52, 0.10, 'assets/products/savons/agrumes.jpg', 1, 0, NULL, '2026-05-25 19:42:00', 4),
(15, 'Savon lait d amande', 'Texture onctueuse et parfum legerement gourmand.', 6.40, 6.00, 40, 0.10, 'assets/products/savons/amande.jpg', 1, 0, NULL, '2026-05-24 19:42:00', 4),
(16, 'Pates de fruits framboise', 'Bonbons moelleux a la framboise et au miel.', 4.90, 6.00, 55, 0.12, 'assets/products/confiseries/pates-fruits.jpg', 1, 1, NULL, '2026-05-27 19:42:00', 5),
(17, 'Nougat tendre aux amandes', 'Nougat souple aux amandes grillees.', 7.10, 6.00, 35, 0.18, 'assets/products/confiseries/nougat.jpg', 1, 0, NULL, '2026-05-26 19:42:00', 5),
(18, 'Caramels beurre sale', 'Caramels fondants cuits au chaudron.', 5.40, 6.00, 50, 0.14, 'assets/products/confiseries/caramels.jpg', 1, 0, NULL, '2026-05-25 19:42:00', 5),
(19, 'Guimauves vanille miel', 'Guimauves legeres parfumees a la vanille.', 4.70, 6.00, 46, 0.11, 'assets/products/confiseries/guimauves.jpg', 1, 0, NULL, '2026-05-24 19:42:00', 5),
(20, 'Bonbons miel citron', 'Pastilles artisanales aux notes fraiches.', 3.90, 6.00, 70, 0.09, 'assets/products/confiseries/bonbons-miel-citron.jpg', 1, 0, NULL, '2026-05-23 19:42:00', 5),
(21, 'Baume a levres miel', 'Baume nourrissant enrichi en cire et miel.', 4.20, 6.00, 90, 0.02, 'assets/products/cosmetiques/baume-levres.jpg', 1, 1, NULL, '2026-05-26 19:42:00', 6),
(22, 'Creme mains propolis', 'Soin reparateur pour les mains seches.', 8.60, 6.00, 44, 0.08, 'assets/products/cosmetiques/creme-mains.jpg', 1, 0, NULL, '2026-05-25 19:42:00', 6),
(23, 'Huile visage calendula', 'Huile legere pour les peaux sensibles.', 11.40, 6.00, 30, 0.05, 'assets/products/cosmetiques/huile-visage.jpg', 1, 0, NULL, '2026-05-24 19:42:00', 6),
(24, 'Gommage sucre et miel', 'Exfoliant doux pour le corps.', 9.80, 6.00, 26, 0.16, 'assets/products/cosmetiques/gommage.jpg', 1, 0, NULL, '2026-05-23 19:42:00', 6),
(25, 'Masque argile blanche', 'Masque purifiant et apaisant pour le visage.', 7.90, 6.00, 34, 0.09, 'assets/products/cosmetiques/masque.jpg', 1, 0, NULL, '2026-05-22 19:42:00', 6),
(26, 'Bougie miel dore', 'Bougie chaleureuse a la cire d abeille.', 12.50, 6.00, 22, 0.30, 'assets/products/bougies/miel-dore.jpg', 1, 1, NULL, '2026-05-25 19:42:00', 7),
(27, 'Bougie fleur d oranger', 'Parfum floral et diffusion reguliere.', 13.20, 6.00, 20, 0.30, 'assets/products/bougies/fleur-oranger.jpg', 1, 0, NULL, '2026-05-24 19:42:00', 7),
(28, 'Bougie pain d epices', 'Notes gourmandes et epicees pour l hiver.', 13.80, 6.00, 18, 0.30, 'assets/products/bougies/pain-epices.jpg', 1, 0, NULL, '2026-05-23 19:42:00', 7),
(29, 'Bougie verveine', 'Ambiance fraiche et vegetale.', 11.90, 6.00, 25, 0.28, 'assets/products/bougies/verveine.jpg', 1, 0, NULL, '2026-05-22 19:42:00', 7),
(30, 'Bougie bois ambré', 'Sillage boise pour les interieurs cosy.', 14.10, 6.00, 16, 0.32, 'assets/products/bougies/bois-ambre.jpg', 1, 0, NULL, '2026-05-21 19:42:00', 7),
(31, 'Pollen multifleurs', 'Pollen sec aux notes florales variees.', 7.50, 6.00, 38, 0.12, 'assets/products/pollen/multifleurs.jpg', 1, 1, NULL, '2026-05-24 19:42:00', 8),
(32, 'Pollen frais congele', 'Pollen preserve a froid pour garder ses aromes.', 9.10, 6.00, 20, 0.15, 'assets/products/pollen/frais.jpg', 1, 0, NULL, '2026-05-23 19:42:00', 8),
(33, 'Pollen ciste', 'Origine mediterraneenne et texture croquante.', 8.80, 6.00, 24, 0.12, 'assets/products/pollen/ciste.jpg', 1, 0, NULL, '2026-05-22 19:42:00', 8),
(34, 'Pollen aubepine', 'Saveur douce et legumes secs en note finale.', 8.40, 6.00, 26, 0.12, 'assets/products/pollen/aubepine.jpg', 1, 0, NULL, '2026-05-21 19:42:00', 8),
(35, 'Pollen printemps', 'Melange saisonnier recolte au debut de saison.', 7.90, 6.00, 30, 0.12, 'assets/products/pollen/printemps.jpg', 1, 0, NULL, '2026-05-20 19:42:00', 8),
(36, 'Spray gorge propolis', 'Spray concentre au gout doux et menthe.', 8.30, 6.00, 42, 0.04, 'assets/products/propolis/spray-gorge.jpg', 1, 1, NULL, '2026-05-23 19:42:00', 9),
(37, 'Teinture mere propolis', 'Extrait liquide prepare en petite serie.', 10.90, 6.00, 28, 0.05, 'assets/products/propolis/teinture-mere.jpg', 1, 0, NULL, '2026-05-22 19:42:00', 9),
(38, 'Pastilles propolis miel', 'Pastilles fondantes pour une pause reconfortante.', 5.60, 6.00, 54, 0.07, 'assets/products/propolis/pastilles.jpg', 1, 0, NULL, '2026-05-21 19:42:00', 9),
(39, 'Baume propolis intense', 'Baume polyvalent a appliquer localement.', 7.40, 6.00, 36, 0.03, 'assets/products/propolis/baume.jpg', 1, 0, NULL, '2026-05-20 19:42:00', 9),
(40, 'Solution propolis brute', 'Preparation artisanale a forte teneur en propolis.', 11.70, 6.00, 20, 0.05, 'assets/products/propolis/solution-brute.jpg', 1, 0, NULL, '2026-05-19 19:42:00', 9),
(41, 'Coffret douceur du matin', 'Selection petit dejeuner avec miel et tisane.', 24.90, 6.00, 14, 1.20, 'assets/products/coffrets/douceur-matin.jpg', 1, 1, NULL, '2026-05-22 19:42:00', 10),
(42, 'Coffret bain relaxant', 'Savon, baume et bougie pour une pause detente.', 29.50, 6.00, 12, 1.35, 'assets/products/coffrets/bain-relaxant.jpg', 1, 0, NULL, '2026-05-21 19:42:00', 10),
(43, 'Coffret gourmand au miel', 'Miels et confiseries artisanales en coffret cadeau.', 27.80, 6.00, 16, 1.40, 'assets/products/coffrets/gourmand.jpg', 1, 0, NULL, '2026-05-20 19:42:00', 10),
(44, 'Coffret bien etre propolis', 'Routine bien etre avec propolis, pollen et infusion.', 31.20, 6.00, 10, 1.10, 'assets/products/coffrets/bien-etre.jpg', 1, 0, NULL, '2026-05-19 19:42:00', 10),
(45, 'Coffret maison parfumee', 'Bougie, spray et douceurs pour offrir.', 33.40, 6.00, 8, 1.50, 'assets/products/coffrets/maison-parfumee.jpg', 1, 0, NULL, '2026-05-18 19:42:00', 10);

INSERT INTO image_produit (Id_image_produit, chemin, alt, ordre, Id_produit) VALUES
(1, 'assets/products/miels/fleurs-sauvages.jpg', 'Miel de fleurs sauvages - vue principale', 1, 6),
(2, 'assets/products/miels/fleurs-sauvages-detail.jpg', 'Miel de fleurs sauvages - detail', 2, 6),
(3, 'assets/products/miels/acacia.jpg', 'Miel d acacia - vue principale', 1, 7),
(4, 'assets/products/miels/acacia-detail.jpg', 'Miel d acacia - detail', 2, 7),
(5, 'assets/products/miels/foret.jpg', 'Miel de foret - vue principale', 1, 8),
(6, 'assets/products/miels/foret-detail.jpg', 'Miel de foret - detail', 2, 8),
(7, 'assets/products/miels/chataignier.jpg', 'Miel de chataignier - vue principale', 1, 9),
(8, 'assets/products/miels/chataignier-detail.jpg', 'Miel de chataignier - detail', 2, 9),
(9, 'assets/products/miels/creme.jpg', 'Miel creme du rucher - vue principale', 1, 10),
(10, 'assets/products/miels/creme-detail.jpg', 'Miel creme du rucher - detail', 2, 10),
(11, 'assets/products/savons/lavande.jpg', 'Savon lavande apaisant - vue principale', 1, 11),
(12, 'assets/products/savons/lavande-detail.jpg', 'Savon lavande apaisant - detail', 2, 11),
(13, 'assets/products/savons/miel-avoine.jpg', 'Savon miel et avoine - vue principale', 1, 12),
(14, 'assets/products/savons/miel-avoine-detail.jpg', 'Savon miel et avoine - detail', 2, 12),
(15, 'assets/products/savons/charbon.jpg', 'Savon charbon purifiant - vue principale', 1, 13),
(16, 'assets/products/savons/charbon-detail.jpg', 'Savon charbon purifiant - detail', 2, 13),
(17, 'assets/products/savons/agrumes.jpg', 'Savon agrumes tonique - vue principale', 1, 14),
(18, 'assets/products/savons/agrumes-detail.jpg', 'Savon agrumes tonique - detail', 2, 14),
(19, 'assets/products/savons/amande.jpg', 'Savon lait d amande - vue principale', 1, 15),
(20, 'assets/products/savons/amande-detail.jpg', 'Savon lait d amande - detail', 2, 15),
(21, 'assets/products/confiseries/pates-fruits.jpg', 'Pates de fruits framboise - vue principale', 1, 16),
(22, 'assets/products/confiseries/pates-fruits-detail.jpg', 'Pates de fruits framboise - detail', 2, 16),
(23, 'assets/products/confiseries/nougat.jpg', 'Nougat tendre aux amandes - vue principale', 1, 17),
(24, 'assets/products/confiseries/nougat-detail.jpg', 'Nougat tendre aux amandes - detail', 2, 17),
(25, 'assets/products/confiseries/caramels.jpg', 'Caramels beurre sale - vue principale', 1, 18),
(26, 'assets/products/confiseries/caramels-detail.jpg', 'Caramels beurre sale - detail', 2, 18),
(27, 'assets/products/confiseries/guimauves.jpg', 'Guimauves vanille miel - vue principale', 1, 19),
(28, 'assets/products/confiseries/guimauves-detail.jpg', 'Guimauves vanille miel - detail', 2, 19),
(29, 'assets/products/confiseries/bonbons-miel-citron.jpg', 'Bonbons miel citron - vue principale', 1, 20),
(30, 'assets/products/confiseries/bonbons-miel-citron-detail.jpg', 'Bonbons miel citron - detail', 2, 20),
(31, 'assets/products/cosmetiques/baume-levres.jpg', 'Baume a levres miel - vue principale', 1, 21),
(32, 'assets/products/cosmetiques/baume-levres-detail.jpg', 'Baume a levres miel - detail', 2, 21),
(33, 'assets/products/cosmetiques/creme-mains.jpg', 'Creme mains propolis - vue principale', 1, 22),
(34, 'assets/products/cosmetiques/creme-mains-detail.jpg', 'Creme mains propolis - detail', 2, 22),
(35, 'assets/products/cosmetiques/huile-visage.jpg', 'Huile visage calendula - vue principale', 1, 23),
(36, 'assets/products/cosmetiques/huile-visage-detail.jpg', 'Huile visage calendula - detail', 2, 23),
(37, 'assets/products/cosmetiques/gommage.jpg', 'Gommage sucre et miel - vue principale', 1, 24),
(38, 'assets/products/cosmetiques/gommage-detail.jpg', 'Gommage sucre et miel - detail', 2, 24),
(39, 'assets/products/cosmetiques/masque.jpg', 'Masque argile blanche - vue principale', 1, 25),
(40, 'assets/products/cosmetiques/masque-detail.jpg', 'Masque argile blanche - detail', 2, 25),
(41, 'assets/products/bougies/miel-dore.jpg', 'Bougie miel dore - vue principale', 1, 26),
(42, 'assets/products/bougies/miel-dore-detail.jpg', 'Bougie miel dore - detail', 2, 26),
(43, 'assets/products/bougies/fleur-oranger.jpg', 'Bougie fleur d oranger - vue principale', 1, 27),
(44, 'assets/products/bougies/fleur-oranger-detail.jpg', 'Bougie fleur d oranger - detail', 2, 27),
(45, 'assets/products/bougies/pain-epices.jpg', 'Bougie pain d epices - vue principale', 1, 28),
(46, 'assets/products/bougies/pain-epices-detail.jpg', 'Bougie pain d epices - detail', 2, 28),
(47, 'assets/products/bougies/verveine.jpg', 'Bougie verveine - vue principale', 1, 29),
(48, 'assets/products/bougies/verveine-detail.jpg', 'Bougie verveine - detail', 2, 29),
(49, 'assets/products/bougies/bois-ambre.jpg', 'Bougie bois ambré - vue principale', 1, 30),
(50, 'assets/products/bougies/bois-ambre-detail.jpg', 'Bougie bois ambré - detail', 2, 30),
(51, 'assets/products/pollen/multifleurs.jpg', 'Pollen multifleurs - vue principale', 1, 31),
(52, 'assets/products/pollen/multifleurs-detail.jpg', 'Pollen multifleurs - detail', 2, 31),
(53, 'assets/products/pollen/frais.jpg', 'Pollen frais congele - vue principale', 1, 32),
(54, 'assets/products/pollen/frais-detail.jpg', 'Pollen frais congele - detail', 2, 32),
(55, 'assets/products/pollen/ciste.jpg', 'Pollen ciste - vue principale', 1, 33),
(56, 'assets/products/pollen/ciste-detail.jpg', 'Pollen ciste - detail', 2, 33),
(57, 'assets/products/pollen/aubepine.jpg', 'Pollen aubepine - vue principale', 1, 34),
(58, 'assets/products/pollen/aubepine-detail.jpg', 'Pollen aubepine - detail', 2, 34),
(59, 'assets/products/pollen/printemps.jpg', 'Pollen printemps - vue principale', 1, 35),
(60, 'assets/products/pollen/printemps-detail.jpg', 'Pollen printemps - detail', 2, 35),
(61, 'assets/products/propolis/spray-gorge.jpg', 'Spray gorge propolis - vue principale', 1, 36),
(62, 'assets/products/propolis/spray-gorge-detail.jpg', 'Spray gorge propolis - detail', 2, 36),
(63, 'assets/products/propolis/teinture-mere.jpg', 'Teinture mere propolis - vue principale', 1, 37),
(64, 'assets/products/propolis/teinture-mere-detail.jpg', 'Teinture mere propolis - detail', 2, 37),
(65, 'assets/products/propolis/pastilles.jpg', 'Pastilles propolis miel - vue principale', 1, 38),
(66, 'assets/products/propolis/pastilles-detail.jpg', 'Pastilles propolis miel - detail', 2, 38),
(67, 'assets/products/propolis/baume.jpg', 'Baume propolis intense - vue principale', 1, 39),
(68, 'assets/products/propolis/baume-detail.jpg', 'Baume propolis intense - detail', 2, 39),
(69, 'assets/products/propolis/solution-brute.jpg', 'Solution propolis brute - vue principale', 1, 40),
(70, 'assets/products/propolis/solution-brute-detail.jpg', 'Solution propolis brute - detail', 2, 40),
(71, 'assets/products/coffrets/douceur-matin.jpg', 'Coffret douceur du matin - vue principale', 1, 41),
(72, 'assets/products/coffrets/douceur-matin-detail.jpg', 'Coffret douceur du matin - detail', 2, 41),
(73, 'assets/products/coffrets/bain-relaxant.jpg', 'Coffret bain relaxant - vue principale', 1, 42),
(74, 'assets/products/coffrets/bain-relaxant-detail.jpg', 'Coffret bain relaxant - detail', 2, 42),
(75, 'assets/products/coffrets/gourmand.jpg', 'Coffret gourmand au miel - vue principale', 1, 43),
(76, 'assets/products/coffrets/gourmand-detail.jpg', 'Coffret gourmand au miel - detail', 2, 43),
(77, 'assets/products/coffrets/bien-etre.jpg', 'Coffret bien etre propolis - vue principale', 1, 44),
(78, 'assets/products/coffrets/bien-etre-detail.jpg', 'Coffret bien etre propolis - detail', 2, 44),
(79, 'assets/products/coffrets/maison-parfumee.jpg', 'Coffret maison parfumee - vue principale', 1, 45),
(80, 'assets/products/coffrets/maison-parfumee-detail.jpg', 'Coffret maison parfumee - detail', 2, 45);

INSERT INTO classe (Id_categorie, Id_produit) VALUES
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(3, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(4, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(6, 21),
(6, 22),
(6, 23),
(6, 24),
(6, 25),
(7, 26),
(7, 27),
(7, 28),
(7, 29),
(7, 30),
(8, 31),
(8, 32),
(8, 33),
(8, 34),
(8, 35),
(9, 36),
(9, 37),
(9, 38),
(9, 39),
(9, 40),
(10, 41),
(10, 42),
(10, 43),
(10, 44),
(10, 45);

INSERT INTO commande (Id_commande, reference, statut, total_ht, total_tva, frais_livraison, total_ttc, date_commande, date_paiement, Id_adresse, Id_utilisateur) VALUES
(1, 'CMD-SEED-0001', 'payee', 18.30, 1.10, 5.00, 24.40, '2026-05-28 17:55:40', '2026-05-28 18:25:40', 1, 3);

INSERT INTO ligne_commande (Id_ligne_commande, quantite, prix_unitaire_ht, taux_tva, Id_produit, Id_commande) VALUES
(1, 1, 8.90, 6.00, 6, 1),
(2, 1, 9.40, 6.00, 7, 1);

INSERT INTO paiement (Id_paiement, methode, reference_externe, montant, statut, date_paiement, Id_commande) VALUES
(1, 'carte', 'TX-SEED-0001', 24.40, 'valide', '2026-05-28 18:25:40', 1);

INSERT INTO avis (Id_avis, note, commentaire, date_avis, valide, Id_utilisateur, Id_produit) VALUES
(1, 5, 'Produit de tres bonne qualite', '2026-05-29 17:55:40', 1, 3, 6);

INSERT INTO statistique_artisan (Id_statistique, id_utilisateur, date_consultation, ip_adress, id_produit, Id_artisan) VALUES
(3, 3, '2026-05-29 19:42:00', '127.0.0.1', 6, 3);



