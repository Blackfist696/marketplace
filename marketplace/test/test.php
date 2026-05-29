<?php

require_once __DIR__ . '/../app/autoload.php';

use App\Core\JsonResponder;
use App\Controllers\HomeController;
use App\Controllers\ProductController;
use App\Models\Produit;
use App\Models\Role;
use App\Models\Utilisateur;
use App\Models\Personne;
use Slim\Psr7\Response;

function result(string $name, bool $success, string $details = ''): void
{
    $status = $success ? 'OK' : 'FAIL';
    echo sprintf("[%s] %s%s\n", $status, $name, $details !== '' ? ' - ' . $details : '');
}

$success = true;

try {
    // Model tests
    $roles = Role::getAll();
    $success = $success && is_array($roles);
    result('Role::getAll()', is_array($roles), 'should return array');

    $users = Utilisateur::getBy('email', 'client1@example.com');
    $ok = is_array($users) && count($users) > 0 && $users[0]['email'] === 'client1@example.com';
    result('Utilisateur::getBy(email)', $ok, $ok ? '' : 'missing client1@example.com');

    $people = Personne::getBy('nom', 'Dupont');
    $ok = is_array($people);
    result('Personne::getBy(nom)', $ok, $ok ? '' : 'should return array');

    $products = Produit::getAll();
    $ok = is_array($products) && count($products) > 0;
    result('Produit::getAll()', $ok, $ok ? '' : 'should return at least one product');

    // JSON response helper tests
    $response = JsonResponder::write(new Response(), 200, ['test' => 'value']);
    $parsed = json_decode((string) $response->getBody(), true);
    $ok = is_array($parsed) && isset($parsed['test']) && $parsed['test'] === 'value';
    result('JsonResponder::write()', $ok, $ok ? '' : 'invalid json output');

    // Controller tests
    $homeController = new HomeController();
    $homeController->index();
    $homeResponse = $homeController->consumeResponse();
    $homeData = $homeResponse ? json_decode((string) $homeResponse->getBody(), true) : null;
    $ok = is_array($homeData) && $homeData['status'] === 200 && $homeData['message'] === 'Accueil';
    result('HomeController::index()', $ok, $ok ? '' : 'invalid response body');

    if ($ok && count($products) > 0) {
        $productId = (int) $products[0]['id_produit'];
        $productController = new ProductController();
        $productController->show($productId);
        $productResponse = $productController->consumeResponse();
        $productData = $productResponse ? json_decode((string) $productResponse->getBody(), true) : null;
        $ok = is_array($productData) && $productData['status'] === 200 && isset($productData['data']);
        result('ProductController::show()', $ok, $ok ? '' : 'invalid response body');
    } else {
        result('ProductController::show()', false, 'no product available to test');
        $success = false;
    }
} catch (Throwable $e) {
    result('Exception', false, $e->getMessage());
    exit(1);
}

exit($success ? 0 : 1);
