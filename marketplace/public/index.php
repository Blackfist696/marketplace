<?php

/**
 * Front controller unique du backend.
 * Charge l'application Slim bootstrappee puis execute la requete courante.
 */

$app = require_once __DIR__ . '/../app/bootstrap.php';

$app->run();