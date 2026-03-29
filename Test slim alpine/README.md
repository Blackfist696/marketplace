# TechStore — Mini site MVC PHP + Alpine.js

## Architecture

```
techstore/
├── app/
│   ├── Controllers/
│   │   ├── BaseController.php      ← Classe abstraite parente
│   │   ├── HomeController.php      ← Page d'accueil
│   │   ├── ProductController.php   ← API produits
│   │   └── CartController.php      ← API panier (session)
│   ├── Models/
│   │   ├── Product.php             ← Entité Produit
│   │   ├── Cart.php                ← Entité Panier
│   │   └── ProductRepository.php   ← Accès données (simule BDD)
│   ├── Middleware/
│   │   └── CorsMiddleware.php      ← CORS pour l'API
│   ├── Views/
│   │   └── home.php                ← Vue principale avec Alpine.js
│   └── Router.php                  ← Enregistrement des routes
├── config/
│   └── AppConfig.php               ← Configuration centrale
├── public/
│   ├── index.php                   ← Point d'entrée (bootstrap Slim)
│   └── .htaccess                   ← Réécriture Apache
└── composer.json
```

## Stack technique

| Côté | Technologie | Rôle |
|------|-------------|------|
| Backend | PHP 8.1+ / Slim 4 | Framework MVC micro |
| Frontend | Alpine.js 3 | Réactivité JS légère |
| Styles | CSS vanilla (variables) | Design system dark |
| Architecture | MVC + POO pure | Tout en classes |
| Données | Repository pattern | Simulé (prêt BDD) |
| API | REST JSON | Produits + Panier |

## Installation

```bash
# 1. Installer les dépendances
composer install

# 2. Lancer le serveur de développement
php -S localhost:8080 -t public/

# 3. Ouvrir dans le navigateur
open http://localhost:8080
```

## Routes API

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | `/` | Page principale |
| GET | `/api/products` | Tous les produits |
| GET | `/api/products?category=laptops` | Par catégorie |
| GET | `/api/products?search=macbook` | Recherche |
| GET | `/api/products/featured` | Produits mis en avant |
| GET | `/api/products/{id}` | Détail d'un produit |
| GET | `/api/categories` | Liste des catégories |
| GET | `/api/cart` | Contenu du panier |
| POST | `/api/cart/add` | Ajouter au panier |
| PUT | `/api/cart/{id}` | Modifier quantité |
| DELETE | `/api/cart/{id}` | Retirer du panier |
| DELETE | `/api/cart` | Vider le panier |

## Principes POO appliqués

- **Encapsulation** : propriétés privées + getters dans `Product`
- **Abstraction** : `BaseController` comme classe mère
- **Repository Pattern** : `ProductRepository` sépare logique données
- **Single Responsibility** : chaque classe a un seul rôle
- **Type declarations** : PHP 8.1 strict types partout
- **Immutabilité** : constructor promotion + readonly possible

## Fonctionnalités démo

- ✅ Catalogue 16 produits, 5 catégories
- ✅ Filtrage par catégorie (temps réel)
- ✅ Recherche full-text (debounced)
- ✅ Modal détail produit
- ✅ Panier persistant (session PHP + localStorage fallback)
- ✅ CRUD panier complet (ajouter, quantité, supprimer, vider)
- ✅ Notifications toast
- ✅ Design dark mode responsive
