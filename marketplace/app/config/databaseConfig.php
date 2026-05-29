<?php

// Database Configuration
return [
    'host' => getenv('DB_HOST') ?: '127.0.0.1',
    'port' => (int) (getenv('DB_PORT') ?: 3306),
    'user' => getenv('DB_USER') ?: 'root',
    'password' => getenv('DB_PASS') ?: '',
    'name' => getenv('DB_NAME') ?: 'marketplace_artisanal',
    'charset' => getenv('DB_CHARSET') ?: 'utf8mb4'
];

?>