<?php

namespace App\Middleware;

use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

final class RoleMiddleware implements MiddlewareInterface
{
    /**
     * @param int[] $allowedRoles
     */
    public function __construct(private array $allowedRoles)
    {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (empty($_SESSION['user_id'])) {
            return JsonResponder::write($this->createResponse(), 401, [
                'status' => 401,
                'message' => 'Authentification requise',
            ]);
        }

        $roleId = (int) ($_SESSION['user_role'] ?? 0);
        if ($roleId !== 1 && !in_array($roleId, $this->allowedRoles, true)) {
            return JsonResponder::write($this->createResponse(), 403, [
                'status' => 403,
                'message' => 'Acces interdit',
            ]);
        }

        return $handler->handle($request);
    }

    private function createResponse(): ResponseInterface
    {
        return new \Slim\Psr7\Response();
    }
}
