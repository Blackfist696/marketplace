# Architecture du projet marketplace

Ce document definit l architecture cible de l application et la separation des responsabilites entre backend et frontend.

## Vue d ensemble

Le depot suit une organisation de type mono-repo avec deux domaines techniques:
- backend API en PHP/Slim
- frontend SPA en Angular (dans un dossier dedie)

Objectif principal:
- separer clairement les responsabilites
- faciliter le travail parallele de l equipe
- maintenir une base de code lisible et deployable en local comme en production

## Structure actuelle retenue

- app/
  - logique applicative backend (controleurs, modeles, config)
- public/
  - point d entree HTTP backend et assets publics backend
- sql/
  - scripts SQL schema et seed
- test/
  - scripts de verification backend
- vendor/
  - dependances Composer
- frontend/
  - futur projet Angular (isole du backend)
- docs/
  - documentation technique et plans de migration

## Separation des responsabilites

### Backend (PHP/Slim)

Responsabilites:
- exposer les routes API
- appliquer les regles metier
- gerer l authentification et les autorisations
- acceder a la base de donnees
- renvoyer des reponses JSON coherentes

Non-responsabilites:
- logique de presentation Angular
- gestion des composants UI frontend

### Frontend (Angular)

Responsabilites:
- interface utilisateur
- navigation SPA
- consommation des endpoints API backend
- gestion de l etat UI et des formulaires

Non-responsabilites:
- acces direct a la base de donnees
- logique metier critique qui doit rester au backend

## Contrat d integration Backend-Frontend

Regles de base:
- le frontend consomme uniquement les routes API du backend
- les reponses backend sont renvoyees en JSON
- les erreurs API utilisent des codes HTTP explicites (401, 403, 404, 422, 500)
- les payloads doivent rester stables pour eviter les regressions frontend

Bonnes pratiques:
- versionner les changements de contrat API dans la documentation
- eviter les changements cassants sans synchronisation d equipe

## Authentification et autorisation

Etat actuel:
- backend Slim avec middlewares d authentification et de role
- certaines routes sont protegees (authentification requise ou role requis)

Recommandation:
- centraliser progressivement les controles d acces dans les middlewares
- limiter les verifications dupliquees dans les controleurs

## Environnements et deploiement

### Local

- backend execute localement (Laragon/Apache ou serveur PHP)
- frontend Angular execute separement dans frontend/
- si frontend et backend ne partagent pas la meme origine, configurer CORS ou proxy Angular

### Production

URL cible:
- https://bacinfo.eci-liege.info/project02/

Contraintes:
- compatibilite base path /project02
- routes backend et assets frontend deployes de facon coherente

## Regles de collaboration equipe

- le backend est maintenu dans les dossiers backend existants (app/, public/, sql/, test/)
- le frontend est maintenu exclusivement dans frontend/
- chaque modification de contrat API est documentee
- les PR doivent decrire l impact backend/frontend

## Plan d evolution

Court terme:
- integrer Angular dans frontend/
- maintenir la structure backend actuelle stable

Moyen terme:
- reevaluer une migration du backend vers backend/ uniquement quand l integration Angular est stabilisee
- suivre le plan dans docs/backend-migration-plan.md

## References internes

- frontend/README.md
- docs/backend-migration-plan.md
- app/config/routes.php
- app/bootstrap.php
