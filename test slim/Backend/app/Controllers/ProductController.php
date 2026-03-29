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
        // HTML view removed — use /api/products
        $payload = json_encode(['error' => 'HTML views removed, use /api/products'], JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8')->withStatus(410);
    }

    // API: récupérer tous les produits en JSON
    public function apiIndex(Request $request, Response $response): Response
    {
        $rawProducts = Product::getAllProducts();
        $products = array_map(function($p) {
            return [
                'id' => $p->getId(),
                'name' => $p->getName(),
                'category' => $p->getCategory(),
                'price' => $p->getPrice(),
                'description' => $p->getDescription()
            ];
        }, $rawProducts);

        $cart = new Cart();
        $rawCart = $cart->getCartItems();
        $cartItems = [];
        foreach ($rawCart as $id => $item) {
            $prod = $item['product'];
            $cartItems[$id] = [
                'product' => [
                    'id' => $prod->getId(),
                    'name' => $prod->getName(),
                    'category' => $prod->getCategory(),
                    'price' => $prod->getPrice(),
                    'description' => $prod->getDescription()
                ],
                'quantity' => $item['quantity']
            ];
        }

        $data = [
            'products' => $products,
            'cart' => $cartItems
        ];
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }

    public function addToCart(Request $request, Response $response, array $args): Response
    {
        $productId = (int)$args['id'];
        $cart = new Cart();
        $cart->addProduct($productId);
        $rawCart = $cart->getCartItems();
        $cartItems = [];
        foreach ($rawCart as $id => $item) {
            $prod = $item['product'];
            $cartItems[$id] = [
                'product' => [
                    'id' => $prod->getId(),
                    'name' => $prod->getName(),
                    'category' => $prod->getCategory(),
                    'price' => $prod->getPrice(),
                    'description' => $prod->getDescription()
                ],
                'quantity' => $item['quantity']
            ];
        }

        $data = ['success' => true, 'cart' => $cartItems];
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }

    public function removeFromCart(Request $request, Response $response, array $args): Response
    {
        $productId = (int)$args['id'];
        $cart = new Cart();
        $cart->removeProduct($productId);

        $rawCart = $cart->getCartItems();
        $cartItems = [];
        foreach ($rawCart as $id => $item) {
            $prod = $item['product'];
            $cartItems[$id] = [
                'product' => [
                    'id' => $prod->getId(),
                    'name' => $prod->getName(),
                    'category' => $prod->getCategory(),
                    'price' => $prod->getPrice(),
                    'description' => $prod->getDescription()
                ],
                'quantity' => $item['quantity']
            ];
        }

        $data = ['success' => true, 'cart' => $cartItems];
        $payload = json_encode($data, JSON_UNESCAPED_UNICODE);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json; charset=utf-8');
    }
}
