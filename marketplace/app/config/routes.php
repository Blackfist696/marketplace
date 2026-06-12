<?php

/**
 * Registre central des routes HTTP du backend.
 *
 * Chaque endpoint est associé à un handler de type Controller@action et, si besoin,
 * à une pile de middlewares (authentification, rôles, validation de requête,
 * limitation de requêtes). Ce fichier constitue la carte des API et des pages
 * backend du projet.
 */

use App\Core\ControllerActionInvoker;
use App\Middleware\AuthMiddleware;
use App\Middleware\QueryValidationMiddleware;
use App\Middleware\RoleMiddleware;
use App\Security\Middleware\LoginRateLimitMiddleware;
use App\Security\RateLimit\SlidingWindowLimiter;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return function (App $app): void {
    // Invoker unique: convertit les handlers texte Controller@action en appels PHP.
    $invoker = new ControllerActionInvoker();

    // CORS preflight handler for all routes
    $app->options('/{routes:.+}', function (Request $request, Response $response): Response {
        return $response;
    });

    $register = static function (array|string $methods, string $path, string $handler, array $middlewares = []) use ($app, $invoker): void {
        // Wrapping standard Slim -> invoker pour homogeniser le dispatch.
        $route = $app->map((array) $methods, $path, function (Request $request, Response $response, array $args) use ($invoker, $handler): Response {
            return $invoker->invoke($request, $response, $handler, $args);
        });

        // Les middlewares de route sont ajoutes en ordre inverse pour respecter
        // l'ordre declare dans le tableau (plus intuitif pour la lecture).
        foreach (array_reverse($middlewares) as $middleware) {
            $route->add($middleware);
        }
    };

    $auth = new AuthMiddleware();
    $artisanRole = new RoleMiddleware([2]);
    $clientRole = new RoleMiddleware([3]);
    $adminRole = new RoleMiddleware([1]);
    $clientOrAdminRole = new RoleMiddleware([1, 3]);

    $paymentQueryValidation = new QueryValidationMiddleware([
        'id_commande' => ['type' => 'int', 'min' => 1, 'required' => true],
    ]);

    $artisanStatsQueryValidation = new QueryValidationMiddleware(
        [
            'date_debut' => ['type' => 'date'],
            'date_fin' => ['type' => 'date'],
            'id_produit' => ['type' => 'int', 'min' => 1],
            'id_client' => ['type' => 'int', 'min' => 1],
        ],
        [
            ['type' => 'date_order', 'from' => 'date_debut', 'to' => 'date_fin'],
        ]
    );

    $artisanOrdersQueryValidation = new QueryValidationMiddleware(
        [
            'date_debut' => ['type' => 'date'],
            'date_fin' => ['type' => 'date'],
            'id_produit' => ['type' => 'int', 'min' => 1],
            'id_client' => ['type' => 'int', 'min' => 1],
            'id_commande' => ['type' => 'int', 'min' => 1],
        ],
        [
            ['type' => 'date_order', 'from' => 'date_debut', 'to' => 'date_fin'],
        ]
    );

    $adminStatsQueryValidation = new QueryValidationMiddleware(
        [
            'date_debut' => ['type' => 'date'],
            'date_fin' => ['type' => 'date'],
            'id_produit' => ['type' => 'int', 'min' => 1],
            'id_artisan' => ['type' => 'int', 'min' => 1],
            'id_client' => ['type' => 'int', 'min' => 1],
            'nom' => ['type' => 'string', 'minLength' => 1, 'maxLength' => 120],
        ],
        [
            ['type' => 'date_order', 'from' => 'date_debut', 'to' => 'date_fin'],
        ]
    );
    $securityConfig = require __DIR__ . '/app.php';
    $rateConfig = (array) ($securityConfig['security']['rate_limit'] ?? []);
    // Middleware anti brute-force specialement cible sur POST /login.
    $loginRateLimit = new LoginRateLimitMiddleware(
        new SlidingWindowLimiter(),
        (int) ($rateConfig['login_max_attempts'] ?? 5),
        (int) ($rateConfig['login_window_seconds'] ?? 300)
    );

    $register('GET', '/', 'App\\Controllers\\HomeController@index');
    $register('GET', '/Home', 'App\\Controllers\\HomeController@index');

    $register('GET', '/login', 'App\\Controllers\\AuthController@loginForm');
    $register('POST', '/login', 'App\\Controllers\\AuthController@login', [$loginRateLimit]);
    $register('POST', '/logout', 'App\\Controllers\\AuthController@logout', [$auth]);
    $register('GET', '/register', 'App\\Controllers\\AuthController@registerForm');
    $register('POST', '/register', 'App\\Controllers\\AuthController@register');

    $register('GET', '/categories', 'App\\Controllers\\CategorieController@index');
    $register('GET', '/categories/{id}', 'App\\Controllers\\CategorieController@show');

    $register('GET', '/artisans', 'App\\Controllers\\ArtisanController@index');
    $register('GET', '/artisans/{id}', 'App\\Controllers\\ArtisanController@show');

    $register('GET', '/products', 'App\\Controllers\\ProductController@index');
    $register('GET', '/products/{id}', 'App\\Controllers\\ProductController@show');
    $register('GET', '/artisans/{artisan_id}/products', 'App\\Controllers\\ProductController@indexByArtisan');
    $register('POST', '/products', 'App\\Controllers\\ProductController@store', [$artisanRole]);
    $register('PUT', '/products/{id}', 'App\\Controllers\\ProductController@update', [$artisanRole]);
    $register('DELETE', '/products/{id}', 'App\\Controllers\\ProductController@destroy', [$artisanRole]);

    $register('GET', '/cart', 'App\\Controllers\\CartController@index');
    $register('POST', '/cart', 'App\\Controllers\\CartController@add');
    $register('PUT', '/cart/{id_produit}', 'App\\Controllers\\CartController@updateLine');
    $register('DELETE', '/cart/{id_produit}', 'App\\Controllers\\CartController@remove');

    $register('GET', '/payment', 'App\\Controllers\\PaymentController@page', [$auth, $paymentQueryValidation]);
    $register('POST', '/payment/process', 'App\\Controllers\\PaymentController@process', [$auth]);

    $register('GET', '/orders', 'App\\Controllers\\OrderController@index', [$clientRole]);
    $register('GET', '/orders/{id}', 'App\\Controllers\\OrderController@show', [$clientRole]);
    $register('POST', '/orders', 'App\\Controllers\\OrderController@store', [$clientRole]);
    $register('DELETE', '/orders/{id}', 'App\\Controllers\\OrderController@destroy', [$clientOrAdminRole]);

    $register('GET', '/profile', 'App\\Controllers\\ProfileController@show', [$auth]);
    $register('PUT', '/profile', 'App\\Controllers\\ProfileController@update', [$auth]);
    $register('DELETE', '/profile', 'App\\Controllers\\ProfileController@deactivate', [$auth]);

    $register('GET', '/artisan/products', 'App\\Controllers\\ArtisanController@myProducts', [$artisanRole]);
    $register('GET', '/artisan/dashboard', 'App\\Controllers\\ArtisanController@dashboard', [$artisanRole]);
    $register('GET', '/artisan/orders', 'App\\Controllers\\ArtisanController@orders', [$artisanRole, $artisanOrdersQueryValidation]);
    $register('GET', '/artisan/stats', 'App\\Controllers\\ArtisanController@stats', [$artisanRole, $artisanStatsQueryValidation]);

    $register('GET', '/admin/users', 'App\\Controllers\\AdminController@users', [$adminRole]);
    $register('POST', '/admin/users', 'App\\Controllers\\AdminController@createUser', [$adminRole]);
    $register('GET', '/admin/users/{id}', 'App\\Controllers\\AdminController@showUser', [$adminRole]);
    $register('PUT', '/admin/users/{id}', 'App\\Controllers\\AdminController@updateUser', [$adminRole]);
    $register('DELETE', '/admin/users/{id}', 'App\\Controllers\\AdminController@deactivateUser', [$adminRole]);
    $register('GET', '/admin/artisans', 'App\\Controllers\\AdminController@artisans', [$adminRole]);
    $register('POST', '/admin/artisans', 'App\\Controllers\\AdminController@createArtisan', [$adminRole]);
    $register('GET', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@showArtisan', [$adminRole]);
    $register('PUT', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@updateArtisan', [$adminRole]);
    $register('DELETE', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@deactivateArtisan', [$adminRole]);
    $register('GET', '/admin/orders', 'App\\Controllers\\AdminController@orders', [$adminRole]);
    $register('GET', '/admin/orders/{id}', 'App\\Controllers\\AdminController@showOrder', [$adminRole]);
    $register('PUT', '/admin/orders/{id}', 'App\\Controllers\\AdminController@updateOrder', [$adminRole]);
    $register('GET', '/admin/categories', 'App\\Controllers\\AdminController@categories', [$adminRole]);
    $register('PUT', '/admin/categories/bulk', 'App\\Controllers\\AdminController@updateCategoriesBulk', [$adminRole]);
    $register('PUT', '/admin/categories/all', 'App\\Controllers\\AdminController@updateAllCategories', [$adminRole]);
    $register('PUT', '/admin/categories/{id}', 'App\\Controllers\\AdminController@updateCategory', [$adminRole]);
    $register('GET', '/admin/products', 'App\\Controllers\\AdminController@products', [$adminRole]);
    $register('PUT', '/admin/products/{id}', 'App\\Controllers\\AdminController@updateProduct', [$adminRole]);
    $register('DELETE', '/admin/products/{id}', 'App\\Controllers\\AdminController@deactivateProduct', [$adminRole]);
    $register('GET', '/admin/stats', 'App\\Controllers\\AdminController@stats', [$adminRole, $adminStatsQueryValidation]);

    $register('GET', '/api/pays', 'App\\Controllers\\PaysController@index');
    $register('GET', '/api/pays/{id}', 'App\\Controllers\\PaysController@show');
    $register('POST', '/api/pays', 'App\\Controllers\\PaysController@store', [$adminRole]);
    $register('PUT', '/api/pays/{id}', 'App\\Controllers\\PaysController@update', [$adminRole]);
    $register('DELETE', '/api/pays/{id}', 'App\\Controllers\\PaysController@destroy', [$adminRole]);

    $register('GET', '/api/villes', 'App\\Controllers\\VilleController@index');
    $register('GET', '/api/villes/{id}', 'App\\Controllers\\VilleController@show');
    $register('POST', '/api/villes', 'App\\Controllers\\VilleController@store', [$adminRole]);
    $register('PUT', '/api/villes/{id}', 'App\\Controllers\\VilleController@update', [$adminRole]);
    $register('DELETE', '/api/villes/{id}', 'App\\Controllers\\VilleController@destroy', [$adminRole]);

    $register('GET', '/api/avis', 'App\\Controllers\\AvisController@index');
    $register('GET', '/api/avis/{id}', 'App\\Controllers\\AvisController@show');
    $register('GET', '/api/produits/{id_produit}/avis', 'App\\Controllers\\AvisController@indexByProduit');
    $register('POST', '/api/avis', 'App\\Controllers\\AvisController@store', [$auth]);
    $register('PUT', '/api/avis/{id}', 'App\\Controllers\\AvisController@update', [$auth]);
    $register('DELETE', '/api/avis/{id}', 'App\\Controllers\\AvisController@destroy', [$auth]);

    // MVP AI: proxy backend vers Ollama local (auth obligatoire pour limiter l'abus).
    $register('POST', '/api/ai/chat', 'App\\Controllers\\AiController@chat', [$auth]);

    $register('GET', '/api/paiements', 'App\\Controllers\\PaiementApiController@index', [$auth]);
    $register('GET', '/api/paiements/{id}', 'App\\Controllers\\PaiementApiController@show', [$auth]);
    $register('POST', '/api/paiements', 'App\\Controllers\\PaiementApiController@store', [$auth]);
    $register('PUT', '/api/paiements/{id}', 'App\\Controllers\\PaiementApiController@update', [$auth]);
    $register('DELETE', '/api/paiements/{id}', 'App\\Controllers\\PaiementApiController@destroy', [$auth]);

    $register('GET', '/api/classes', 'App\\Controllers\\ClasseController@index');
    $register('GET', '/api/categories/{id_categorie}/classes', 'App\\Controllers\\ClasseController@indexByCategorie');
    $register('GET', '/api/produits/{id_produit}/classes', 'App\\Controllers\\ClasseController@indexByProduit');
    $register('POST', '/api/classes', 'App\\Controllers\\ClasseController@store', [$adminRole]);
    $register('DELETE', '/api/classes/{id_categorie}/{id_produit}', 'App\\Controllers\\ClasseController@destroy', [$adminRole]);

    $register('GET', '/api/user-addresses', 'App\\Controllers\\UserAddressController@index', [$auth]);
    $register('GET', '/api/utilisateurs/{id_utilisateur}/adresses', 'App\\Controllers\\UserAddressController@indexByUtilisateur', [$auth]);
    $register('GET', '/api/adresses/{id_adresse}/utilisateurs', 'App\\Controllers\\UserAddressController@indexByAdresse', [$adminRole]);
    $register('POST', '/api/user-addresses', 'App\\Controllers\\UserAddressController@store', [$auth]);    $register('PUT', '/api/user-addresses/{id_utilisateur}/{id_adresse}', 'App\Controllers\UserAddressController@update', [$auth]);    $register('DELETE', '/api/user-addresses/{id_utilisateur}/{id_adresse}', 'App\\Controllers\\UserAddressController@destroy', [$auth]);

    $register('GET', '/api/lignes-commandes', 'App\\Controllers\\LigneCommandeController@index', [$auth]);
    $register('GET', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@show', [$auth]);
    $register('GET', '/api/commandes/{id_commande}/lignes', 'App\\Controllers\\LigneCommandeController@indexByCommande', [$auth]);
    $register('POST', '/api/lignes-commandes', 'App\\Controllers\\LigneCommandeController@store', [$auth]);
    $register('PUT', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@update', [$auth]);
    $register('DELETE', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@destroy', [$auth]);

    $register('GET', '/api/statistiques-artisans', 'App\\Controllers\\StatistiqueArtisanController@index', [$adminRole]);
    $register('GET', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@show', [$adminRole]);
    $register('GET', '/api/artisans/{id_artisan}/statistiques', 'App\\Controllers\\StatistiqueArtisanController@indexByArtisan', [$artisanRole]);
    $register('GET', '/api/artisan/consultations', 'App\\Controllers\\StatistiqueArtisanController@indexCurrentArtisan', [$artisanRole]);
    $register('POST', '/api/statistiques-artisans', 'App\\Controllers\\StatistiqueArtisanController@store');
    $register('PUT', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@update', [$adminRole]);
    $register('DELETE', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@destroy', [$adminRole]);
};