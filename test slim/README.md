# Épicerie BIO NATURE - Site Web

Un site d'épicerie développé en PHP avec le framework Slim 4, suivant l'architecture MVC complète et entièrement orientée objet.

## Structure du Projet

```
SlimFramework/
├── app/
│   ├── Controllers/
│   │   ├── HomeController.php       # Contrôleur pour la page d'accueil
│   │   ├── ProductController.php    # Contrôleur pour les produits et le panier
│   │   └── ContactController.php    # Contrôleur pour la page contact
│   ├── Models/
│   │   ├── Product.php              # Modèle des produits
│   │   └── Cart.php                 # Modèle du panier (gestion session)
│   ├── Views/
│   │   ├── layout.php               # Template HTML principal
│   │   ├── home.php                 # Vue de l'accueil
│   │   ├── products.php             # Vue des produits et panier
│   │   └── contact.php              # Vue du contact
│   └── bootstrap.php                # Autoloader personnalisé
├── vendor/                          # Dépendances Composer
├── public/                          # Assets publics (CSS, JS, images)
├── index.php                        # Point d'entrée de l'application
├── .htaccess                        # Configuration pour la réécriture d'URL
└── composer.json                    # Configuration des dépendances
```

## Architecture MVC

### Models
- **Product.php** : Gestion des produits (15 articles : 5 fruits + 5 légumes + 5 articles supplémentaires)
  - Méthodes statiques pour récupérer tous les produits
  - Filtrage par catégorie
  - Récupération par ID

- **Cart.php** : Gestion d'un panier persévérent via session
  - Ajout/suppression de produits
  - Mise à jour des quantités
  - Calcul du total
  - Gestion du panier vide/complet

### Controllers
- **HomeController** : Affiche la page d'accueil avec présentation de l'épicerie
- **ProductController** : Gère l'affichage des produits et les opérations du panier
- **ContactController** : Affiche les informations de contact et le formulaire

### Views
- **layout.php** : Template principal avec navigation, header et footer
- **home.php** : Page d'accueil avec descriptif de l'épicerie
- **products.php** : Produits organisés par catégorie avec panier en sidebar
- **contact.php** : Infos de contact et formulaire de messagerie

## Fonctionnalités

✅ **Page Accueil**
- Présentation de l'épicerie
- Informations sur l'engagement bio
- Liens vers les autres pages

✅ **Page Produits**
- Affichage de 5 fruits et 5 légumes
- Panier en sidebar (mise à jour en temps réel)
- Ajouter/retirer des articles
- Calcul automatique du total
- Vider le panier

✅ **Page Contact**
- Coordonnées complètes de l'épicerie
- Horaires d'ouverture
- Formulaire de contact
- Liens réseaux sociaux

## Technologie

- **PHP 7.4+**
- **Slim Framework 4** : Micro-framework pour le routage
- **Session PHP** : Gestion du panier
- **POO** : Architecture complètement orientée objet
- **CSS3** : Styles responsifs intégrés aux vues

## Installation

1. Assurez-vous que Composer est installé
2. Installez les dépendances : `composer install`
3. Placez le projet dans votre dossier web (MAMP/htdocs)
4. Accédez à `http://localhost/Projet02/SlimFramework/`

## Routes

- `GET  /`              → Page d'accueil
- `GET  /products`      → Page produits
- `POST /products/add/{id}` → Ajouter au panier
- `POST /products/remove/{id}` → Retirer du panier
- `POST /clear-cart`    → Vider le panier
- `GET  /contact`       → Page de contact
- `POST /send-contact`  → Envoyer un message (placeholder)

## Auteurs

Ramy et Pascal

## License

MIT
