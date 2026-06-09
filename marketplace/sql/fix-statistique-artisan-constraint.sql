-- Fix SQL pour la table statistique_artisan en production.
-- Cette procédure supprime la contrainte UNIQUE erronée sur Id_artisan
-- puis recrée la contrainte de clé étrangère proprement.

-- 1) Obtenez le nom réel de la contrainte FK :
--    SHOW CREATE TABLE statistique_artisan\G
--    Recherchez la ligne contenant FOREIGN KEY (`Id_artisan`).

-- 2) Remplacez <fk_name> par ce nom dans l'instruction ci-dessous :
--    ALTER TABLE statistique_artisan DROP FOREIGN KEY <fk_name>;

-- 3) Exécutez ensuite les commandes suivantes :
ALTER TABLE statistique_artisan DROP INDEX Id_artisan;
ALTER TABLE statistique_artisan ADD INDEX idx_statistique_artisan_id_artisan (Id_artisan);
ALTER TABLE statistique_artisan
  ADD CONSTRAINT fk_statistique_artisan_artisan
  FOREIGN KEY (Id_artisan) REFERENCES artisan(Id_artisan);

-- Exemple concret si le nom de la contrainte est statistique_artisan_ibfk_1 :
-- ALTER TABLE statistique_artisan DROP FOREIGN KEY statistique_artisan_ibfk_1;
-- ALTER TABLE statistique_artisan DROP INDEX Id_artisan;
-- ALTER TABLE statistique_artisan ADD INDEX idx_statistique_artisan_id_artisan (Id_artisan);
-- ALTER TABLE statistique_artisan
--   ADD CONSTRAINT fk_statistique_artisan_artisan
--   FOREIGN KEY (Id_artisan) REFERENCES artisan(Id_artisan);
