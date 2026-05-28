<?php

use App\Core\BasePathResolver;
use App\Middleware\CorsMiddleware;
use App\Middleware\RequestDataMiddleware;
use App\Middleware\SessionMiddleware;
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
$app->add(new SessionMiddleware());
$app->addErrorMiddleware((bool) ($config['display_error_details'] ?? false), true, true);

$registerRoutes = require __DIR__ . '/config/routes.php';
$registerRoutes($app);

return $app;
