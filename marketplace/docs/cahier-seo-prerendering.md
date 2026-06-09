# Cahier de référence SEO et prerendering – Marketplace

## 1. Objectif du document

Ce document décrit de façon claire et structurée toutes les modifications réalisées pour améliorer le référencement naturel (SEO) de la partie publique du projet Marketplace, ainsi que l’ajout du prerendering (génération HTML statique au moment du build).

L’objectif est de permettre à des personnes non techniques de comprendre :
- pourquoi cette amélioration a été faite ;
- ce qui a été modifié dans le projet ;
- comment cela fonctionne concrètement ;
- où les fichiers générés sont stockés et comment ils sont servis.

---

## 2. Mise à jour d’implémentation — 10 juin 2026

L’implémentation SEO et prerendering est désormais effective sur le projet. Les principaux gains livrés sont les suivants :
- pages publiques pré-rendues au build pour l’accueil, le catalogue, la connexion et l’inscription ;
- métadonnées SEO injectées dynamiquement selon la route ;
- structure de référencement de base disponible via robots.txt et sitemap.xml ;
- generation HTML statique validée dans le dossier de publication [../public/app](../public/app).

Cette mise à jour complète la phase de préparation SEO et pose les bases d’un référencement plus robuste pour la production.

## 3. Contexte du besoin

Le projet Marketplace est une application Angular moderne, dont la partie publique doit être visible par les moteurs de recherche comme Google, Bing ou Yahoo.

Avant cette amélioration, la plateforme fonctionnait principalement comme une application JavaScript dynamique. Cela posait plusieurs limites :
- les moteurs de recherche pouvaient avoir du mal à comprendre rapidement le contenu affiché ;
- certaines pages n’étaient pas facilement “lisibles” sans exécuter JavaScript ;
- les métadonnées de référencement (titre, description, URL canonique) n’étaient pas toujours suffisamment exploitable de façon stable.

Le besoin était donc double :
1. améliorer la visibilité dans les moteurs de recherche ;
2. rendre les pages publiques plus rapidement interprétables par les robots d’indexation.

---

## 3. Pourquoi ce choix a été fait

### 3.1 Pourquoi améliorer le SEO ?

Le SEO sert à aider les moteurs de recherche à comprendre :
- de quoi parle le site ;
- quelles pages sont importantes ;
- quelles pages doivent être indexées ;
- quel contenu doit être montré à l’utilisateur dans les résultats de recherche.

Dans le cas du Marketplace, cela concerne notamment :
- la page d’accueil ;
- le catalogue ;
- la page de connexion ;
- la page d’inscription.

### 3.2 Pourquoi ajouter le prerendering ?

Le prerendering consiste à générer à l’avance le HTML d’une page, avant qu’un utilisateur ne la demande.

Cela permet d’obtenir plusieurs avantages :
- une page est visible plus rapidement ;
- le contenu est déjà présent dans le code HTML envoyé au navigateur ;
- les moteurs de recherche voient un contenu “prêt à l’emploi” ;
- le site est plus robuste pour l’indexation et l’affichage sur des environnements plus limités.

En pratique, au lieu d’attendre que l’application charge complètement en JavaScript pour afficher le contenu, on produit une version HTML complète à l’avance.

---

## 4. Ce qui a été implémenté

### 4.1 Amélioration du référencement (SEO)

Les pages publiques ont reçu :
- un titre dynamique selon la page ;
- une description adaptée à chaque page ;
- une balise canonical afin d’éviter les doublons d’URL ;
- des balises Open Graph pour les partages sur les réseaux sociaux ;
- une balise de type WebSite en JSON-LD afin d’aider les moteurs de recherche à mieux comprendre la structure du site.

### 4.2 Ajout du prerendering

Le projet a été configuré pour générer en avance les pages publiques les plus importantes, au moment du build.

Les routes suivantes ont été rendues statiques ou pré-rendues :
- /home
- /catalogue
- /login
- /register
- / (redirigé vers /home)

D’autres routes, comme les pages avec paramètres dynamiques (produits, boutiques, panier), ont été traitées en rendu serveur, ce qui évite les erreurs liées aux données non disponibles au moment du build.

---

## 5. Fichiers modifiés et fichiers créés

### 5.1 Fichiers modifiés

| Fichier | Rôle |
|---|---|
| ../frontend/package.json | Ajout des dépendances Angular SSR et du script de lancement du serveur rendu. |
| ../frontend/angular.json | Configuration du build pour générer les fichiers SSR et le prerendering. |
| ../frontend/src/app/app.routes.ts | Ajout des métadonnées SEO par route (titre, description). |
| ../frontend/src/app/app.ts | Gestion dynamique du titre, description, canonical URL et métadonnées Open Graph. |
| ../frontend/src/app/pages/home/home.component.ts | Évite les appels API pendant le rendu serveur afin de ne pas casser le build. |
| ../frontend/src/app/pages/catalogue/catalogue.component.ts | Même logique de protection pour le catalogue. |
| ../frontend/src/index.html | Ajout des métadonnées SEO de base et du contenu SEO initial. |
| ../frontend/public/robots.txt | Ajout du fichier robots pour guider les moteurs de recherche. |
| ../frontend/public/sitemap.xml | Ajout du plan du site pour l’indexation. |

### 5.2 Fichiers créés

| Fichier | Rôle |
|---|---|
| ../frontend/src/main.server.ts | Point d’entrée du rendu serveur Angular. |
| ../frontend/src/server.ts | Serveur Node/Express utilisé pour exécuter l’application en SSR. |
| ../frontend/src/app/app.config.server.ts | Configuration spécifique au rendu serveur. |
| ../frontend/src/app/app.routes.server.ts | Définition des routes à prerendre et des routes à rendre au runtime. |

---

## 6. Le code modifié ou ajouté en détail

### 6.1 Configuration du build SSR

Le fichier [../frontend/angular.json](../frontend/angular.json) a été ajusté pour que le build Angular produise :
- un bundle de navigation côté navigateur ;
- un bundle de rendu serveur ;
- les pages HTML pré-générées pour les routes publiques.

Exemple conceptuel de configuration :

```json
{
  "outputPath": "../public/app",
  "server": "src/main.server.ts",
  "ssr": {
    "entry": "src/server.ts"
  }
}
```

### 6.2 Définition des routes à prerendre

Le fichier [../frontend/src/app/app.routes.server.ts](../frontend/src/app/app.routes.server.ts) indique quelles pages doivent être rendues de façon statique.

Exemple :

```ts
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'home', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'register', renderMode: RenderMode.Prerender },
  { path: 'catalogue', renderMode: RenderMode.Prerender },
  { path: 'produit/:id', renderMode: RenderMode.Server },
  { path: 'boutique/:id', renderMode: RenderMode.Server },
];
```

Cela signifie que :
- les pages simples et publiques sont générées à l’avance ;
- les pages dynamiques restent traitées au moment de la demande.

### 6.3 Injection des métadonnées SEO

Le fichier [../frontend/src/app/app.ts](../frontend/src/app/app.ts) ajoute dynamiquement les balises de référencement à chaque changement de page.

Exemple conceptuel :

```ts
this.title.setTitle(title);
this.meta.updateTag({ name: 'description', content: description });
this.meta.updateTag({ property: 'og:url', content: absoluteUrl });
this.setCanonicalUrl(absoluteUrl);
```

Cette logique sert à :
- donner un titre cohérent à chaque page ;
- fournir une description utile aux moteurs de recherche ;
- créer un lien canonique pour éviter les pages dupliquées ;
- préparer les données de partage social.

### 6.4 Protection des composants pendant le rendu serveur

Pour éviter que le rendu serveurs échoue, les composants de la page d’accueil et du catalogue ont été protégés.

Exemple dans [../frontend/src/app/pages/home/home.component.ts](../frontend/src/app/pages/home/home.component.ts) :

```ts
if (isPlatformServer(this.platformId)) {
  this.loading.set(false);
  return;
}
```

En clair : si la page est rendue côté serveur au moment du build, l’application n’essaie pas d’appeler l’API de façon bloquante, ce qui aurait provoqué des erreurs ou des temps d’attente trop longs.

### 6.5 Fichiers de référencement de base

Le fichier [../frontend/public/robots.txt](../frontend/public/robots.txt) indique aux robots d’exploration quelles pages peuvent être indexées.

Le fichier [../frontend/public/sitemap.xml](../frontend/public/sitemap.xml) référence les URLs importantes à indexer.

---

## 7. Comment cela fonctionne concrètement

### 7.1 Le parcours d’une page

Voici le chemin de fonctionnement de la solution :

1. Le développeur exécute la commande de build.
2. Angular génère :
   - le bundle navigateur ;
   - le bundle serveur ;
   - les pages HTML prérendues pour les routes publiques.
3. Les fichiers HTML générés sont écrits dans le dossier de sortie du projet.
4. Ces fichiers sont ensuite servis par le site web à partir du chemin public du projet.

### 7.2 Le chemin de publication

Le build produit les fichiers dans le dossier :

- ../public/app

Le site est ensuite accessible via l’URL de type :

- /project02/public/app/home

Ce chemin est important car il correspond à l’emplacement de publication de l’application sur l’environnement de production.

### 7.3 Ce que voit un moteur de recherche

Lorsqu’un moteur de recherche visite une page :
- il reçoit déjà une version HTML prête à lire ;
- il peut voir le titre, la description et les balises de structure ;
- il peut indexer la page plus efficacement.

En résumé, le site devient plus “compréhensible” dès la première visite technique.

---

## 8. Résultat obtenu

Les bénéfices attendus et observés sont les suivants :
- meilleur référencement général du site ;
- meilleur traitement des pages publiques par les moteurs de recherche ;
- pages plus rapides à rendre ;
- meilleure stabilité du build ;
- structure plus propre pour la diffusion sur environnement de production.

Le build a été vérifié avec succès :
- la génération du rendu serveur s’est exécutée correctement ;
- les routes publiques ont été prerendues ;
- le dossier de sortie a bien été créé dans le répertoire de publication du projet.

---

## 9. Explication simple pour un public non technique

Imaginons que le site soit un magasin physique.

Sans prerendering :
- on ouvre la vitrine ;
- il faut d’abord monter toute la boutique en interne ;
- le visiteur ne voit pas immédiatement l’affichage complet.

Avec prerendering :
- on prépare à l’avance la vitrine complète ;
- lorsqu’un visiteur arrive, il voit immédiatement le contenu prêt ;
- les moteurs de recherche peuvent aussi “lire” directement la vitrine.

Dans le cas du Marketplace, cela veut dire que les pages importantes sont déjà prêtes à être lues et indexées sans attendre que tout le JavaScript se charge.

---

## 10. Limites et points d’attention

Cette solution est très utile, mais elle n’est pas adaptée à tout type de contenu.

Elle doit être utilisée avec prudence pour :
- les pages très dynamiques ;
- les contenus dépendant d’une session utilisateur ;
- les données qui changent très souvent et ne doivent pas être figées au build.

Pour cette raison, certaines routes du projet ont été traitées en rendu serveur “à la demande” plutôt qu’en prerendering pur.

---

## 11. Conclusion

L’ajout du SEO et du prerendering répond à un besoin clair : rendre le Marketplace plus visible, plus compréhensible pour les moteurs de recherche et plus performant à l’ouverture des pages publiques.

Cette solution est particulièrement pertinente pour un projet qui veut :
- améliorer son image en ligne ;
- gagner en visibilité ;
- proposer une expérience plus fluide ;
- préparer une bonne diffusion sur un environnement de production.

En pratique, ce travail a permis de transformer le projet d’une simple application web interactive en une application plus robuste, plus indexable et plus adaptée à un usage public et commercial.
