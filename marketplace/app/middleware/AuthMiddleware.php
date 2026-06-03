<?php

namespace App\Middleware;

use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Bloque l'acces aux routes protegees si l'utilisateur n'est pas connecte.
 */
final class AuthMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        // Convention projet: la presence de user_id en session signifie "utilisateur connecte".
        if (empty($_SESSION['user_id'])) {
            return JsonResponder::write($this->createResponse(), 401, [
                'status' => 401,
                'message' => 'Authentification requise',
            ]);
        }

        // Si authentifie, on passe simplement au middleware/handler suivant.
        return $handler->handle($request);
    }

    private function createResponse(): ResponseInterface
    {
        return new \Slim\Psr7\Response();
    }
}
