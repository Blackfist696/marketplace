<?php

namespace App\Models;

use PDO;

class Database
{
    private static ?PDO $pdo = null;

    public static function getConnection(): PDO
    {
        if (self::$pdo === null) {
            $configFile = __DIR__ . '/../configs/databaseConfig.php';
            $config = file_exists($configFile) ? require $configFile : [];

            $host = $config['host'];
            $dbname = $config['name'];
            $user = $config['user'];
            $password = $config['password'];
            $charset = $config['charset'];
            $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', $host, $dbname, $charset);

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
