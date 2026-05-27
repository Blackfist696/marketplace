# Plan de migration future vers backend/

Objectif:
- preparer une migration propre du backend actuel vers un dossier backend/
- ne rien deplacer tout de suite
- reduire le risque de casse sur le routage, le deploiement et la configuration locale

## Structure cible envisagee

- backend/
  - app/
  - public/
  - sql/
  - test/
  - vendor/
  - composer.json
  - index.php
  - .htaccess
- frontend/
  - application Angular

## Pourquoi ne pas migrer maintenant

- le backend vient d etre stabilise avec Slim, les routes et le base path
- un deplacement immediat augmenterait le risque sur Laragon, Apache et le deploiement de production
- le frontend Angular n est pas encore integre, donc la pression structurelle reste faible

## Preconditions avant migration

- le frontend Angular est ajoute et demarre correctement depuis frontend/
- les points d entree backend local et production sont documentes
- la strategie de deploiement frontend/backend est validee
- les chemins utilises par Apache ou Laragon sont identifies
- la convention d URL API est figee

## Etapes recommandees le jour de la migration

1. Creer la nouvelle arborescence backend/
2. Deplacer app/, public/, sql/, test/, vendor/ et les fichiers PHP/Composer associes dans backend/
3. Ajuster les chemins dans:
   - public/index.php
   - index.php
   - app/bootstrap.php
   - .htaccess
4. Verifier l autoload Composer apres deplacement
5. Verifier le base path local et production
6. Tester les routes publiques et protegees
7. Tester le seed et la connexion base de donnees
8. Mettre a jour la documentation de demarrage

## Points de vigilance

- chemins absolus ou relatifs dans les includes PHP
- document root local Laragon
- regles Apache de reecriture
- variable APP_BASE_PATH en production
- integration du frontend build avec le backend
- sessions et authentification si frontend et backend sont servis differemment

## Strategie de validation minimale

- GET /api/pays
- GET /api/statistiques-artisans
- GET /orders avec verification 401/200 selon session
- php app/seed.php ou equivalent apres migration
- verification du chargement des assets si le frontend est deja integre

## Decision recommandee aujourd hui

- conserver le backend a la racine pour le moment
- integrer Angular dans frontend/
- reevaluer la migration vers backend/ une fois le frontend branche et les besoins de deploiement confirmes
