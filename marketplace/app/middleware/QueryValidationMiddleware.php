<?php

namespace App\Middleware;

use App\Core\AppLogger;
use App\Core\JsonResponder;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * Valide les query params d'une route via une whitelist declarative.
 *
 * Schema supporte par champ:
 * - type: int|string|date
 * - required: bool
 * - min/max (pour int)
 * - minLength/maxLength (pour string)
 * - enum (pour string)
 *
 * Contraintes globales supportees:
 * - ['type' => 'date_order', 'from' => 'date_debut', 'to' => 'date_fin']
 */
final class QueryValidationMiddleware implements MiddlewareInterface
{
    /**
     * @param array<string,array<string,mixed>> $schema
     * @param array<int,array<string,mixed>> $constraints
     */
    public function __construct(private array $schema, private array $constraints = [])
    {
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $correlationId = $this->resolveCorrelationId($request);
        $query = $request->getQueryParams();
        $unknown = array_diff(array_keys($query), array_keys($this->schema));

        if (!empty($unknown)) {
            $payload = [
                'status' => 400,
                'message' => 'Parametres de requete non autorises',
                'errors' => [
                    'unknown' => array_values($unknown),
                ],
            ];

            $this->logInvalidAttempt($request, $query, $payload['errors'], $correlationId);

            return JsonResponder::write($this->createResponse(), 400, [
                'status' => $payload['status'],
                'message' => $payload['message'],
                'errors' => $payload['errors'],
            ])->withHeader('X-Correlation-Id', $correlationId);
        }

        $sanitized = [];
        $errors = [];

        foreach ($this->schema as $name => $rules) {
            $isMissing = !array_key_exists($name, $query) || $query[$name] === '' || $query[$name] === null;
            $isRequired = (bool) ($rules['required'] ?? false);

            if ($isMissing) {
                if ($isRequired) {
                    $errors[$name] = 'Parametre requis.';
                }
                continue;
            }

            $rawValue = is_scalar($query[$name]) ? (string) $query[$name] : '';
            $type = (string) ($rules['type'] ?? 'string');

            if ($type === 'int') {
                $value = filter_var($rawValue, FILTER_VALIDATE_INT);
                if ($value === false) {
                    $errors[$name] = 'Doit etre un entier valide.';
                    continue;
                }

                if (isset($rules['min']) && $value < (int) $rules['min']) {
                    $errors[$name] = sprintf('Doit etre superieur ou egal a %d.', (int) $rules['min']);
                    continue;
                }

                if (isset($rules['max']) && $value > (int) $rules['max']) {
                    $errors[$name] = sprintf('Doit etre inferieur ou egal a %d.', (int) $rules['max']);
                    continue;
                }

                $sanitized[$name] = $value;
                continue;
            }

            if ($type === 'date') {
                $dt = \DateTimeImmutable::createFromFormat('Y-m-d', $rawValue);
                $isValid = $dt !== false && $dt->format('Y-m-d') === $rawValue;
                if (!$isValid) {
                    $errors[$name] = 'Doit respecter le format YYYY-MM-DD.';
                    continue;
                }

                $sanitized[$name] = $rawValue;
                continue;
            }

            $value = trim($rawValue);

            if (isset($rules['minLength']) && strlen($value) < (int) $rules['minLength']) {
                $errors[$name] = sprintf('Doit contenir au moins %d caracteres.', (int) $rules['minLength']);
                continue;
            }

            if (isset($rules['maxLength']) && strlen($value) > (int) $rules['maxLength']) {
                $errors[$name] = sprintf('Doit contenir au maximum %d caracteres.', (int) $rules['maxLength']);
                continue;
            }

            if (isset($rules['enum']) && is_array($rules['enum']) && !in_array($value, $rules['enum'], true)) {
                $errors[$name] = 'Valeur non autorisee.';
                continue;
            }

            $sanitized[$name] = $value;
        }

        foreach ($this->constraints as $constraint) {
            $type = (string) ($constraint['type'] ?? '');
            if ($type !== 'date_order') {
                continue;
            }

            $from = (string) ($constraint['from'] ?? 'date_debut');
            $to = (string) ($constraint['to'] ?? 'date_fin');

            if (!isset($sanitized[$from], $sanitized[$to])) {
                continue;
            }

            if ((string) $sanitized[$from] > (string) $sanitized[$to]) {
                $errors[$from . '_' . $to] = sprintf('Le parametre %s doit etre inferieur ou egal a %s.', $from, $to);
            }
        }

        if (!empty($errors)) {
            $this->logInvalidAttempt($request, $query, $errors, $correlationId);

            return JsonResponder::write($this->createResponse(), 400, [
                'status' => 400,
                'message' => 'Parametres de requete invalides',
                'errors' => $errors,
            ])->withHeader('X-Correlation-Id', $correlationId);
        }

        // Conserve la compat legacy des controleurs qui lisent $_GET.
        $_GET = $sanitized;

        $response = $handler->handle(
            $request
                ->withQueryParams($sanitized)
                ->withAttribute('correlation_id', $correlationId)
        );

        return $response->withHeader('X-Correlation-Id', $correlationId);
    }

    private function createResponse(): ResponseInterface
    {
        return new \Slim\Psr7\Response();
    }

    /**
     * @param array<string,mixed> $rawQuery
     * @param array<string,mixed> $errors
     */
    private function logInvalidAttempt(ServerRequestInterface $request, array $rawQuery, array $errors, string $correlationId): void
    {
        AppLogger::log('query-validation-attempts', 'warning', 'Query params rejected', [
            'correlation_id' => $correlationId,
            'method' => $request->getMethod(),
            'path' => $request->getUri()->getPath(),
            'query' => $rawQuery,
            'errors' => $errors,
            'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
            'user_id' => (int) ($_SESSION['user_id'] ?? 0),
        ]);
    }

    private function resolveCorrelationId(ServerRequestInterface $request): string
    {
        $incoming = trim($request->getHeaderLine('X-Correlation-Id'));
        if ($incoming !== '' && preg_match('/^[A-Za-z0-9._-]{8,128}$/', $incoming) === 1) {
            return $incoming;
        }

        return bin2hex(random_bytes(16));
    }
}
