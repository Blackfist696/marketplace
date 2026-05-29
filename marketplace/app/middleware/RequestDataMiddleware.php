<?php

namespace App\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Uniformise les donnees de requete mutante dans $_POST et parsedBody.
 */
final class RequestDataMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $method = strtoupper($request->getMethod());
        if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return $handler->handle($request);
        }

        $contentType = strtolower($request->getHeaderLine('Content-Type'));
        $rawBody = (string) $request->getBody();
        $parsed = [];

        if (str_contains($contentType, 'application/json')) {
            $decoded = json_decode($rawBody, true);
            if (is_array($decoded)) {
                $parsed = $decoded;
            }
        } elseif ($rawBody !== '') {
            parse_str($rawBody, $parsed);
        }

        if ($method === 'POST' && !empty($_POST)) {
            $parsed = array_merge($parsed, $_POST);
        }

        if (is_array($parsed)) {
            $_POST = $parsed;
        }

        return $handler->handle($request->withParsedBody($parsed));
    }
}
