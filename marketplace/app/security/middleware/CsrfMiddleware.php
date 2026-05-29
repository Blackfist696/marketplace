<?php

namespace App\Security\Middleware;

use App\Security\CsrfTokenManager;
use App\Security\SessionSecurity;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

require_once __DIR__ . '/AbstractSecurityMiddleware.php';

final class CsrfMiddleware extends AbstractSecurityMiddleware
{
    /**
     * @param string[] $exceptPaths
     */
    public function __construct(
        private CsrfTokenManager $tokenManager,
        private array $exceptPaths = [],
        private bool $enforce = true
    ) {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        SessionSecurity::start();

        $csrfToken = $this->tokenManager->getToken();
        $method = strtoupper($request->getMethod());
        $path = $request->getUri()->getPath();

        if ($this->requiresValidation($method, $path)) {
            $provided = $request->getHeaderLine('X-CSRF-Token');
            if ($this->enforce && !$this->tokenManager->isValid($provided)) {
                return $this->deny(419, 'Jeton CSRF invalide ou manquant');
            }
        }

        $response = $handler->handle($request);
        return $response->withHeader('X-CSRF-Token', $csrfToken);
    }

    private function requiresValidation(string $method, string $path): bool
    {
        if (in_array($method, ['GET', 'HEAD', 'OPTIONS'], true)) {
            return false;
        }

        if (empty($_SESSION['user_id'])) {
            return false;
        }

        foreach ($this->exceptPaths as $exceptPath) {
            if ($exceptPath === $path) {
                return false;
            }
        }

        return true;
    }
}
