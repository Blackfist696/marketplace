# Plan implementation SEO - Marketplace

Date: 2026-06-05
Contexte: architecture SPA + API avec front servi sous /project02/public/app en production (contrainte hebergeur).

## Objectif

Ameliorer le referencement organique sans casser les parcours metier existants, puis evoluer vers un rendu plus SEO-friendly pour les pages publiques.

## Phase 1 - Quick wins (2 a 4 jours)

### 1. Metadonnees SEO route par route
- Definir un title et une meta description dynamiques sur les pages publiques.
- Ajouter une URL canonique sur chaque page indexable.
- Appliquer noindex sur les pages privees: login, register, panier, commande, admin, artisan.

Fichiers cibles:
- frontend/src/app/app.routes.ts
- frontend/src/index.html

### 2. Gouvernance crawl et indexation
- Creer robots.txt.
- Generer sitemap.xml avec uniquement les URLs publiques indexables.
- Declarer le sitemap dans robots.txt.

Fichiers cibles:
- public/index.php
- public/.htaccess
- .htaccess

### 3. Canonicalisation des URLs
- Choisir une seule forme d URL publique par page.
- Rediriger en 301 les variantes vers la version canonique.
- Eviter les doublons entre /project02/, /project02/public/app/ et routes frontend.

Fichiers cibles:
- .htaccess
- public/.htaccess
- public/index.php

Livrables:
- pages publiques avec title/description/canonical;
- pages privees exclues de l index;
- robots.txt + sitemap.xml operationnels;
- reduction des duplications d URLs.

## Phase 2 - SEO e-commerce (4 a 7 jours)

### 1. Donnees structurees JSON-LD
- Organization sur la home.
- Product sur les fiches produit.
- BreadcrumbList sur catalogue et fiches.

### 2. Open Graph et partage social
- Open Graph et Twitter Card dynamiques.
- Image par defaut + image produit lorsque disponible.

### 3. Contenu crawlable de qualite
- Verifier que le contenu principal des pages publiques est disponible rapidement.
- Renforcer les textes de categories/produits (qualite editoriale, unicite).

Fichiers cibles:
- frontend/src/app/app.routes.ts
- frontend/src/index.html
- public/index.php

Livrables:
- snippets enrichis potentiels (Product/Breadcrumb);
- meilleure comprehension des pages par les moteurs;
- gain de qualite sur les pages catalogue/produit.

## Phase 3 - Impact maximal (2 a 4 semaines)

### 1. Rendu serveur ou prerender des pages publiques
Cibles prioritaires:
- /home
- /catalogue
- /produit/:id
- /boutique/:id

### 2. Maintien SPA classique pour les zones connectees
- login/register
- panier/commande
- admin/artisan

### 3. Rationalisation des URLs de production
- converger vers des URLs propres cote public;
- limiter les redirections multiples;
- aligner routing serveur + Angular.

Fichiers et notes a reviser:
- docs/production-front-controller-note.md
- public/index.php
- .htaccess
- public/.htaccess

Livrables:
- HTML utile renvoye des le premier chargement sur pages SEO;
- crawl plus fiable;
- base solide pour Core Web Vitals.

## Plan de mesure

### Search Console / Bing Webmaster Tools
- couverture indexation;
- erreurs d exploration;
- performance par requete et par page.

### Performance
- Lighthouse SEO;
- Core Web Vitals: LCP, INP, CLS;
- monitoring des 404/301/500.

### Logs backend
- analyse des passages bots;
- verification des chemins reels explores;
- detection des boucles de redirection.

## Plan d execution conseille

1. Executer la Phase 1 sans modification lourde de runtime.
2. Enchainer la Phase 2 sur catalogue + produit.
3. Mesurer les gains pendant 2 semaines.
4. Decider ensuite la profondeur SSR/prerender pour la Phase 3.

## Criteres d acceptation globaux

- Aucun parcours metier critique ne regresse (auth, panier, commande, admin/artisan).
- Les pages privees ne sont pas indexees.
- Une seule URL canonique par ressource indexable.
- Sitemap conforme et soumis en outils webmaster.
- Le trafic organique et la couverture indexable progressent de facon mesurable.
