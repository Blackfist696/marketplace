<?php

require_once __DIR__ . '/../app/autoload.php';

use App\Controllers\HomeController;
use App\Controllers\ProductController;
use App\Models\Produit;
use App\Models\Role;
use App\Models\Utilisateur;
use App\Models\Personne;
use App\View\JsonView;

function captureOutput(callable $fn): string
{
    ob_start();
    $fn();
    return ob_get_clean();
}

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

    // View tests
    $jsonOutput = captureOutput(function () {
        JsonView::render(['test' => 'value'], 200);
    });
    $parsed = json_decode($jsonOutput, true);
    $ok = is_array($parsed) && isset($parsed['test']) && $parsed['test'] === 'value';
    result('JsonView::render()', $ok, $ok ? '' : 'invalid json output: ' . trim($jsonOutput));

    // Controller tests
    $homeController = new HomeController();
    $homeOutput = captureOutput(function () use ($homeController) {
        $homeController->index();
    });
    $homeData = json_decode($homeOutput, true);
    $ok = is_array($homeData) && $homeData['status'] === 200 && $homeData['message'] === 'Accueil';
    result('HomeController::index()', $ok, $ok ? '' : 'output: ' . trim($homeOutput));

    if ($ok && count($products) > 0) {
        $productId = (int) $products[0]['id_produit'];
        $productController = new ProductController();
        $productOutput = captureOutput(function () use ($productController, $productId) {
            $productController->show($productId);
        });
        $productData = json_decode($productOutput, true);
        $ok = is_array($productData) && $productData['status'] === 200 && isset($productData['data']);
        result('ProductController::show()', $ok, $ok ? '' : 'output: ' . trim($productOutput));
    } else {
        result('ProductController::show()', false, 'no product available to test');
        $success = false;
    }
} catch (Throwable $e) {
    result('Exception', false, $e->getMessage());
    exit(1);
}

exit($success ? 0 : 1);
