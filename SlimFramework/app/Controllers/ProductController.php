<?php

namespace App\Controllers;

use App\Models\Product;
use App\Models\Cart;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ProductController
{
    public function index(Request $request, Response $response): Response
    {
        $products = Product::getAllProducts();
        $cart = new Cart();
        
        // Démarrer le buffering
        ob_start();
        
        // Variables pour la vue
        $pageTitle = 'Produits - Épicerie BIO NATURE';
        
        // Inclure le contenu
        include __DIR__ . '/../Views/products.php';
        $mainContent = ob_get_clean();
        
        // Démarrer le buffering pour le layout
        ob_start();
        include __DIR__ . '/../Views/layout.php';
        $output = ob_get_clean();
        
        $response->getBody()->write($output);
        return $response->withHeader('Content-Type', 'text/html; charset=utf-8');
    }

    public function addToCart(Request $request, Response $response, array $args): Response
    {
        $productId = (int)$args['id'];
        $cart = new Cart();
        $cart->addProduct($productId);

        return $response
            ->withStatus(302)
            ->withHeader('Location', app_url('/products'));
    }

    public function removeFromCart(Request $request, Response $response, array $args): Response
    {
        $productId = (int)$args['id'];
        $cart = new Cart();
        $cart->removeProduct($productId);

        return $response
            ->withStatus(302)
            ->withHeader('Location', app_url('/products'));
    }
}
