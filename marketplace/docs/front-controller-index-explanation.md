# Explication du pré-traitement dans public/index.php

Ce document explique la partie du fichier [public/index.php](../public/index.php) située avant l’instruction qui charge le bootstrap et instancie `$app`.

## Objectif général

Avant d’appeler le framework Slim, ce script effectue un pré-traitement de la requête HTTP. Son but est de décider si la requête doit :

- être servie directement comme un fichier statique,
- être redirigée vers une page HTML de l’interface SPA,
- ou être transmise au backend Slim pour être traitée par les routes API et les contrôleurs.

Autrement dit, ce code sert de “front controller” intelligent qui prépare la requête avant le démarrage réel de l’application.

## Ce qui se passe avant le bootstrap

### 1. Lecture de la requête entrante

Le script récupère :

- la méthode HTTP utilisée (`GET`, `POST`, etc.),
- le chemin demandé dans l’URL,
- et le dossier racine du frontend SPA.

Ces informations permettent de décider quelle réponse renvoyer.

### 2. Service des fichiers statiques

La première brique consiste à vérifier si la requête pointe vers un fichier existant dans le dossier `public/`.

Si c’est le cas :

- le fichier est envoyé directement au navigateur,
- le bon type MIME est défini selon l’extension (`.css`, `.js`, `.png`, etc.),
- et l’exécution s’arrête immédiatement.

Cela évite de faire passer des images, feuilles de style ou scripts JavaScript par Slim alors qu’ils n’ont pas besoin d’être traités par le backend.

### 3. Redirection vers l’interface SPA

Si la requête n’est pas un fichier statique, le script vérifie si l’application frontend est présente sous le dossier `app/browser`.

Dans ce cas, il tente de déterminer si la requête correspond :

- à une route frontend (par exemple une page de l’interface),
- ou à une route backend réelle (par exemple `/api/...`, `/login`, `/products`, etc.).

Le but est de renvoyer l’index HTML du frontend pour les URLs qui doivent être gérées côté navigateur, notamment pour une application SPA.

## Pourquoi ce pré-traitement est nécessaire

Sans cette logique :

- les routes frontend ne fonctionneraient pas correctement si l’utilisateur recharge une page directement,
- les assets statiques pourraient être mal servis,
- et le backend pourrait recevoir des URL qui ne sont pas destinées à une API.

Ce code garantit que :

- l’interface SPA peut fonctionner avec des routes propres,
- les fichiers publics sont servis rapidement,
- et les routes API sont bien distinguées des routes frontend.

## Le rôle des variables principales

### `$requestMethod`
Représente la méthode HTTP utilisée par la requête.

### `$requestPath`
Contient le chemin demandé, par exemple `/products` ou `/admin/orders`.

### `$spaRoot`
Indique l’emplacement du frontend SPA à servir si nécessaire.

## Ce qui se passe ensuite

Une fois que toutes ces vérifications ont été faites :

- soit la requête a déjà été traitée et le script a arrêté son exécution,
- soit il continue vers l’initialisation de l’application Slim avec :

```php
$app = require_once __DIR__ . '/../app/bootstrap.php';
$app->run();
```

C’est à ce moment-là que le backend réel démarre pour traiter les routes API, les contrôleurs et les middlewares.

## En résumé

La partie située avant l’instanciation de `$app` sert à :

- détecter les fichiers statiques,
- décider si la requête doit être envoyée au frontend ou au backend,
- et préparer un environnement où le framework Slim ne reçoit que les requêtes réellement destinées à l’API.

C’est une couche de routage et de pré-dispatch essentielle pour le bon fonctionnement du projet.
