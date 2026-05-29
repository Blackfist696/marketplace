<?php

namespace App\Core;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use RuntimeException;

final class ControllerActionInvoker
{
    public function invoke(ServerRequestInterface $request, ResponseInterface $response, string $handler, array $args = []): ResponseInterface
    {
        [$controllerClass, $action] = explode('@', $handler, 2);

        if (!class_exists($controllerClass) || !method_exists($controllerClass, $action)) {
            throw new RuntimeException(sprintf('Handler introuvable: %s', $handler));
        }

        $controller = new $controllerClass();
        $previousStatus = http_response_code(200);

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

        if ($result instanceof ResponseInterface) {
            return $result;
        }

        if (method_exists($controller, 'consumeResponse')) {
            $controllerResponse = $controller->consumeResponse();
            if ($controllerResponse instanceof ResponseInterface) {
                return $controllerResponse;
            }
        }

        return $response->withStatus($status);
    }
}
