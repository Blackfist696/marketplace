## Guide d'utilisation - Épicerie BIO NATURE

### Lancer le site

```bash
cd c:\MAMP\htdocs\Projet02\SlimFramework
php -S localhost:8000
```

Puis accédez à: http://localhost:8000/

### Architecture du projet

Le site est entièrement développé en POO (Programmation Orientée Objet) suivant le pattern MVC (Model-View-Controller):

#### **Models** (Métier)
- **Product.php** : Gère la liste des 10 produits (5 fruits + 5 légumes)
- **Cart.php** : Gère le panier avec session PHP

#### **Controllers** (Logique)
- **HomeController** : Page d'accueil
- **ProductController** : Affichage produits et gestion du panier
- **ContactController** : Page contact

#### **Views** (Présentation)
- **layout.php** : Template principal (HTML, CSS, navigation)
- **home.php** : Contenu de l'accueil
- **products.php** : Affichage produits et sidebar panier
- **contact.php** : Formulaire et infos contact

### Fonctionnalités implémentées

✅ **Page d'accueil**
- Présentation de l'épicerie BIO
- Engagement environnemental
- Lien vers la page produits

✅ **Page Produits**
- 5 fruits : Pommes, Bananes, Oranges, Fraises, Raisins
- 5 légumes : Tomates, Carottes, Laitue, Poivrons, Brocoli
- Ajouter/retirer du panier
- Panier persistant (session)
- Calcul automatique du total

✅ **Page Contact**
- Adresse, téléphone, email
- Horaires d'ouverture
- Formulaire de contact

### Technologie utilisée

- **PHP 8.0+**
- **Slim Framework 4** (micro-framework)
- **Session PHP** (persistance du panier)
- **POO 100%** (classes, interfaces)
- **CSS3 Responsive**

### Routes disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | / | Accueil |
| GET | /products | Liste produits |
| POST | /products/add/{id} | Ajouter au panier |
| POST | /products/remove/{id} | Retirer du panier |
| POST | /clear-cart | Vider le panier |
| GET | /contact | Page contact |
| POST | /send-contact | Envoyer un message |

### Configuration PSR-4

L'autoloading est configuré dans `composer.json`:
```json
"autoload": {
    "psr-4": {
        "App\\": "app/"
    }
}
```

Exécutez `composer dump-autoload` si vous modifiez les chemins de classe.

### Améliorations possibles

- Base de données au lieu de données statiques
- Authentification utilisateur
- Gestion des commandes
- Envoi d'emails
- Paiement en ligne
- Admin panel
