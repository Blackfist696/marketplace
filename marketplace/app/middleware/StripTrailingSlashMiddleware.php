<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Normalise les chemins entrants en retirant le slash final.
 *
 * Objectif: tolerer les redirects/normalisations Apache du type `/products`
 * -> `/products/` sans casser le matching Slim des routes declarees sans slash.
 */
final class StripTrailingSlashMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $uri = $request->getUri();
        $path = $uri->getPath();

        if ($path !== '/' && str_ends_with($path, '/')) {
            $normalizedPath = rtrim($path, '/');
            if ($normalizedPath === '') {
                $normalizedPath = '/';
            }

            $request = $request->withUri($uri->withPath($normalizedPath));
        }

        return $handler->handle($request);
    }
}
