-- =============================================================
-- MigrateLegacyCatalog.sql
--
-- Role: migrer les anciennes donnees (legacy) vers le nouveau catalogue.
-- Prerequis: catalogue specialise deja peuple.
-- =============================================================

START TRANSACTION;

UPDATE role
SET nom = 'artisan', description = 'Artisan de la plateforme'
WHERE Id_role = 2;

DROP TEMPORARY TABLE IF EXISTS tmp_legacy_product_mapping;
CREATE TEMPORARY TABLE tmp_legacy_product_mapping (
    legacy_name VARCHAR(200) NOT NULL,
    target_name VARCHAR(200) NOT NULL
);

INSERT INTO tmp_legacy_product_mapping (legacy_name, target_name) VALUES
('Collier en perles', 'Miel de fleurs sauvages'),
('Bracelet cuir', 'Miel d acacia'),
('Boucles d’oreilles dorées', 'Miel de foret'),
('Boucles doreilles dorees', 'Miel de foret'),
('Bague en argent', 'Miel de chataignier'),
('Pendentif gravé', 'Miel creme du rucher'),
('Pendentif grave', 'Miel creme du rucher');

UPDATE ligne_commande lc
INNER JOIN produit legacy ON legacy.Id_produit = lc.Id_produit
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom
INNER JOIN produit target ON target.nom = map_legacy.target_name
SET lc.Id_produit = target.Id_produit
WHERE legacy.nom <> target.nom;

UPDATE avis av
INNER JOIN produit legacy ON legacy.Id_produit = av.Id_produit
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom
INNER JOIN produit target ON target.nom = map_legacy.target_name
SET av.Id_produit = target.Id_produit
WHERE legacy.nom <> target.nom;

DELETE sa
FROM statistique_artisan sa
INNER JOIN produit legacy ON legacy.Id_produit = CAST(sa.id_produit AS UNSIGNED)
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom
INNER JOIN produit target ON target.nom = map_legacy.target_name
INNER JOIN statistique_artisan sa_target ON sa_target.Id_artisan = target.Id_artisan
WHERE sa.Id_artisan <> target.Id_artisan;

UPDATE statistique_artisan sa
INNER JOIN produit legacy ON legacy.Id_produit = CAST(sa.id_produit AS UNSIGNED)
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom
INNER JOIN produit target ON target.nom = map_legacy.target_name
SET sa.id_produit = CAST(target.Id_produit AS CHAR),
    sa.Id_artisan = target.Id_artisan
WHERE legacy.nom <> target.nom;

DELETE ip
FROM image_produit ip
INNER JOIN produit legacy ON legacy.Id_produit = ip.Id_produit
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom;

DELETE cl
FROM classe cl
INNER JOIN produit legacy ON legacy.Id_produit = cl.Id_produit
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = legacy.nom;

DELETE p
FROM produit p
INNER JOIN tmp_legacy_product_mapping map_legacy ON map_legacy.legacy_name = p.nom;

DELETE lc_dup
FROM ligne_commande lc_dup
INNER JOIN ligne_commande lc_keep
  ON lc_keep.Id_commande = lc_dup.Id_commande
   AND lc_keep.Id_produit = lc_dup.Id_produit
   AND lc_keep.Id_ligne_commande < lc_dup.Id_ligne_commande;

UPDATE ligne_commande lc
INNER JOIN produit p ON p.Id_produit = lc.Id_produit
SET lc.prix_unitaire_ht = p.prix_ht,
  lc.taux_tva = p.taux_tva;

UPDATE commande c
INNER JOIN (
  SELECT Id_commande,
       ROUND(SUM(quantite * prix_unitaire_ht), 2) AS total_ht,
       ROUND(SUM(quantite * prix_unitaire_ht * (taux_tva / 100)), 2) AS total_tva
  FROM ligne_commande
  GROUP BY Id_commande
) totals ON totals.Id_commande = c.Id_commande
SET c.total_ht = totals.total_ht,
  c.total_tva = totals.total_tva,
  c.frais_livraison = COALESCE(c.frais_livraison, 5.00),
  c.total_ttc = ROUND(totals.total_ht + totals.total_tva + COALESCE(c.frais_livraison, 5.00), 2);

UPDATE paiement p
INNER JOIN commande c ON c.Id_commande = p.Id_commande
SET p.montant = c.total_ttc;

DELETE av_dup
FROM avis av_dup
INNER JOIN avis av_keep
  ON av_keep.Id_utilisateur = av_dup.Id_utilisateur
   AND av_keep.Id_produit = av_dup.Id_produit
   AND av_keep.Id_avis < av_dup.Id_avis;

DELETE c
FROM categorie c
WHERE c.nom IN ('Bijoux', 'Decoration')
  AND NOT EXISTS (
      SELECT 1
      FROM classe cl
      WHERE cl.Id_categorie = c.Id_categorie
  );

DELETE rua
FROM r_utilisateur_adresse rua
INNER JOIN utilisateur u ON u.Id_utilisateur = rua.Id_utilisateur
WHERE u.email = 'vendeur@example.com';

DELETE ad
FROM adresse ad
WHERE ad.rue = 'Rue du Vendeur 2'
  AND NOT EXISTS (
      SELECT 1
      FROM r_utilisateur_adresse rua
      WHERE rua.Id_adresse = ad.Id_adresse
  );

DELETE a
FROM artisan a
INNER JOIN utilisateur u ON u.Id_utilisateur = a.Id_utilisateur
WHERE u.email = 'vendeur@example.com'
  AND NOT EXISTS (
      SELECT 1
      FROM produit p
      WHERE p.Id_artisan = a.Id_artisan
  )
  AND NOT EXISTS (
      SELECT 1
      FROM statistique_artisan sa
      WHERE sa.Id_artisan = a.Id_artisan
  );

DELETE u
FROM utilisateur u
WHERE u.email = 'vendeur@example.com'
  AND NOT EXISTS (
      SELECT 1
      FROM artisan a
      WHERE a.Id_utilisateur = u.Id_utilisateur
  )
  AND NOT EXISTS (
      SELECT 1
      FROM r_utilisateur_adresse rua
      WHERE rua.Id_utilisateur = u.Id_utilisateur
  );

    DELETE a
    FROM artisan a
    INNER JOIN utilisateur u ON u.Id_utilisateur = a.Id_utilisateur
    WHERE u.email = 'artisan@example.com'
      AND NOT EXISTS (
        SELECT 1
        FROM produit p
        WHERE p.Id_artisan = a.Id_artisan
      )
      AND NOT EXISTS (
        SELECT 1
        FROM statistique_artisan sa
        WHERE sa.Id_artisan = a.Id_artisan
      );

    DELETE u
    FROM utilisateur u
    WHERE u.email = 'artisan@example.com'
      AND NOT EXISTS (
        SELECT 1
        FROM artisan a
        WHERE a.Id_utilisateur = u.Id_utilisateur
      )
      AND NOT EXISTS (
        SELECT 1
        FROM r_utilisateur_adresse rua
        WHERE rua.Id_utilisateur = u.Id_utilisateur
      );

DROP TEMPORARY TABLE IF EXISTS tmp_legacy_product_mapping;

COMMIT;