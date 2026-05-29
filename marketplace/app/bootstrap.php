<?php

/**
 * Point de composition du backend:
 * - creation de l'app Slim,
 * - branchement des middlewares,
 * - gestionnaire d'erreurs global,
 * - enregistrement des routes.
 */

use App\Core\BasePathResolver;
use App\Core\AppLogger;
use App\Core\JsonResponder;
use App\Middleware\CorsMiddleware;
use App\Middleware\RequestDataMiddleware;
use App\Middleware\SessionMiddleware;
use App\Models\Validators\ValidationException;
use App\Security\CsrfTokenManager;
use App\Security\Middleware\CsrfMiddleware;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/autoload.php';

$config = require __DIR__ . '/config/app.php';

$app = AppFactory::create();
$basePath = BasePathResolver::resolve($config);

if ($basePath !== '') {
    $app->setBasePath($basePath);
}

$app->addRoutingMiddleware();
$app->add(new CorsMiddleware());
$app->add(new RequestDataMiddleware());
$app->add(new CsrfMiddleware(
    new CsrfTokenManager(),
    (array) ($config['security']['csrf']['except_paths'] ?? []),
    (bool) ($config['security']['csrf']['enabled'] ?? true)
));
$app->add(new SessionMiddleware());
$errorMiddleware = $app->addErrorMiddleware((bool) ($config['display_error_details'] ?? false), true, true);

$errorMiddleware->setDefaultErrorHandler(
    function (
        ServerRequestInterface $request,
        \Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ) use ($app): ResponseInterface {
        $status = $exception instanceof ValidationException ? 422 : 500;
        $channel = $exception instanceof ValidationException ? 'validation' : 'app-error';
        $message = $exception instanceof ValidationException
            ? 'Erreur de validation'
            : 'Erreur interne du serveur';

        AppLogger::logException($channel, $exception, [
            'status' => $status,
            'method' => $request->getMethod(),
            'uri' => (string) $request->getUri(),
            'user_id' => (int) ($_SESSION['user_id'] ?? 0),
            'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
        ]);

        $payload = [
            'status' => $status,
            'message' => $message,
        ];

        if ($exception instanceof ValidationException) {
            $payload['errors'] = $exception->getErrors();
        } elseif ($displayErrorDetails) {
            $payload['error'] = $exception->getMessage();
        }

        return JsonResponder::write($app->getResponseFactory()->createResponse(), $status, $payload);
    }
);

ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/logs/php-error.log');

$registerRoutes = require __DIR__ . '/config/routes.php';
$registerRoutes($app);

return $app;
