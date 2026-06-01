<?php

/**
 * Configuration de connexion MySQL.
 *
 * Les variables d'environnement sont privilegiees pour les secrets
 * en environnement de production.
 */
return [
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'port' => (int) (getenv('DB_PORT') ?: 3307),
    'user' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASS') ?: '',
    'name' => getenv('DB_NAME') ?: 'marketplace_artisanal',
    'charset' => getenv('DB_CHARSET') ?: 'utf8mb4'
];

?>