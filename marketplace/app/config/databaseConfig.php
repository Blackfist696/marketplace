<?php

/**
 * Configuration de connexion MySQL.
 *
 * Les variables d'environnement sont privilegiees pour les secrets
 * en environnement de production.
 */
return [
    // Hote/port de la base; valeurs locales par defaut pour un setup dev simple.
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'port' => (int) (getenv('DB_PORT') ?: 3306),
    // Credentials: toujours privilegier les variables d'environnement en production.
    'user' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASS') ?: '',
    // Nom de schema et charset utilises pour construire le DSN PDO.
    'name' => getenv('DB_NAME') ?: 'marketplace_artisanal',
    'charset' => getenv('DB_CHARSET') ?: 'utf8mb4'
];

?>