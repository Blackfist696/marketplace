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

            $host = $config['host'] ?? getenv('DB_HOST') ?: '127.0.0.1';
            $port = $config['port'] ?? getenv('DB_PORT') ?: 3306;
            $dbname = $config['name'] ?? getenv('DB_NAME') ?: 'marketplace_artisanal';
            $user = $config['user'] ?? getenv('DB_USER') ?: 'root';
            $password = $config['password'] ?? getenv('DB_PASS') ?: '';
            $charset = $config['charset'] ?? getenv('DB_CHARSET') ?: 'utf8mb4';
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
