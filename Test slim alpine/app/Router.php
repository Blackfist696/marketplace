<?php

declare(strict_types=1);

namespace App;

use App\Controllers\CartController;
use App\Controllers\HomeController;
use App\Controllers\ProductController;
use App\Middleware\CorsMiddleware;
use App\Models\ProductRepository;
use Slim\App;
use Slim\Routing\RouteCollectorProxy;

/**
 * Classe de routage - définit toutes les routes de l'application
 */
class Router
{
    public static function register(App $app): void
    {
        // Instancier le repository une seule fois
        $repo = new ProductRepository();

        // Middleware global
        $app->add(new CorsMiddleware());

        // OPTIONS preflight
        $app->options('/{routes:.+}', function ($request, $response) {
            return $response;
        });

        // ── Page principale ─────────────────────────────────────────────
        $app->get('/', function ($request, $response) use ($repo) {
            return (new HomeController($repo))->index($request, $response);
        });

        // ── API Produits ─────────────────────────────────────────────────
        $app->group('/api', function (RouteCollectorProxy $group) use ($repo) {

            // Produits
            $group->get('/products', function ($req, $res) use ($repo) {
                return (new ProductController($repo))->index($req, $res);
            });
            $group->get('/products/featured', function ($req, $res) use ($repo) {
                return (new ProductController($repo))->featured($req, $res);
            });
            $group->get('/products/{id:[0-9]+}', function ($req, $res, $args) use ($repo) {
                return (new ProductController($repo))->show($req, $res, $args);
            });
            $group->get('/categories', function ($req, $res) use ($repo) {
                return (new ProductController($repo))->categories($req, $res);
            });

            // Panier
            $group->get('/cart', function ($req, $res) use ($repo) {
                return (new CartController($repo))->index($req, $res);
            });
            $group->post('/cart/add', function ($req, $res) use ($repo) {
                return (new CartController($repo))->add($req, $res);
            });
            $group->put('/cart/{id:[0-9]+}', function ($req, $res, $args) use ($repo) {
                return (new CartController($repo))->update($req, $res, $args);
            });
            $group->delete('/cart/{id:[0-9]+}', function ($req, $res, $args) use ($repo) {
                return (new CartController($repo))->remove($req, $res, $args);
            });
            $group->delete('/cart', function ($req, $res) use ($repo) {
                return (new CartController($repo))->clear($req, $res);
            });
        });
    }
}
