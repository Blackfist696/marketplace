<?php

namespace App\Core;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;

/**
 * Pont entre les handlers texte des routes (Controller@action)
 * et l'execution reelle des methodes de controleurs.
 */
final class ControllerActionInvoker
{
    /**
     * Execute l'action ciblee et reconcilie la sortie legacy (echo/headers)
     * avec une reponse PSR-7 renvoyee a Slim.
     */
    public function invoke(ServerRequestInterface $request, ResponseInterface $response, string $handler, array $args = []): ResponseInterface
    {
        // Resolution du handler texte "Controller@action".
        [$controllerClass, $action] = explode('@', $handler, 2);

        if (!class_exists($controllerClass) || !method_exists($controllerClass, $action)) {
            throw new RuntimeException(sprintf('Handler introuvable: %s', $handler));
        }

        $controller = new $controllerClass();
        $previousStatus = http_response_code(200);

        // Capture du flux legacy (echo) pour le reinjecter dans PSR-7.
        ob_start();
        try {
            $result = $controller->{$action}(...array_values($args));
            $output = (string) ob_get_clean();
        } catch (\Throwable $throwable) {
            ob_end_clean();
            throw $throwable;
        }

        $status = http_response_code();
        $status = is_int($status) && $status >= 100 ? $status : 200;
        $headers = headers_list();
        // Nettoyage de l'etat global PHP pour eviter les fuites sur la requete suivante.
        header_remove();
        http_response_code($previousStatus === false ? 200 : $previousStatus);

        foreach ($headers as $headerLine) {
            if (!str_contains($headerLine, ':')) {
                continue;
            }

            [$name, $value] = explode(':', $headerLine, 2);
            $response = $response->withAddedHeader(trim($name), trim($value));
        }

        if ($output !== '') {
            $response->getBody()->write($output);
        }

        // Priorite 1: si l'action retourne deja une Response PSR-7, on la respecte.
        if ($result instanceof ResponseInterface) {
            return $result;
        }

        // Priorite 2: compat avec la base Controller qui stocke une reponse interne.
        if (method_exists($controller, 'consumeResponse')) {
            $controllerResponse = $controller->consumeResponse();
            if ($controllerResponse instanceof ResponseInterface) {
                return $controllerResponse;
            }
        }

        // Fallback: reutilise la reponse courante avec le statut observe.
        return $response->withStatus($status);
    }
}
