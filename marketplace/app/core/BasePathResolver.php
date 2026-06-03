<?php

namespace App\Core;

/**
 * Determine dynamiquement le base path de l'application.
 *
 * Utile quand l'app est deployee dans un sous-dossier (ex: /project02).
 */
final class BasePathResolver
{
    /**
     * Tente de resoudre le prefixe d'URL depuis l'environnement, le script
     * courant ou la configuration applicative.
     */
    public static function resolve(array $config = []): string
    {
        // Priorite 1: override explicite via variable d'environnement.
        $envBasePath = getenv('APP_BASE_PATH');
        if (is_string($envBasePath) && $envBasePath !== '') {
            return self::normalize($envBasePath);
        }

        // Priorite 2: deduction depuis SCRIPT_NAME (cas Apache/Nginx classique).
        $scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME'] ?? '');
        $scriptDir = dirname($scriptName);
        $scriptDir = $scriptDir === '.' ? '' : str_replace('\\', '/', $scriptDir);

        if ($scriptDir !== '' && $scriptDir !== '/') {
            $scriptDir = preg_replace('#/public$#', '', $scriptDir) ?? $scriptDir;
            return self::normalize($scriptDir);
        }

        // Priorite 3: fallback sur la config si l'URL courante correspond.
        $requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $configuredBasePath = self::normalize($config['base_path'] ?? '');
        if ($configuredBasePath !== '' && ($requestPath === $configuredBasePath || str_starts_with($requestPath, $configuredBasePath . '/'))) {
            return $configuredBasePath;
        }

        return '';
    }

    /**
     * Normalise un chemin pour garantir un format '/prefix' ou chaine vide.
     */
    private static function normalize(string $basePath): string
    {
        $basePath = '/' . trim(str_replace('\\', '/', $basePath), '/');

        return $basePath === '/' ? '' : $basePath;
    }
}
