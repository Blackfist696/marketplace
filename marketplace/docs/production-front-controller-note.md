# Note de deploiement - front controller unique (option 1)

## Cible recommandee

- Un seul point d'entree HTTP: `public/index.php`
- DocumentRoot du serveur web: dossier `marketplace/public`
- Regles de rewrite: `public/.htaccess`

## Pourquoi

- Reduit la surface d'exposition de `app/`, `vendor/`, `sql/`, `docs/`.
- Aligne le projet avec la pratique standard Slim/PHP.
- Evite les doubles redirections et la confusion entre deux points d'entree.

## Checklist production (Apache)

1. Activer `mod_rewrite`.
2. Pointer le VirtualHost vers `.../marketplace/public`.
3. Verifier `AllowOverride All` sur le dossier public (ou reporter la regle de rewrite dans le vhost).
4. Verifier que `public/.htaccess` est pris en compte.

Exemple minimal:

```apache
<VirtualHost *:80>
    ServerName marketplace.local
    DocumentRoot "D:/Drive/#ECI/Projet d'integration de developpement/projet02/marketplace/public"

    <Directory "D:/Drive/#ECI/Projet d'integration de developpement/projet02/marketplace/public">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Plan de secours si contrainte hebergeur

Si l'hebergeur impose la racine projet comme webroot et ne permet pas de cibler `public/`:

1. Reintroduire un `index.php` en racine qui fait `require_once __DIR__ . '/public/index.php';`
2. Reintroduire un `.htaccess` en racine avec rewrite vers `index.php`.
3. Conserver `public/index.php` comme front controller reel.

Contenu de secours - `index.php` racine:

```php
<?php

require_once __DIR__ . '/public/index.php';
```

Contenu de secours - `.htaccess` racine:

```apache
RewriteEngine On

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.php [QSA,L]
```

## Deploiement du frontend Angular

Le frontend Angular est produit dans le dossier `public/app` et doit etre copie dans le dossier de production correspondant au point d'entree PHP.

> **Note — 16 juin 2026 :** le SSR (Angular Universal / Node Express) a ete retire. Le build produit uniquement un bundle navigateur. Il n'y a **plus** de dossier `server/` a deployer. Seul le contenu de `public/app/browser/` est necessaire.

En pratique :
1. Generer le build Angular avec `npm run build` depuis `frontend/`.
2. Copier le contenu de `public/app/browser/` vers le dossier equivalent sur le serveur de production.
3. S'assurer que le backend PHP continue d'etre servi par `public/index.php` et que la base path `/project02` est preservee.

## Verification rapide post-deploiement

1. `GET /` retourne bien la reponse attendue.
2. `GET /api/pays` (ou autre endpoint public) retourne du JSON.
3. Un endpoint protege retourne bien `401/403` selon le contexte.

## Voir aussi

- Plan SEO detaille: [docs/seo-implementation-plan.md](seo-implementation-plan.md)
