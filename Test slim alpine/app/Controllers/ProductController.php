<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\ProductRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Contrôleur Produits - gère listing, détail, recherche, filtres
 */
class ProductController extends BaseController
{
    public function __construct(
        private ProductRepository $repository
    ) {}

    /** GET /api/products */
    public function index(Request $request, Response $response): Response
    {
        $params   = $request->getQueryParams();
        $category = $params['category'] ?? null;
        $search   = $params['search'] ?? null;

        if ($search) {
            $products = $this->repository->search($search);
        } elseif ($category && $category !== 'all') {
            $products = $this->repository->findByCategory($category);
        } else {
            $products = $this->repository->findAll();
        }

        return $this->json($response, [
            'success'  => true,
            'count'    => count($products),
            'products' => array_map(fn($p) => $p->toArray(), $products),
        ]);
    }

    /** GET /api/products/{id} */
    public function show(Request $request, Response $response, array $args): Response
    {
        $product = $this->repository->findById((int) $args['id']);

        if (!$product) {
            return $this->json($response, [
                'success' => false,
                'message' => 'Produit introuvable',
            ], 404);
        }

        return $this->json($response, [
            'success' => true,
            'product' => $product->toArray(),
        ]);
    }

    /** GET /api/categories */
    public function categories(Request $request, Response $response): Response
    {
        return $this->json($response, [
            'success'    => true,
            'categories' => $this->repository->getCategories(),
        ]);
    }

    /** GET /api/products/featured */
    public function featured(Request $request, Response $response): Response
    {
        $products = $this->repository->findFeatured();

        return $this->json($response, [
            'success'  => true,
            'products' => array_map(fn($p) => $p->toArray(), $products),
        ]);
    }
}
