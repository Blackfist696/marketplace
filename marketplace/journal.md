# Journal de travail

---

## 2026-06-05 - Durcissement query params, correlation id, fix session et validation E2E

### Contexte
Demande utilisateur: renforcer la protection backend contre les manipulations de query params, ajouter de la tracabilite, et verifier que les chemins de bout en bout ne sont pas casses.

### Actions
- Ajout du middleware `app/middleware/QueryValidationMiddleware.php`.
- Application de la validation query (whitelist + typage) sur les routes:
  - `GET /payment`
  - `GET /artisan/orders`
  - `GET /artisan/stats`
  - `GET /admin/stats`
- Ajout des regles avancees:
  - champs requis (ex: `id_commande` sur `/payment`)
  - coherence de dates (`date_debut <= date_fin`)
- Ajout de la journalisation dediee des tentatives invalides dans `app/logs/query-validation-attempts.log`.
- Ajout du `correlation_id`:
  - reprise de `X-Correlation-Id` si valide sinon generation backend
  - retour de `X-Correlation-Id` dans la reponse
  - correlation_id inclus dans les logs de rejet query
- Diagnostic de persistance session/cookie:
  - cause racine identifiee dans `app/core/ControllerActionInvoker.php`
  - fix applique: fusion des headers natifs (dont `Set-Cookie`) dans les reponses PSR-7 retournees par les controleurs
- Campagne E2E:
  - relance de `test/api-checklist.ps1`
  - alignement des comptes artisan du script de test sur `docs/comptes-seed.md`

### Resultat
- Session login persistante retablie.
- Validation query active sur les routes sensibles.
- Correlation ID propage et logge.
- Checklist API E2E: `FAIL_COUNT=0`.

---

## 2026-06-03 — Cartographie flux backend dans ACTIONS.HTML

### Contexte
Demande utilisateur: documenter les "chemins" au sens des parcours requete/reponse (de `index.php` jusqu'au frontend) pour chaque route, puis ajouter une vulgarisation maximale avec exemples.

### Action
- Inventaire initial des chemins backend pour preparer la documentation (`docs/backend-paths.txt`).
- Creation puis refonte complete de `docs/ACTIONS.HTML` pour passer d'une simple liste de fichiers a une cartographie de flux HTTP.
- Ajout du pipeline global commun: `index.php` -> `public/index.php` -> `app/bootstrap.php` -> `app/config/routes.php`.
- Ajout d'un tableau exhaustif route par route: methode, endpoint, handler, middlewares de route, parcours vers la reponse frontend.
- Ajout de 4 blocs pedagogiques demandes:
  - schema visuel par etape,
  - exemple complet de requete reussie,
  - exemple complet de requete en echec,
  - tableau "qui fait quoi" des middlewares.
- Ajout d'une legende visuelle des statuts HTTP (2xx, 4xx, 5xx) en tete du document.
- Verification de format apres chaque modification via `git diff --check -- docs/ACTIONS.HTML`.

### Resultat
- `docs/ACTIONS.HTML` est devenu un support de lecture pedagogique + technique: il explique le fonctionnement global du backend et le detail de chaque route jusqu'a la reponse envoyee au frontend.

---

## 2026-06-03 — Documentation inline backend (core/security/config/middleware)

### Contexte
Demande utilisateur: commenter/expliquer en detail les fichiers de core, security, config et middleware, puis commenter uniquement les classes parentes dans controllers, models et validators.

### Action
- Ajout de commentaires explicatifs dans les fichiers `app/core/*` pour documenter la resolution de base path, l'invocation des controleurs legacy et la reponse JSON PSR-7.
- Enrichissement des fichiers `app/config/*` pour expliciter les options de securite/session et la mecanique d'enregistrement des routes.
- Documentation des middlewares `app/middleware/*` et `app/security/*` (CORS, session, CSRF, auth, roles, rate limit).
- Commentaires detailes ajoutes sur les classes parentes seulement: `app/controllers/Controller.php`, `app/models/Model.php`, `app/models/validators/AbstractValidator.php`.

### Resultat
- Le backend est maintenant mieux auto-documente pour la maintenance et la passation, sans changement de logique metier.

---

## 2026-06-03 — Correctif affichage PlantUML

### Contexte
Demande utilisateur: les diagrammes PlantUML affichaient des puces de fonctions sans les noms.

### Action
- Ajout dans chaque bloc PlantUML des directives `show methods`, `show fields` et `skinparam classAttributeIconSize 0`.

### Resultat
- Le rendu PlantUML affiche explicitement les noms des fonctions dans les classes (au lieu d'icones seules).

---

## 2026-06-03 — UML fonctions et découpage

### Contexte
Demande utilisateur: ajouter les fonctions présentes dans les classes et découper le diagramme en sections plus lisibles, avec un complément dans la version TFE si utile.

### Action
- Découpage du diagramme de `docs/cahier-technique-backend-db.md` en blocs séparés: contrôleurs, socle technique, modèles de référentiel et modèles métier.
- Ajout des fonctions visibles par classe dans la documentation détaillée.
- Ajout d'un résumé des fonctions clés dans `docs/cahier-technique-backend-db-tfe.md`.

### Resultat
- La documentation est plus lisible et montre les fonctions importantes sans perdre la version exhaustive.

---

## 2026-06-03 — UML detaille backend

### Contexte
Demande utilisateur: produire une version detaillee avec cardinalites et une version PlantUML du diagramme de classes backend.

### Action
- Enrichissement de `docs/cahier-technique-backend-db.md` avec une vue UML detaillee et un bloc PlantUML directement reutilisable.
- Ajout d'une version pedagogique resume dans `docs/cahier-technique-backend-db-tfe.md`.

### Resultat
- Les deux documents de reference contiennent maintenant des diagrammes de classes exploitables pour la documentation et pour l'export.

---

## 2026-06-03 — Diagramme UML backend

### Contexte
Demande utilisateur: ajouter un diagramme UML des classes du backend.

### Action
- Ajout d'une section UML dans `docs/cahier-technique-backend-db.md`.
- Separation en deux vues: heritage applicatif et relations metier.
- Mise en evidence des classes principales du backend PHP: controllers, models, validators, base `Model` et `Database`.

### Resultat
- La documentation technique contient maintenant une vue structurelle du backend exploitable pour la lecture et le partage.

---

## 2026-05-29 — Analyse du frontend Angular (collègue)

### Contexte
Le collègue a livré un frontend Angular complet dans `marketplace/frontend/marketplace-frontend/`.
Après déplacement du contenu vers `marketplace/frontend/`, une erreur `tsconfig.app.json` a été corrigée
(ajout de `"rootDir": "./src"` dans les `compilerOptions`).

---

### Stack et configuration

| Élément | Valeur |
|---|---|
| Framework | Angular 21.2 (standalone components, no NgModule) |
| CSS framework | Tailwind CSS 3 + PostCSS |
| Graphiques | Chart.js 4 + ng2-charts 10 |
| Dates | date-fns 4 |
| Notifications | ngx-toastr 20 |
| URL API dev | `http://localhost:8000` (via `environment.ts`) |
| URL API proxy dev | `http://localhost` (via `proxy.conf.json`) |

> **Note importante:** l'`environment.ts` pointe sur `:8000` mais le `proxy.conf.json` pointe sur `:80`.
> Il faudra décider d'une stratégie cohérente (voir section "Points de liaison").

---

### Architecture des dossiers `src/app/`

```
app/
├── app.ts           → bootstrap: charge profil + panier au démarrage
├── app.config.ts    → provideRouter + provideHttpClient(withFetch)
├── app.routes.ts    → routing lazy-loaded
├── core/
│   ├── guards/      → authGuard, roleGuard
│   ├── models/      → models.ts (toutes les interfaces TS)
│   └── services/    → 9 services HTTP
├── layouts/
│   ├── main-layout/     → layout public (header, footer)
│   ├── artisan-layout/  → layout espace artisan
│   └── admin-layout/    → layout back-office admin
├── pages/
│   ├── auth/        → login, register
│   ├── home/        → page d'accueil
│   ├── catalogue/   → liste produits
│   ├── product-detail/
│   ├── cart/        → panier
│   ├── checkout/    → passage de commande
│   ├── artisan-shop/→ boutique publique artisan
│   ├── artisan/     → dashboard, produits, commandes, stats (espace artisan)
│   ├── admin/       → dashboard, artisans, commandes, produits (back-office)
│   └── not-found/
└── shared/
    ├── kpi-card/
    ├── product-card/
    └── toast-container/
```

---

### Routing et protection des accès

Le routing est entièrement **lazy-loaded** (pas de bundle initial lourd).
Deux niveaux de garde :

| Guard | Logique |
|---|---|
| `authGuard` | Redirige vers `/login` si `currentUser` signal est null |
| `roleGuard(role)` | Accepte le rôle exact OU le rôle admin (id 1) |

Correspondance des rôles back ↔ front :
- `id_role = 1` → admin → route `/admin`
- `id_role = 2` → artisan → route `/artisan`
- `id_role = 3` → client → routes publiques + `/commande`

---

### Services HTTP et correspondance avec le backend

Tous les services utilisent `{ withCredentials: true }` (session cookie), ce qui est cohérent avec la stratégie de session PHP actuelle.

| Service | Endpoints appelés | Routes backend (routes.php) |
|---|---|---|
| `AuthService` | `POST /login`, `POST /logout`, `POST /register`, `GET /profile` | ✅ OK |
| `ProductService` | `GET /products`, `GET /products/{id}`, `GET /artisans/{id}/products`, `GET /artisan/products`, `POST/PUT/DELETE /products/{id}`, `GET/PUT/DELETE /admin/products/{id}` | ✅ OK |
| `ArtisanService` | `GET /artisans`, `GET /artisans/{id}`, `GET /artisan/stats`, `GET/PUT/DELETE /admin/artisans/{id}` | ✅ OK |
| `CartService` | `GET /cart`, `POST /cart`, `PUT /cart/{id}`, `DELETE /cart/{id}` | ✅ OK |
| `OrderService` | `GET /orders`, `GET /orders/{id}`, `POST /orders` | ✅ OK |
| `AdminService` | `GET /admin/stats`, `GET/PUT/DELETE /admin/users/{id}` | ✅ OK |
| `AddressService` | `GET /api/pays`, `GET /api/villes`, `GET /api/user-addresses`, `POST /api/user-addresses`, `DELETE /api/user-addresses/{u}/{a}` | ✅ OK |
| `AvisService` | `GET /api/produits/{id}/avis`, `GET /api/avis`, `POST /api/avis`, `PUT /api/avis/{id}` | ✅ OK |
| `ToastService` | Service interne, pas d'appel HTTP | — |

---

### Modèles TypeScript vs schéma SQL

Les interfaces de `models.ts` sont très fidèles au schéma SQL établi.
Points de concordance vérifiés :

- `Utilisateur` : champs `id_utilisateur`, `email`, `nom`, `prenom`, `id_role`, `actif` → ✅
- `Artisan` : `id_artisan`, `nom_boutique`, `valide`, `commission`, `iban` → ✅
- `Produit` : `prix_ht`, `taux_tva`, `stock`, `mis_en_avant`, `actif` → ✅
- `Commande` : `reference`, `statut` (type union TypeScript), `total_ht`, `total_tva`, `total_ttc` → ✅
- `LigneCommande`, `Avis`, `Adresse`, `Ville`, `Pays` → ✅
- Constantes `STATUT_LABELS`, `STATUT_NEXT` : modélisent la machine à états de la commande → ✅
- `CATEGORY_LABELS` : 8 catégories (miels, savons, confiseries…) → à croiser avec la table `categorie` en base

---

### Incohérences et points à résoudre

#### 1. Port API inconsistant
- `environment.ts` → `http://localhost:8000`
- `proxy.conf.json` → `http://localhost` (port 80)
- **Action requise :** Aligner sur le port réel du serveur PHP local (`localhost` + Apache ou `localhost:8000` si PHP built-in). Mettre à jour `environment.ts` ou démarrer le backend sur `:8000`.

#### 2. Endpoint `adminUpdateStatut` incorrect
Dans `order.service.ts`, `adminUpdateStatut` appelle :
```
PUT /api/lignes-commandes/{id}
```
Or la mise à jour du statut d'une **commande** devrait cibler :
```
PUT /admin/orders/{id}   ← route inexistante dans routes.php
```
La route backend `PUT /api/lignes-commandes/{id}` existe mais est destinée aux lignes, pas au statut de la commande.
- **Action requise :** Ajouter la route `PUT /admin/orders/{id}` côté PHP **ou** adapter le service Angular pour utiliser le bon endpoint.

#### 3. Route `GET /admin/orders` absente
`AdminService` récupère les commandes via `GET /orders` (route client, protégée `clientRole`).
Il n'existe pas de route dédiée admin pour lister toutes les commandes.
- **Action requise :** Ajouter `GET /admin/orders` avec `$adminRole` dans `routes.php` et un contrôleur correspondant.

#### 4. CORS pour le développement
`CorsMiddleware` est en place côté backend (origines `localhost:4200` autorisées).
Pour que `ng serve` fonctionne, il faut que le middleware soit actif dans `bootstrap.php`.
À vérifier : `CorsMiddleware` est-il bien enregistré dans `app/bootstrap.php` ?

#### 5. Catégories vs `CATEGORY_LABELS`
Le frontend définit 8 catégories hardcodées dans `CATEGORY_LABELS`.
Le backend possède une table `categorie` dynamique.
- **À clarifier :** le frontend utilise-t-il ces labels pour filtrer en dur ou s'attend-il à un endpoint `GET /api/categories` ?
  Si oui, la route et le contrôleur sont à créer côté PHP.

---

### Points de liaison backend ↔ frontend (résumé actionnable)

| Priorité | Action | Fichier(s) concerné(s) |
|---|---|---|
| 🔴 Critique | Choisir et uniformiser le port API | `frontend/src/environments/environment.ts`, `proxy.conf.json` |
| 🔴 Critique | Vérifier que `CorsMiddleware` est bien ajouté dans `bootstrap.php` | `app/bootstrap.php` |
| 🟠 Important | Ajouter `GET /admin/orders` dans les routes backend | `app/config/routes.php`, `AdminController.php` |
| 🟠 Important | Corriger `adminUpdateStatut` dans `order.service.ts` | `frontend/src/app/core/services/order.service.ts` |
| 🟡 Mineur | Décider si les catégories sont statiques ou dynamiques (endpoint `GET /api/categories`) | `models.ts`, éventuellement nouveau contrôleur PHP |

---

### Commandes de démarrage du frontend

```bash
cd marketplace/frontend
npm install
ng serve --proxy-config proxy.conf.json
```

---



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

## 2026-05-29 (runbook pre-migration production)

### Contexte cible
- URL production: `https://bacinfo.eci-liege.info/project02/`
- Base MySQL production:
  - host: `localhost`
  - user: `project02@bacinfo.eci-liege.info`
  - password: `project02@bacinfo.eci-liege.info`

### Checklist a executer juste avant de deplacer le projet
1. Frontend Angular (build prod sous sous-chemin `/project02/`)
- Modifier `frontend/src/index.html`:
  - `<base href="/">` -> `<base href="/project02/">`
- Modifier `frontend/src/environments/environment.prod.ts`:
  - `apiUrl: ''` -> `apiUrl: '/project02'`

2. Backend (base path + debug)
- Verifier `app/config/app.php`:
  - `base_path` doit rester `'/project02'`
- Mettre `APP_DEBUG=0` en production.

3. Connexion base de donnees production
- Mettre a jour `app/config/databaseConfig.php`:
  - `host` = `localhost`
  - `user` = `project02@bacinfo.eci-liege.info`
  - `password` = `project02@bacinfo.eci-liege.info`
  - `name` = base cible de production

4. Base SQL (installation propre)
- Importer `sql/SetupCloneDatabase.production.sql` via phpMyAdmin.
- Ce script recree une base vide au depart (`DROP DATABASE IF EXISTS ...`).

5. Verification post-deploiement (smoke test)
- Ouvrir `https://bacinfo.eci-liege.info/project02/`.
- Verifier:
  - chargement page d accueil
  - `GET /project02/products` retourne 200
  - login admin/client/artisan
  - acces refuses conformes (client -> admin, artisan -> autre artisan)

### Notes importantes
- En local, les 404 API etaient dus au proxy dev vers le mauvais port; correction appliquee sur `frontend/proxy.conf.json` vers `http://localhost:8000`.
- Le warning seed `Unknown column 'Id_utilisateur'` venait d un trigger obsoletement charge dans la DB locale; corrige en remettant la version du trigger basee sur `r_utilisateur_adresse`.

## 2026-05-29 (enrichissement seed catalogue)

### Demande couverte
- Peupler la base avec 8 sortes de produits: Miels, Savons, Confiseries, Cosmetiques, Bougies, Pollen, Propolis, Coffrets.
- Creer 1 artisan dedie par sorte.
- Creer 5 produits par sorte avec images associees.

### Implementation
- Extension de `app/seed.php` pour creer 8 categories metier idempotentes.
- Creation de 8 comptes artisans specialises et de leurs fiches artisan.
- Creation de 40 produits au total (5 par categorie).
- Creation de 80 images produit au total (2 par produit: principale + detail).

### Verification
- Seed relance avec succes.
- Comptages verifies en base:
  - Miels: 5
  - Savons: 5
  - Confiseries: 5
  - Cosmetiques: 5
  - Bougies: 5
  - Pollen: 5
  - Propolis: 5
  - Coffrets: 5
  - artisans specialises: 8
  - images produit: 80

## 2026-05-29 (note de migration legacy -> catalogue specialise)

### Objectif
Conserver une procedure claire pour migrer une base existante contenant encore les anciens produits legacy
(ex: Bijoux/Decoration, vendeur@example.com, artisan generique) vers le catalogue specialise actuel.

### Scripts concernes
- `sql/MigrateLegacyCatalog.sql`
- `sql/SeedSpecializedCatalog.sql`
- `sql/SeedDataClone.sql`
- `sql/SetupCloneDatabase.sql`
- `sql/SetupCloneDatabase.production.sql`

### Strategie d execution
1. Si la base est deja en place (avec donnees historiques):
- Executer d abord `sql/SeedSpecializedCatalog.sql` pour injecter le nouveau catalogue sans casser l existant.
- Executer ensuite `sql/MigrateLegacyCatalog.sql` pour:
  - remapper les references legacy vers les nouveaux produits,
  - supprimer les elements legacy devenus orphelins,
  - dedoublonner les lignes de commande/avis fusionnes,
  - recalculer `commande.total_ht`, `commande.total_tva`, `commande.total_ttc`,
  - synchroniser `paiement.montant` avec `commande.total_ttc`.

2. Si la base doit etre recreee from scratch:
- Utiliser directement `sql/SetupCloneDatabase.sql` (dev) ou
  `sql/SetupCloneDatabase.production.sql` (prod).
- Ces scripts sont alignes sur le dataset final (8 categories, 8 artisans, 40 produits, 80 images).

### Resultat attendu apres migration
- Plus de categories legacy `Bijoux` et `Decoration`.
- Plus de comptes legacy `vendeur@example.com` et `artisan@example.com` (si orphelins).
- Catalogue final limite a:
  - Miels, Savons, Confiseries, Cosmetiques, Bougies, Pollen, Propolis, Coffrets.
- 5 produits par categorie, 40 produits au total.
- Commande seed de reference coherente:
  - `total_ht = 18.30`
  - `total_tva = 1.10`
  - `total_ttc = 24.40`
  - `paiement.montant = 24.40`

### Note de prudence
Les IDs seedes comportent volontairement des trous (pas de renumerotation globale) pour eviter les effets de bord
sur les cles et references existantes.

## 2026-05-29 (trace comptes seedes)

### Action
- Generation d un tableau des utilisateurs seedes et de leurs mots de passe initiaux de developpement.

### Fichier de reference
- `docs/comptes-seed.md`

### Rappel
- Ces mots de passe sont strictement prevus pour le developpement local.
- En base, les mots de passe sont stockes en hash bcrypt.

## 2026-05-29 (bilan des actions accomplies jusqu a present)

### Backend/API
- Correction du contrat API produit pour le frontend Angular:
  - ajout de la categorie dans les reponses produits.
  - mise a jour du mapping categorie dans le controleur produit.
- Ajustement du typage frontend produit pour prendre en charge la categorie exposee par l API.

### Seed applicatif
- Refonte de `app/seed.php` pour alignement metier complet:
  - suppression du compte artisan generique,
  - creation/maintien de 8 categories metier,
  - creation/maintien de 8 artisans specialises,
  - creation/maintien de 40 produits,
  - creation/maintien de 80 images produit,
  - recalcul dynamique des montants commande/paiement (plus de valeurs legacy codees en dur).

### SQL migration/seed
- Creation de `sql/SeedSpecializedCatalog.sql` pour injection reexecutable du catalogue specialise.
- Creation de `sql/MigrateLegacyCatalog.sql` pour migration d une base existante legacy vers le nouveau referentiel:
  - remap des references produits legacy,
  - nettoyage des categories/comptes legacy orphelins,
  - dedoublonnage post-fusion,
  - recalcul des totaux commande,
  - alignement des paiements.
- Remplacement/alignment du dataset seed dans:
  - `sql/SeedDataClone.sql`
  - `sql/SetupCloneDatabase.sql`
  - `sql/SetupCloneDatabase.production.sql`

### Validations effectuees
- Verification base apres migration:
  - 0 produit legacy,
  - 0 categorie legacy,
  - 0 artisan legacy,
  - 40 produits au total,
  - repartition: 5 produits par categorie sur 8 categories.
- Verification commande/paiement seed:
  - `commande.total_ht = 18.30`
  - `commande.total_tva = 1.10`
  - `commande.total_ttc = 24.40`
  - `paiement.montant = 24.40`
- Verification front/proxy API:
  - endpoint `/products` expose bien 8 categories,
  - distribution constatee: 5 produits par categorie.

### Traçabilite documentaire
- Ajout de la note de migration legacy dans ce journal.
- Ajout du tableau des comptes seedes (dev) et mots de passe initiaux dans:
  - `docs/comptes-seed.md`

## 2026-05-30 (journal de session: documentation backend)

### Demande utilisateur
- Expliquer de facon simple le role des fichiers dans `app/middleware`.
- Ajouter un schema de la chaine middleware dans les 2 cahiers techniques.
- Ajouter une version Mermaid du schema dans les 2 cahiers.

### Actions realisees
- Lecture et analyse des middlewares backend:
  - `app/middleware/SessionMiddleware.php`
  - `app/middleware/CorsMiddleware.php`
  - `app/middleware/RequestDataMiddleware.php`
  - `app/middleware/AuthMiddleware.php`
  - `app/middleware/RoleMiddleware.php`
- Verification de l'ordre reel d'execution via `app/bootstrap.php`.
- Ajout d'un schema texte debutant dans:
  - `docs/cahier-technique-backend-db.md`
  - `docs/cahier-technique-backend-db-tfe.md`
- Ajout d'un diagramme Mermaid coherent avec le flux reel dans:
  - `docs/cahier-technique-backend-db.md`
  - `docs/cahier-technique-backend-db-tfe.md`

### Resultat
- Les 2 documents contiennent maintenant:
  - une chaine middleware lisible de bout en bout,
  - un rappel rapide des statuts `401`, `403`, `422`, `500`,
  - un schema Mermaid exploitable pour support oral/TFE.

## 2026-05-30 (activation journalisation automatique)

### Demande utilisateur
- Activer la journalisation automatique pour toute nouvelle action.

### Action realisee
- Regle de travail activee: chaque action importante sera consign�e dans `journal.md`.
- Memoire repo mise a jour pour persister cette consigne de fonctionnement.

### Engagement
- A partir de maintenant, j'ajoute une entree datee au journal apres chaque lot d'actions significatif.
