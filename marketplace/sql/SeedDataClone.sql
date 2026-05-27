-- Seed data script for a second database.
-- Prerequisite: run schema from sql/Script SQL.sql first.

CREATE DATABASE IF NOT EXISTS marketplace_seed_clone CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE marketplace_seed_clone;

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
