<?php

namespace App\Security\Middleware;

use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract class AbstractSecurityMiddleware implements MiddlewareInterface
{
    abstract public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface;

    protected function deny(int $status, string $message, array $extra = []): ResponseInterface
    {
        $payload = array_merge([
            'status' => $status,
            'message' => $message,
        ], $extra);

        return JsonResponder::write(new \Slim\Psr7\Response(), $status, $payload);
    }
}
