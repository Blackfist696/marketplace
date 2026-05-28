<?php

use App\Core\ControllerActionInvoker;
use App\Middleware\AuthMiddleware;
use App\Middleware\RoleMiddleware;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

return function (App $app): void {
    $invoker = new ControllerActionInvoker();

    // CORS preflight handler for all routes
    $app->options('/{routes:.+}', function (Request $request, Response $response): Response {
        return $response;
    });

    $register = static function (array|string $methods, string $path, string $handler, array $middlewares = []) use ($app, $invoker): void {
        $route = $app->map((array) $methods, $path, function (Request $request, Response $response, array $args) use ($invoker, $handler): Response {
            return $invoker->invoke($request, $response, $handler, $args);
        });

        foreach (array_reverse($middlewares) as $middleware) {
            $route->add($middleware);
        }
    };

    $auth = new AuthMiddleware();
    $artisanRole = new RoleMiddleware([2]);
    $clientRole = new RoleMiddleware([3]);
    $adminRole = new RoleMiddleware([1]);

    $register('GET', '/', 'App\\Controllers\\HomeController@index');

    $register('GET', '/login', 'App\\Controllers\\AuthController@loginForm');
    $register('POST', '/login', 'App\\Controllers\\AuthController@login');
    $register('POST', '/logout', 'App\\Controllers\\AuthController@logout', [$auth]);
    $register('GET', '/register', 'App\\Controllers\\AuthController@registerForm');
    $register('POST', '/register', 'App\\Controllers\\AuthController@register');

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

    $register('GET', '/payment', 'App\\Controllers\\PaymentController@page', [$auth]);
    $register('POST', '/payment/process', 'App\\Controllers\\PaymentController@process', [$auth]);

    $register('GET', '/orders', 'App\\Controllers\\OrderController@index', [$clientRole]);
    $register('GET', '/orders/{id}', 'App\\Controllers\\OrderController@show', [$clientRole]);
    $register('POST', '/orders', 'App\\Controllers\\OrderController@store', [$clientRole]);

    $register('GET', '/profile', 'App\\Controllers\\ProfileController@show', [$auth]);
    $register('PUT', '/profile', 'App\\Controllers\\ProfileController@update', [$auth]);
    $register('DELETE', '/profile', 'App\\Controllers\\ProfileController@deactivate', [$auth]);

    $register('GET', '/artisan/products', 'App\\Controllers\\ArtisanController@myProducts', [$artisanRole]);
    $register('GET', '/artisan/stats', 'App\\Controllers\\ArtisanController@stats', [$artisanRole]);

    $register('GET', '/admin/users', 'App\\Controllers\\AdminController@users', [$adminRole]);
    $register('GET', '/admin/users/{id}', 'App\\Controllers\\AdminController@showUser', [$adminRole]);
    $register('PUT', '/admin/users/{id}', 'App\\Controllers\\AdminController@updateUser', [$adminRole]);
    $register('DELETE', '/admin/users/{id}', 'App\\Controllers\\AdminController@deactivateUser', [$adminRole]);
    $register('GET', '/admin/artisans', 'App\\Controllers\\AdminController@artisans', [$adminRole]);
    $register('GET', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@showArtisan', [$adminRole]);
    $register('PUT', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@updateArtisan', [$adminRole]);
    $register('DELETE', '/admin/artisans/{id}', 'App\\Controllers\\AdminController@deactivateArtisan', [$adminRole]);
    $register('GET', '/admin/products', 'App\\Controllers\\AdminController@products', [$adminRole]);
    $register('PUT', '/admin/products/{id}', 'App\\Controllers\\AdminController@updateProduct', [$adminRole]);
    $register('DELETE', '/admin/products/{id}', 'App\\Controllers\\AdminController@deactivateProduct', [$adminRole]);
    $register('GET', '/admin/stats', 'App\\Controllers\\AdminController@stats', [$adminRole]);

    $register('GET', '/api/pays', 'App\\Controllers\\PaysController@index');
    $register('GET', '/api/pays/{id}', 'App\\Controllers\\PaysController@show');
    $register('POST', '/api/pays', 'App\\Controllers\\PaysController@store');
    $register('PUT', '/api/pays/{id}', 'App\\Controllers\\PaysController@update');
    $register('DELETE', '/api/pays/{id}', 'App\\Controllers\\PaysController@destroy');

    $register('GET', '/api/villes', 'App\\Controllers\\VilleController@index');
    $register('GET', '/api/villes/{id}', 'App\\Controllers\\VilleController@show');
    $register('POST', '/api/villes', 'App\\Controllers\\VilleController@store');
    $register('PUT', '/api/villes/{id}', 'App\\Controllers\\VilleController@update');
    $register('DELETE', '/api/villes/{id}', 'App\\Controllers\\VilleController@destroy');

    $register('GET', '/api/avis', 'App\\Controllers\\AvisController@index');
    $register('GET', '/api/avis/{id}', 'App\\Controllers\\AvisController@show');
    $register('GET', '/api/produits/{id_produit}/avis', 'App\\Controllers\\AvisController@indexByProduit');
    $register('POST', '/api/avis', 'App\\Controllers\\AvisController@store', [$auth]);
    $register('PUT', '/api/avis/{id}', 'App\\Controllers\\AvisController@update', [$auth]);
    $register('DELETE', '/api/avis/{id}', 'App\\Controllers\\AvisController@destroy', [$auth]);

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
    $register('GET', '/api/adresses/{id_adresse}/utilisateurs', 'App\\Controllers\\UserAddressController@indexByAdresse', [$auth]);
    $register('POST', '/api/user-addresses', 'App\\Controllers\\UserAddressController@store', [$auth]);
    $register('DELETE', '/api/user-addresses/{id_utilisateur}/{id_adresse}', 'App\\Controllers\\UserAddressController@destroy', [$auth]);

    $register('GET', '/api/lignes-commandes', 'App\\Controllers\\LigneCommandeController@index', [$auth]);
    $register('GET', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@show', [$auth]);
    $register('GET', '/api/commandes/{id_commande}/lignes', 'App\\Controllers\\LigneCommandeController@indexByCommande', [$auth]);
    $register('POST', '/api/lignes-commandes', 'App\\Controllers\\LigneCommandeController@store', [$auth]);
    $register('PUT', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@update', [$auth]);
    $register('DELETE', '/api/lignes-commandes/{id}', 'App\\Controllers\\LigneCommandeController@destroy', [$auth]);

    $register('GET', '/api/statistiques-artisans', 'App\\Controllers\\StatistiqueArtisanController@index');
    $register('GET', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@show');
    $register('GET', '/api/artisans/{id_artisan}/statistiques', 'App\\Controllers\\StatistiqueArtisanController@indexByArtisan');
    $register('POST', '/api/statistiques-artisans', 'App\\Controllers\\StatistiqueArtisanController@store', [$adminRole]);
    $register('PUT', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@update', [$adminRole]);
    $register('DELETE', '/api/statistiques-artisans/{id}', 'App\\Controllers\\StatistiqueArtisanController@destroy', [$adminRole]);
};