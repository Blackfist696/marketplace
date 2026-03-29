<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\ProductRepository;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

/**
 * Contrôleur d'accueil - page principale du magasin
 */
class HomeController extends BaseController
{
    public function __construct(
        private ProductRepository $repository
    ) {}

    public function index(Request $request, Response $response): Response
    {
        $featured   = $this->repository->findFeatured();
        $categories = $this->repository->getCategories();
        $allProducts = $this->repository->findAll();

        return $this->view($response, 'home', [
            'title'      => 'TechStore - Votre magasin informatique',
            'featured'   => array_map(fn($p) => $p->toArray(), $featured),
            'categories' => $categories,
            'products'   => array_map(fn($p) => $p->toArray(), $allProducts),
        ]);
    }
}
