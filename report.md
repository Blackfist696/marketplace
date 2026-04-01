# Rapport d'analyse du projet `marketplace`

## 1. Structure du projet

- `app/`
  - `autoload.php`
  - `controllers/`
  - `models/`
  - `view/`
  - `seed.php`
- `configs/`
  - `routes.php`
  - `databaseConfig.php`
- `public/`
  - `index.php`
- `test/`
  - `test.php`
- `composer.json`
- `vendor/`
- `sql/`

## 2. Composants principaux

### `app/models`

- `Database.php`
  - connexion PDO configurée via `configs/databaseConfig.php`
- `Model.php`
  - modèle parent abstrait
  - CRUD générique : `all`, `find`, `where`, `create`, `update`, `delete`, `save`
- Modèles enfants (héritent de `Model`)
  - `RoleModel.php`
  - `UtilisateurModel.php`
  - `PersonneModel.php`
  - `AdresseModel.php`
  - `TemplateCssModel.php`
  - `ArtisanModel.php`
  - `CategorieModel.php`
  - `ProduitModel.php`
  - `ImageProduitModel.php`
  - `PanierModel.php`
  - `LignePanierModel.php`
  - `CommandeModel.php`

### `app/controllers`

- `Controller.php`
  - classe parent
  - réponse JSON via `App\View\JsonView`
- contrôleurs fonctionnels
  - `HomeController.php`
  - `ProductController.php`
  - `CartController.php`
  - `OrderController.php`
  - `AuthController.php`

### `app/view`

- `JsonView.php`
  - renvoie les données au frontend en JSON

### `app/autoload.php`

- loader PSR-4 pour namespace `App\`
- prend en charge `App\Models\...` et `App\View\...`
- mappe `App\Models\X` vers `app/models/XModel.php`

## 3. Configuration et routage

- `composer.json`
  - dépendances : `slim/slim`, `slim/psr7`
  - autoload PSR-4 : `App\` → `app/`
- `configs/routes.php`
  - routes déclarées avec contrôleurs namespaced `App\Controllers\...`

## 4. Scripts utilitaires

### `app/seed.php`

- script de peuplement de test
- insère :
  - 2 rôles (`client`, `artisan`)
  - 5 utilisateurs clients
  - 5 profils clients
  - 1 artisan
  - 1 catégorie
  - 5 produits

### `test/test.php`

- script de validation basique
- vérifie :
  - `Role::getAll()`
  - `Utilisateur::getBy(email)`
  - `Personne::getBy(nom)`
  - `Produit::getAll()`
  - `JsonView::render()`
  - `HomeController::index()`
  - `ProductController::show()`

## 5. Résultats d'exécution

- `php app/seed.php` : exécution réussie, données ajoutées en base
- `php test/test.php` : succès complet

## 6. Notes techniques

- `public/index.php` inclut désormais `app/autoload.php`
- `app/controllers/Controller.php` utilise `App\View\JsonView` pour toutes les réponses
- la base est configurée via `configs/databaseConfig.php`
- l'architecture du projet est orientée MVC simple avec namespaces
