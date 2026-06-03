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
        // Middleware utile seulement pour les methodes mutantes.
        if (!in_array($method, ['POST', 'PUT', 'PATCH', 'DELETE'], true)) {
            return $handler->handle($request);
        }

        $contentType = strtolower($request->getHeaderLine('Content-Type'));
        $rawBody = (string) $request->getBody();
        $parsed = [];

        if (str_contains($contentType, 'application/json')) {
            // Cas API moderne: body JSON.
            $decoded = json_decode($rawBody, true);
            if (is_array($decoded)) {
                $parsed = $decoded;
            }
        } elseif ($rawBody !== '') {
            // Fallback compat form-urlencoded brut.
            parse_str($rawBody, $parsed);
        }

        // Sur POST, on fusionne avec $_POST natif pour conserver la compat legacy.
        if ($method === 'POST' && !empty($_POST)) {
            $parsed = array_merge($parsed, $_POST);
        }

        if (is_array($parsed)) {
            $_POST = $parsed;
        }

        // Ecrit simultanement dans $_POST et parsedBody pour un acces uniforme.
        return $handler->handle($request->withParsedBody($parsed));
    }
}
