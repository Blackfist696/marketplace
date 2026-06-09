<?php
require_once __DIR__ . '/../app/autoload.php';
require_once __DIR__ . '/../app/controllers/AdminController.php';

$controller = new App\Controllers\AdminController();
$method = new ReflectionMethod($controller, 'buildModelPayload');
$method->setAccessible(true);

$payload = $method->invoke($controller, ['rue' => '12 rue', 'type_adresse' => 'livraison'], ['nom', 'prenom', 'email']);
if ($payload !== []) {
    fwrite(STDERR, "Expected empty payload for address-only data, got: " . json_encode($payload) . PHP_EOL);
    exit(1);
}

$payload = $method->invoke($controller, ['nom' => 'Dupont', 'prenom' => 'Jean', 'rue' => '12 rue'], ['nom', 'prenom', 'email']);
if ($payload !== ['nom' => 'Dupont', 'prenom' => 'Jean']) {
    fwrite(STDERR, "Expected filtered payload for user fields, got: " . json_encode($payload) . PHP_EOL);
    exit(1);
}

echo "admin update payload test passed" . PHP_EOL;
