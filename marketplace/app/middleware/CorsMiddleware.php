<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Gere les en-tetes CORS et les requetes preflight OPTIONS.
 */
final class CorsMiddleware implements MiddlewareInterface
{
    // Whitelist explicite des origines frontend autorisees en dev.
    private const ALLOWED_ORIGINS = [
        'http://localhost:4200',
        'http://127.0.0.1:4200',
    ];

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $origin = $request->getHeaderLine('Origin');
        // Reflection controlee: on ne renvoie que les origines explicitement connues.
        $allowedOrigin = in_array($origin, self::ALLOWED_ORIGINS, true) ? $origin : '';

        if ($request->getMethod() === 'OPTIONS') {
            $response = new \Slim\Psr7\Response();
            return $this->addCorsHeaders($response, $allowedOrigin)->withStatus(204);
        }

        $response = $handler->handle($request);
        return $this->addCorsHeaders($response, $allowedOrigin);
    }

    private function addCorsHeaders(ResponseInterface $response, string $origin): ResponseInterface
    {
        if ($origin !== '') {
            // Necessaire pour les cookies de session cross-origin avec Angular dev server.
            $response = $response
                ->withHeader('Access-Control-Allow-Origin', $origin)
                ->withHeader('Access-Control-Allow-Credentials', 'true');
        }

        return $response
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
            ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token')
            ->withHeader('Access-Control-Expose-Headers', 'X-CSRF-Token')
            ->withHeader('Access-Control-Max-Age', '3600');
    }
}
