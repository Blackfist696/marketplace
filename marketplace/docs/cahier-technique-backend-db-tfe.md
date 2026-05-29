# Cahier technique backend + base de donnees (version TFE)

## 1. Introduction

Ce document presente le fonctionnement backend du projet marketplace de maniere pedagogique.
L'objectif est de decrire simplement mais precisement:
- comment une requete est traitee,
- comment Slim est utilise,
- quels sont les chemins API disponibles,
- quelles securites sont appliquees,
- comment la base de donnees est structuree.

Ce document est complementaire de la version technique detaillee:
- docs/cahier-technique-backend-db.md

## 2. Vue d'ensemble de l'architecture

Le backend repose sur une architecture MVC legere autour de Slim 4:
- Front controller: public/index.php
- Bootstrap applicatif: app/bootstrap.php
- Routing central: app/config/routes.php
- Controleurs metier: app/controllers/
- Modeles + validation: app/models/
- Noyau technique: app/core/
- Securite dediee: app/security/
- Middlewares transverses: app/middleware/

### 2.1 Pourquoi Slim dans ce projet

Slim est utilise comme moteur HTTP.
Il apporte:
- la gestion des routes,
- la pile de middlewares,
- la normalisation Request/Response (PSR-7),
- la gestion des erreurs centralisee.

Concretement, Slim orchestre le cycle complet d'une requete entrante jusqu'a la reponse JSON finale.

## 3. Chemin complet d'une requete

Exemple: POST /project02/api/avis

1. Le client envoie la requete HTTP.
2. public/index.php charge app/bootstrap.php puis lance app->run().
3. Slim applique les middlewares globaux.
4. Slim matche la route dans app/config/routes.php.
5. Les middlewares de route (auth/role/rate-limit) sont appliques si necessaire.
6. Le ControllerActionInvoker appelle le controleur cible.
7. Le controleur applique la logique metier et utilise les modeles.
8. Le modele valide les donnees et execute les requetes SQL via PDO.
9. JsonResponder construit la reponse JSON PSR-7.
10. Les logs sont enrichis selon le statut et le contexte.

## 4. Role des composants centraux

## 4.1 app/core

- BasePathResolver: detecte le prefixe d'URL (ex: /project02).
- ControllerActionInvoker: lien entre une route Controller@action et son execution reelle.
- JsonResponder: normalise toutes les sorties JSON.
- AppLogger: journalise les evenements applicatifs avec rotation de logs.

## 4.2 app/middleware

- SessionMiddleware: initialise la session de facon securisee.
- CorsMiddleware: gere CORS et preflight OPTIONS.
- RequestDataMiddleware: parse les corps JSON/form-data en entree.
- AuthMiddleware: bloque les routes protegees pour les non connectes.
- RoleMiddleware: bloque les routes non autorisees par role.

## 4.3 app/security

- SessionSecurity: politique cookies/session (strict mode, httponly, samesite).
- CsrfTokenManager + CsrfMiddleware: protection CSRF.
- LoginRateLimitMiddleware: limitation des tentatives de connexion.
- OwnershipGuard: verification des droits proprietaire/admin sur les ressources.
- AuthContext: extraction du contexte utilisateur depuis la session.

## 5. Gestion des routes et des chemins API

Le registre principal est:
- app/config/routes.php

Le base path applicatif est configure a:
- /project02

Exemples de chemins complets:
- GET /project02/
- POST /project02/login
- GET /project02/products
- POST /project02/orders
- GET /project02/api/pays
- POST /project02/api/avis

La strategie de securisation des routes est explicite dans la declaration:
- route publique (sans middleware),
- route authentifiee (AuthMiddleware),
- route restreinte par role (RoleMiddleware),
- route sensible avec controle metier (ownership dans les controleurs).

## 6. Securite backend mise en place

## 6.1 Authentification et autorisation

- Authentification par session.
- Role utilisateur en session (admin, artisan, client).
- Register securise: le role n'est plus choisi librement par le client.

## 6.2 CSRF

- Token CSRF stocke en session.
- Verification sur requetes mutantes authentifiees.
- Header X-CSRF-Token expose pour le frontend Angular.

## 6.3 Rate limiting

- Rate limit applique sur POST /login.
- Fenetre glissante avec configuration par variables d'environnement.

## 6.4 Protection ownership (BOLA/IDOR)

- Paiements: acces reserve au proprietaire de la commande ou admin.
- Lignes de commande: meme regle.
- Avis: modification/suppression reservee a l'auteur ou admin.

## 6.5 Validation metier

- Chaque modele peut declarer un validator dedie.
- Les erreurs de validation sont captees et renvoyees proprement (422).

## 6.6 Logs et tracabilite

Dossier:
- app/logs

Canaux principaux:
- app-error.log
- client-error.log
- validation.log
- security.log
- access.log
- rate-limit.log
- php-error.log

Rotation simple:
- seuil configurable (APP_LOG_MAX_BYTES),
- bascule vers suffixe .1.

## 7. Base de donnees: structure et logique

Schema principal:
- sql/Script SQL.sql

Tables coeur:
- role, utilisateur
- pays, ville, adresse
- artisan, categorie, produit, image_produit
- commande, ligne_commande, paiement
- avis, statistique_artisan
- r_utilisateur_adresse, classe

Relations importantes:
- utilisateur -> role
- artisan -> utilisateur
- produit -> artisan
- commande -> utilisateur + adresse
- ligne_commande -> commande + produit
- paiement -> commande
- avis -> utilisateur + produit
- classe -> categorie + produit

Contraintes cle:
- email utilisateur unique
- reference commande unique
- cles composites sur les tables de liaison

## 8. Scripts SQL et cycle de preparation

1. sql/Script SQL.sql: creation du schema.
2. sql/SeedDataClone.sql: donnees de reference + tests.
3. sql/SeedSpecializedCatalog.sql: enrichissement catalogue.
4. sql/MigrateLegacyCatalog.sql: migration legacy -> nouveau catalogue.
5. sql/SetupCloneDatabase.sql: reinit complete locale.
6. sql/SetupCloneDatabase.production.sql: variante orientee production.

## 9. Exemple pedagogique: route home

Route:
- GET /project02/
- Handler: HomeController@index

Comportement:
1. La route est matchee dans routes.php.
2. L'invoker appelle HomeController@index.
3. Le controleur utilise respond(...).
4. JsonResponder renvoie une reponse JSON standard.

Ce flux montre la philosophie du projet: une API JSON uniforme, avec un pipeline HTTP clair.

## 10. Conclusion

Le backend du projet est structure autour d'un pipeline Slim propre, d'une separation claire des responsabilites et d'une securisation pragmatique:
- middlewares transverses,
- securite dediee en app/security,
- controle metier dans les controleurs,
- validation au niveau modele,
- logs exploitables en production.

Cette base est suffisamment robuste pour un contexte TFE: elle est lisible, evolutive et testable, tout en restant simple a expliquer a l'oral.
