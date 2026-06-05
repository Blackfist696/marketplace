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
use App\Middleware\StripTrailingSlashMiddleware;
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

// Important: Slim execute les middlewares en LIFO.
// Le dernier ajoute (ErrorMiddleware) sera le premier execute a l'entree.

// 1) RoutingMiddleware: resolve la route cible et prepare les arguments de route.
// Il doit etre ajoute avant les autres, mais sera execute apres eux (LIFO).
$app->addRoutingMiddleware();

// 2) CorsMiddleware: ajoute les en-tetes CORS et gere les preflight OPTIONS.
// Place avant le routing effectif pour repondre rapidement aux preflight.
$app->add(new CorsMiddleware());

// 2bis) StripTrailingSlashMiddleware: neutralise les slashs finaux imposes
// par certains environnements Apache avant le matching des routes Slim.
$app->add(new StripTrailingSlashMiddleware());

// 3) RequestDataMiddleware: normalise les donnees d'entree (JSON/form)
// pour un acces uniforme via parsedBody/$_POST dans les controleurs.
$app->add(new RequestDataMiddleware());

// 4) CsrfMiddleware: verifie le token CSRF sur les requetes mutantes.
// Les exceptions de chemins et l'activation sont pilotees par la config.
$app->add(new CsrfMiddleware(
    new CsrfTokenManager(),
    (array) ($config['security']['csrf']['except_paths'] ?? []),
    (bool) ($config['security']['csrf']['enabled'] ?? true)
));

// 5) SessionMiddleware: demarre/renforce la session HTTP.
// Place avant ErrorMiddleware pour garantir un contexte session dans les logs d'erreur.
$app->add(new SessionMiddleware());

// 6) ErrorMiddleware: enveloppe globale qui capture les exceptions
// provenant des middlewares/routes en aval et delegue au handler JSON.
$errorMiddleware = $app->addErrorMiddleware((bool) ($config['display_error_details'] ?? false), true, true);

// setDefaultErrorHandler definit LE point central de traitement des exceptions non capturees.
// Ici, on force une reponse JSON uniforme pour toute l'application:
// - 422 pour les erreurs metier de validation (ValidationException),
// - 500 pour les erreurs internes inattendues.
//
// Le callback recoit:
// - la requete PSR-7 courante,
// - l'exception levee,
// - des flags Slim (affichage detail/activation logs).
// Ces informations servent a journaliser proprement l'incident et a renvoyer
// un payload API stable, consomme facilement par le frontend.
$errorMiddleware->setDefaultErrorHandler(
    function (
        ServerRequestInterface $request,
        \Throwable $exception,
        bool $displayErrorDetails,
        bool $logErrors,
        bool $logErrorDetails
    ) use ($app): ResponseInterface {
        // Mapping technique -> metier: on choisit le statut HTTP et le canal de log
        // en fonction du type d'exception.
        $status = 500;
        $channel = 'app-error';
        $message = 'Erreur interne du serveur';

        if ($exception instanceof ValidationException) {
            $status = 422;
            $channel = 'validation';
            $message = 'Erreur de validation';
        } elseif ($exception instanceof \Slim\Exception\HttpNotFoundException) {
            $status = 404;
            $channel = 'client-error';
            $message = 'Ressource introuvable';
        } elseif ($exception instanceof \Slim\Exception\HttpMethodNotAllowedException) {
            $status = 405;
            $channel = 'client-error';
            $message = 'Methode HTTP non autorisee';
        }

        // Journalisation centralisee: contexte minimal pour diagnostiquer
        // (code HTTP, methode, URI, utilisateur courant, IP source).
        AppLogger::logException($channel, $exception, [
            'status' => $status,
            'method' => $request->getMethod(),
            'uri' => (string) $request->getUri(),
            'user_id' => (int) ($_SESSION['user_id'] ?? 0),
            'ip' => (string) ($_SERVER['REMOTE_ADDR'] ?? ''),
        ]);

        // Contrat de reponse JSON commun a toutes les erreurs backend.
        $payload = [
            'status' => $status,
            'message' => $message,
        ];

        // En 422, on expose les erreurs de validation champ par champ.
        // En debug, on peut ajouter le message technique pour accelerer le diagnostic.
        if ($exception instanceof ValidationException) {
            $payload['errors'] = $exception->getErrors();
        } elseif ($displayErrorDetails) {
            $payload['error'] = $exception->getMessage();
        }

        // Reponse PSR-7 finale serialisee en JSON par le helper central.
        return JsonResponder::write($app->getResponseFactory()->createResponse(), $status, $payload);
    }
);

ini_set('log_errors', '1');
ini_set('error_log', __DIR__ . '/logs/php-error.log');

$registerRoutes = require __DIR__ . '/config/routes.php';
$registerRoutes($app);

return $app;
