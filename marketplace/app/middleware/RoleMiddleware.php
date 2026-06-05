<?php

namespace App\Middleware;

use App\Core\JsonResponder;
use App\Models\Utilisateur;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

require_once __DIR__ . '/../models/UtilisateurModel.php';

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
        // Le role ne peut etre verifie que si l'utilisateur est authentifie.
        if (empty($_SESSION['user_id'])) {
            return JsonResponder::write($this->createResponse(), 401, [
                'status' => 401,
                'message' => 'Authentification requise',
            ]);
        }

        $roleId = (int) ($_SESSION['user_role'] ?? 0);
        if ($roleId <= 0) {
            $user = Utilisateur::getById((int) $_SESSION['user_id']);
            $roleId = (int) ($user['id_role'] ?? 0);

            if ($roleId > 0) {
                $_SESSION['user_role'] = $roleId;
            }
        }

        // Convention projet: role 1 = admin, bypass de toutes les restrictions de role.
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
