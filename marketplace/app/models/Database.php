<?php

namespace App\Models;

use PDO;

/**
 * Gestionnaire de connexion PDO singleton.
 */
class Database
{
    private static ?PDO $pdo = null;

    /**
     * Retourne une instance PDO configurée pour la base de données.
     *
     * @return PDO Instance de connexion.
     */
    public static function getConnection(): PDO
    {
        if (self::$pdo === null) {
            $configFile = __DIR__ . '/../config/databaseConfig.php';
            $config = file_exists($configFile) ? require $configFile : [];

            $host = getenv('DB_HOST') ?: ($config['host'] ?? '127.0.0.1');
            $port = (int) (getenv('DB_PORT') ?: ($config['port'] ?? 3306));
            $dbname = getenv('DB_NAME') ?: ($config['name'] ?? 'marketplace_artisanal');
            $user = getenv('DB_USER') ?: ($config['user'] ?? 'marketplace_app');
            $password = getenv('DB_PASS') ?: ($config['password'] ?? '');
            $charset = getenv('DB_CHARSET') ?: ($config['charset'] ?? 'utf8mb4');
            $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=%s', $host, $port, $dbname, $charset);

            self::$pdo = new PDO(
                $dsn,
                $user,
                $password,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]
            );
        }

        return self::$pdo;
    }
}
