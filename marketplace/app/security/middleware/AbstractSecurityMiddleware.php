<?php

namespace App\Security\Middleware;

use App\Core\AppLogger;
use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Base commune des middlewares de securite.
 *
 * Fournit une methode deny() standardisee pour repondre + journaliser.
 */
abstract class AbstractSecurityMiddleware implements MiddlewareInterface
{
    abstract public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;

    protected function deny(int $status, string $message, array $extra = []): ResponseInterface
    {
        $channel = match ($status) {
            401, 403 => 'access',
            429 => 'rate-limit',
            default => 'security',
        };

        AppLogger::log($channel, 'warning', $message, [
            'status' => $status,
            'method' => (string) ($_SERVER['REQUEST_METHOD'] ?? ''),
            'uri' => (string) ($_SERVER['REQUEST_URI'] ?? ''),
            'user_id' => (int) ($_SESSION['user_id'] ?? 0),
            'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
        ] + $extra);

        $payload = array_merge([
            'status' => $status,
            'message' => $message,
        ], $extra);

        return JsonResponder::write(new \Slim\Psr7\Response(), $status, $payload);
    }
}
