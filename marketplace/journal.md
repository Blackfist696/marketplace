# Journal de travail

## Check-list de reprise (5 minutes)

- [x] Ouvrir le projet et verifier l etat Git: `git status --short`
- [x] Corriger le trigger SQL `tr_check_adresse_utilisateur` dans `sql/Script SQL.sql`
- [x] Rejouer le schema SQL sur la base locale
- [x] Relancer le seed PHP: `php app/seed.php`
- [x] Verifier rapidement les endpoints:
  - `GET /api/lignes-commandes`
  - `GET /api/statistiques-artisans`
  - `GET /api/pays`
- [x] Mettre a jour ce journal avec les nouveaux resultats

## 2026-05-27 (suite reprise)

### Reprise effectuee
1. Trigger SQL corrige dans `sql/Script SQL.sql`
- `tr_check_adresse_utilisateur` ne lit plus `adresse.Id_utilisateur`.
- Verification basee sur `r_utilisateur_adresse (Id_utilisateur, Id_adresse)`.

2. Application en base locale
- Le client `mysql` n etait pas disponible dans le terminal.
- Correction appliquee directement en base via `php` + `mysqli` (drop/create trigger).

3. Seed relance
- Commande: `php app/seed.php`
- Resultat: `Seed complete...` sans warning `Unknown column Id_utilisateur`.

4. Correctif applicatif detecte pendant verification API
- Erreur fatale constatee: `Call to a member function run() on array` dans `public/index.php`.
- Cause: `app/config/routes.php` retourne un tableau de routes, pas une instance Slim.
- Correctif: remplacement par un dispatcher HTTP simple base sur le mapping des routes.

5. Verification endpoints (OK)
- `GET /api/lignes-commandes` => HTTP 200
- `GET /api/statistiques-artisans` => HTTP 200
- `GET /api/pays` => HTTP 200

## 2026-05-27

### Objectif de la session
Adapter le projet marketplace au nouveau schema SQL, reconnecter models/controllers/views, supprimer les elements obsoletes, ajouter les nouveaux endpoints API, puis peupler la base avec le seed.

### Actions realisees
1. Analyse et alignement schema/code
- Lecture du script SQL principal et cartographie des ecarts avec le code existant.
- Normalisation des resultats dans le modele de base pour stabiliser les noms de colonnes cote PHP.

2. Refonte des modeles existants
- Mise a jour des tables/champs/cles primaires pour coller au schema actuel.
- Suppression des modeles obsoletes relies a l ancien schema (panier, ligne_panier, personne, template_css).
- Ajout du modele ligne_commande.

3. Ajout des nouveaux modeles manquants
- pays, ville, paiement, avis, statistique_artisan, classe, r_utilisateur_adresse.
- Ajout des validateurs associes a chaque nouveau modele.

4. Reconnexion des controleurs
- CartController passe en panier session.
- OrderController cree les commandes a partir du panier session + insertion lignes de commande.
- PaymentController connecte au modele paiement (creation/mise a jour des statuts).
- ProfileController adapte (plus de table personne).
- ProductController corrige pour verification proprietaire artisan.

5. Nouveaux endpoints API ajoutes
- CRUD/API pour pays, ville, avis, paiements, classes, user-addresses.
- CRUD/API supplementaires ajoutes sur demande:
  - lignes-commandes
  - statistiques-artisans

6. Seed et jeu de donnees
- Refactor de app/seed.php avec:
  - roles imposes: administrateur, vendeur, client
  - referentiels (pays, villes), adresses, liaisons utilisateur-adresse
  - categories, produits, classes
  - tentative commande/ligne/paiement/avis/stats
- Creation du script SQL de seed clone:
  - sql/SeedDataClone.sql

### Fichiers principaux modifies/ajoutes (resume)
- Routes:
  - app/config/routes.php
- Nouveaux controleurs:
  - app/controllers/PaysController.php
  - app/controllers/VilleController.php
  - app/controllers/AvisController.php
  - app/controllers/PaiementApiController.php
  - app/controllers/ClasseController.php
  - app/controllers/UserAddressController.php
  - app/controllers/LigneCommandeController.php
  - app/controllers/StatistiqueArtisanController.php
- Seed:
  - app/seed.php
  - sql/SeedDataClone.sql

### Validation
- Verification des erreurs projet: OK (pas d erreur de compilation signalee par l outil).
- Execution seed:
  - commande: php app/seed.php
  - resultat: execution complete avec warning sur la section commande/paiement

### Point de blocage restant
Warning DB detecte pendant seed:
- Unknown column Id_utilisateur in field list
Cause probable:
- Trigger SQL tr_check_adresse_utilisateur du script DB reference adresse.Id_utilisateur alors que la table adresse n a pas cette colonne dans le schema actuel.

### Etat de reprise
Le projet est fonctionnel avec les adaptations majeures terminees.
La seule correction prioritaire restante pour un seed 100% sans warning est de corriger le trigger SQL de verification d adresse utilisateur dans:
- sql/Script SQL.sql

### Prochaines etapes recommandees
1. Corriger le trigger tr_check_adresse_utilisateur pour utiliser la table de liaison r_utilisateur_adresse.
2. Rejouer schema + seed.
3. Verifier rapidement 3 endpoints nouveaux:
- GET /api/lignes-commandes
- GET /api/statistiques-artisans
- GET /api/pays

### Commandes utiles pour reprendre
- php app/seed.php
- git status --short

## 2026-05-27 (stabilisation Slim + documentation + SQL production)

### Actions entreprises
1. Passage en flux Slim complet
- `public/index.php` simplifie pour utiliser `app/bootstrap.php` puis `run()`.
- `app/bootstrap.php` ajoute (creation app Slim, middlewares, base path, enregistrement des routes).
- `app/config/routes.php` converti en enregistrement de routes Slim (fichier separe conserve).

2. Middlewares et structure technique
- Ajout des composants suivants:
  - `app/middleware/SessionMiddleware.php`
  - `app/middleware/RequestDataMiddleware.php`
  - `app/middleware/AuthMiddleware.php`
  - `app/middleware/RoleMiddleware.php`
- Ajout des utilitaires:
  - `app/core/BasePathResolver.php`
  - `app/core/ControllerActionInvoker.php`
  - `app/core/JsonResponder.php`

3. Compatibilite local / production
- Tests valides en local sans prefixe et en simulation prefixe `/project02`.
- Ajout d un point d entree racine et des regles de reecriture:
  - `index.php`
  - `.htaccess`
  - `public/.htaccess`

4. Preparation de l integration frontend Angular
- Ajout du dossier d accueil: `frontend/`.
- Ajout de la documentation:
  - `frontend/README.md`
  - `ARCHITECTURE.md`
  - `docs/backend-migration-plan.md`
- Mise a jour des liens de documentation dans le README racine de `projet02` et dans `report.md`.

5. Nettoyage
- Suppression du dossier de test obsolete: `../SlimFramework`.

6. SQL clone / production
- Correction de `sql/SeedDataClone.sql` pour execution dans la base selectionnee.
- Creation du script tout-en-un: `sql/SetupCloneDatabase.sql` (creation DB + schema + seed).
- Correction de commentaires SQL incompatibles phpMyAdmin (`--SET ...` -> `-- SET ...`).
- Creation d une version production: `sql/SetupCloneDatabase.production.sql` (bloc EVENT desactive pour compatibilite hebergement).

### Incident et resolution
- Incident: vidage involontaire du fichier `sql/Script SQL.sql` pendant la regeneration SQL.
- Resolution: restauration depuis HEAD Git, puis reprise des correctifs SQL.

### Etat actuel
- API fonctionnelle sous Slim avec middleware actif.
- Documentation d architecture et de separation backend/frontend en place.
- Script SQL production dedie disponible pour import phpMyAdmin.

### Ce qu il faut faire pour la suite
1. Importer `sql/SetupCloneDatabase.production.sql` sur le serveur de production et verifier:
- `GET /api/pays`
- `GET /api/statistiques-artisans`
- `GET /orders` (retour 401 attendu sans session)

2. Figer la strategie d authentification frontend/backend avant integration Angular:
- session cookie (meme origine) ou token (origines separees)

3. Mettre en place CORS (ou proxy Angular en dev) selon la strategie retenue.

4. Ajouter un jeu minimal de tests de non-regression sur les routes critiques API.

5. Quand Angular sera integre dans `frontend/`, reevaluer la migration eventuelle vers une structure `backend/` + `frontend/` (sans urgence immediate).
