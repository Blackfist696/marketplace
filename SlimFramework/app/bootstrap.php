<?php

// Autoloader pour les classes de l'application
spl_autoload_register(function ($class) {
    // Remplacer le namespace par le chemin du répertoire
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/app/';

    // Vérifier si la classe utilise le prefix
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    // Récupérer la partie relative du namespace
    $relative_class = substr($class, $len);

    // Remplacer les séparateurs de namespace par les séparateurs de répertoire
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // Charger le fichier s'il existe
    if (file_exists($file)) {
        require $file;
    }
});
