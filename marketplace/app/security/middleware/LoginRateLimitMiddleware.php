<?php

namespace App\Security\Middleware;

use App\Security\RateLimit\SlidingWindowLimiter;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

require_once __DIR__ . '/AbstractSecurityMiddleware.php';

final class LoginRateLimitMiddleware extends AbstractSecurityMiddleware
{
    public function __construct(
        private SlidingWindowLimiter $limiter,
        private int $maxAttempts = 5,
        private int $windowSeconds = 300
    ) {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $body = $request->getParsedBody();
        $body = is_array($body) ? $body : [];

        $email = strtolower(trim((string) ($body['email'] ?? '')));
        $ip = $this->resolveClientIp();
        $key = hash('sha256', $ip . '|' . $email);

        $decision = $this->limiter->hit($key, $this->maxAttempts, $this->windowSeconds);
        if (!$decision->allowed) {
            return $this->deny(429, 'Trop de tentatives de connexion. Reessayez plus tard.', [
                'retry_after_seconds' => $decision->retryAfterSeconds,
            ]);
        }

        return $handler->handle($request);
    }

    private function resolveClientIp(): string
    {
        $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
        if ($forwarded !== '') {
            return trim(explode(',', $forwarded)[0]);
        }

        return (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    }
}
