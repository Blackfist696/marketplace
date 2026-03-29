<?php

declare(strict_types=1);

namespace App\Config;

/**
 * Configuration principale de l'application
 */
class AppConfig
{
    private static array $settings = [
        'displayErrorDetails' => true,
        'logErrors'           => true,
        'logErrorDetails'     => true,
        'app' => [
            'name'    => 'TechStore',
            'version' => '1.0.0',
            'locale'  => 'fr_FR',
        ],
        'view' => [
            'template_path' => __DIR__ . '/../Views',
            'cache_path'    => false,
        ],
    ];

    public static function get(string $key = null): mixed
    {
        if ($key === null) {
            return self::$settings;
        }

        $keys = explode('.', $key);
        $value = self::$settings;

        foreach ($keys as $segment) {
            if (!isset($value[$segment])) {
                return null;
            }
            $value = $value[$segment];
        }

        return $value;
    }
}
