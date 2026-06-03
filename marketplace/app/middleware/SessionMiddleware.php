<?php

namespace App\Middleware;

use App\Security\SessionSecurity;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Initialise la session HTTP selon les parametres de securite applicatifs.
 */
final class SessionMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // Charge la politique session (cookies secure/httponly/samesite, etc.)
        // depuis la config applicative centralisee.
        $config = require __DIR__ . '/../config/app.php';

        // start() est idempotent: ne redemarre pas la session si deja active.
        SessionSecurity::start($config['security']['session'] ?? []);

        return $handler->handle($request);
    }
}
