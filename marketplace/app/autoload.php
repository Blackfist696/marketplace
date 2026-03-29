<?php

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

    if (str_starts_with($relativeClass, 'Models/')) {
        $modelName = substr($relativeClass, strlen('Models/'));
        $altFile = __DIR__ . '/models/' . $modelName . 'Model.php';
        if (file_exists($altFile)) {
            require_once $altFile;
            return;
        }
    }
});
