<?php

/**
 * Charge automatiquement les classes du namespace App\.
 *
 * Ce fichier sert de fallback local d'autoload et conserve une compatibilité
 * avec la convention historique des modèles nommés *Model.php. Il permet au
 * framework et aux contrôleurs de charger les classes sans import explicite.
 */

$composerAutoload = __DIR__ . '/../vendor/autoload.php';
if (file_exists($composerAutoload)) {
    require_once $composerAutoload;
}

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';
    if (strncmp($prefix, $class, strlen($prefix)) !== 0) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = __DIR__ . '/' . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require_once $file;
        return;
    }

    // support lower-case directory names for view and models on Windows
    $relativeDir = dirname(str_replace('\\', '/', $relativeClass));
    $className = basename(str_replace('\\', '/', $relativeClass));
    $lowerDir = strtolower($relativeDir);
    $altFile = __DIR__ . '/' . $lowerDir . '/' . $className . '.php';
    if (file_exists($altFile)) {
        require_once $altFile;
        return;
    }

    if (str_starts_with($relativeClass, 'Models\\') || str_starts_with($relativeClass, 'Models/')) {
        $modelName = str_replace(['Models\\', 'Models/'], '', $relativeClass);
        $altFile = __DIR__ . '/models/' . $modelName . 'Model.php';
        if (file_exists($altFile)) {
            require_once $altFile;
            return;
        }
    }
});
