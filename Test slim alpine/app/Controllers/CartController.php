<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\Cart;
use App\Models\ProductRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Contrôleur Panier - ajouter, supprimer, modifier, vider
 */
class CartController extends BaseController
{
    private Cart $cart;

    public function __construct(
        private ProductRepository $repository
    ) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Restaurer le panier depuis la session
        $this->cart = new Cart();
        if (!empty($_SESSION['cart_items'])) {
            foreach ($_SESSION['cart_items'] as $item) {
                $product = $this->repository->findById($item['product']['id']);
                if ($product) {
                    $this->cart->addItem($product, $item['quantity']);
                }
            }
        }
    }

    private function saveSession(): void
    {
        $_SESSION['cart_items'] = $this->cart->getItems();
    }

    /** GET /api/cart */
    public function index(Request $request, Response $response): Response
    {
        return $this->json($response, [
            'success' => true,
            'cart'    => $this->cart->toArray(),
        ]);
    }

    /** POST /api/cart/add */
    public function add(Request $request, Response $response): Response
    {
        $body     = (array) $request->getParsedBody();
        $id       = (int) ($body['product_id'] ?? 0);
        $quantity = max(1, (int) ($body['quantity'] ?? 1));

        $product = $this->repository->findById($id);

        if (!$product) {
            return $this->json($response, [
                'success' => false,
                'message' => 'Produit introuvable',
            ], 404);
        }

        if (!$product->isInStock()) {
            return $this->json($response, [
                'success' => false,
                'message' => 'Produit en rupture de stock',
            ], 400);
        }

        $this->cart->addItem($product, $quantity);
        $this->saveSession();

        return $this->json($response, [
            'success' => true,
            'message' => 'Produit ajouté au panier',
            'cart'    => $this->cart->toArray(),
        ]);
    }

    /** DELETE /api/cart/{id} */
    public function remove(Request $request, Response $response, array $args): Response
    {
        $this->cart->removeItem((int) $args['id']);
        $this->saveSession();

        return $this->json($response, [
            'success' => true,
            'message' => 'Produit retiré du panier',
            'cart'    => $this->cart->toArray(),
        ]);
    }

    /** PUT /api/cart/{id} */
    public function update(Request $request, Response $response, array $args): Response
    {
        $body     = (array) $request->getParsedBody();
        $quantity = (int) ($body['quantity'] ?? 0);

        $this->cart->updateQuantity((int) $args['id'], $quantity);
        $this->saveSession();

        return $this->json($response, [
            'success' => true,
            'cart'    => $this->cart->toArray(),
        ]);
    }

    /** DELETE /api/cart */
    public function clear(Request $request, Response $response): Response
    {
        $this->cart->clear();
        $this->saveSession();

        return $this->json($response, [
            'success' => true,
            'message' => 'Panier vidé',
            'cart'    => $this->cart->toArray(),
        ]);
    }
}
