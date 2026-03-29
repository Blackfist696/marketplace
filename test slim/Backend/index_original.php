<?php

use App\Controllers\HomeController;
use App\Controllers\ProductController;
use App\Controllers\ContactController;
use App\Models\Cart;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

// Autoloader Composer
require __DIR__ . '/vendor/autoload.php';

// Créer l'application Slim
$app = AppFactory::create();

// Ajouter Route Middleware
$app->addRoutingMiddleware();

// Ajouter Error Middleware
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

// Dossier public (assets, CSS, JS, images)
$app->get('/public/{path:.*}', function (Request $request, Response $response, array $args) {
    $file = __DIR__ . '/public/' . $args['path'];
    if (file_exists($file) && is_file($file)) {
        return $response
            ->withHeader('Content-Type', mime_content_type($file))
            ->withBody(new \Slim\Psr7\Stream(fopen($file, 'r')));
    }
    return $response->withStatus(404);
});

// ===== ROUTES =====

// Page d'accueil
$app->get('/', function (Request $request, Response $response) {
    $controller = new HomeController();
    return $controller->index($request, $response);
});

// Page produits
$app->get('/products', function (Request $request, Response $response) {
    $controller = new ProductController();
    return $controller->index($request, $response);
});

// Ajouter un produit au panier
$app->post('/products/add/{id}', function (Request $request, Response $response, array $args) {
    $controller = new ProductController();
    return $controller->addToCart($request, $response, $args);
});

// Retirer un produit du panier
$app->post('/products/remove/{id}', function (Request $request, Response $response, array $args) {
    $controller = new ProductController();
    return $controller->removeFromCart($request, $response, $args);
});

// Vider le panier
$app->post('/clear-cart', function (Request $request, Response $response) {
    $cart = new Cart();
    $cart->clearCart();
    return $response
        ->withStatus(302)
        ->withHeader('Location', '/products');
});

// Page contact
$app->get('/contact', function (Request $request, Response $response) {
    $controller = new ContactController();
    return $controller->index($request, $response);
});

// Envoyer un message de contact (placeholder)
$app->post('/send-contact', function (Request $request, Response $response) {
    // Récupérer les données du formulaire (facultatif)
    // Pour une version complete, ajouter la gestion des emails ici
    return $response
        ->withStatus(302)
        ->withHeader('Location', '/contact');
});

// Valider la commande (placeholder)
$app->get('/validate-order', function (Request $request, Response $response) {
    // Placeholder pour la validation de commande
    // Vous pouvez créer une vue pour afficher un message de confirmation
    $response->getBody()->write('<html><body><h1>Commande validée !</h1><p>Merci pour votre achat.</p><a href="/">Retour à l\'accueil</a></body></html>');
    return $response->withHeader('Content-Type', 'text/html');
});

// ----- Catch-all pour SPA Angular (servira `public/index.html` en production)
// Placer après les routes API. Pendant le développement vous utiliserez `ng serve`.
$app->get('/{routes:.+}', function ($request, $response, $args) {
    $file = __DIR__ . '/public/index.html';
    if (file_exists($file)) {
        $response->getBody()->write(file_get_contents($file));
        return $response->withHeader('Content-Type', 'text/html');
    }
    return $response->withStatus(404);
});

// Lancer l'application
$app->run();