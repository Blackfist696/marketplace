<?php

declare(strict_types=1);

use App\Router;
use Slim\Factory\AppFactory;

require_once __DIR__ . '/../vendor/autoload.php';

// ── Bootstrapping de l'application Slim ────────────────────────────────────
$app = AppFactory::create();

// Gestion des erreurs
$app->addErrorMiddleware(true, true, true);

// Body parsing (JSON, form)
$app->addBodyParsingMiddleware();

// Routing
$app->setBasePath('');

// Enregistrement des routes
Router::register($app);

$app->run();
