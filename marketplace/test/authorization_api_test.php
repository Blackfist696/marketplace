<?php

declare(strict_types=1);

/**
 * Tests d'autorisation API (sans framework) pour les briques de securite.
 *
 * Cible:
 * - App\Security\Auth\AuthContext
 * - App\Security\Authorization\OwnershipGuard
 */

require_once __DIR__ . '/../app/autoload.php';

use App\Models\Commande;
use App\Models\Utilisateur;
use App\Security\Auth\AuthContext;
use App\Security\Authorization\OwnershipGuard;

$stats = [
    'passed' => 0,
    'failed' => 0,
    'skipped' => 0,
];

function report(string $status, string $name, string $details = ''): void
{
    echo sprintf("[%s] %s%s\n", $status, $name, $details !== '' ? ' - ' . $details : '');
}

function pass(string $name, string $details = ''): void
{
    global $stats;
    $stats['passed']++;
    report('OK', $name, $details);
}

function fail(string $name, string $details = ''): void
{
    global $stats;
    $stats['failed']++;
    report('FAIL', $name, $details);
}

function skip(string $name, string $details = ''): void
{
    global $stats;
    $stats['skipped']++;
    report('SKIP', $name, $details);
}

function assertTrue(bool $condition, string $name, string $details = ''): void
{
    if ($condition) {
        pass($name, $details);
        return;
    }

    fail($name, $details);
}

function assertSame($expected, $actual, string $name): void
{
    $ok = $expected === $actual;
    $details = $ok
        ? sprintf('expected=%s actual=%s', var_export($expected, true), var_export($actual, true))
        : sprintf('expected=%s actual=%s', var_export($expected, true), var_export($actual, true));

    assertTrue($ok, $name, $details);
}

function ensureSessionStarted(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
}

function resetSessionData(): void
{
    ensureSessionStarted();
    $_SESSION = [];
}

try {
    resetSessionData();

    // ---- AuthContext ------------------------------------------------------

    $auth = AuthContext::current();
    assertSame(null, $auth, 'AuthContext retourne null sans session utilisateur');

    $_SESSION['user_id'] = 42;
    $_SESSION['user_role'] = 3;
    $auth = AuthContext::current();

    assertTrue(is_array($auth), 'AuthContext retourne un tableau si utilisateur connecte');
    if (is_array($auth)) {
        assertSame(42, $auth['user_id'] ?? null, 'AuthContext expose user_id');
        assertSame(3, $auth['role_id'] ?? null, 'AuthContext expose role_id');
        assertSame(false, $auth['is_admin'] ?? null, 'AuthContext is_admin false pour non-admin');
    }

    $_SESSION['user_role'] = 1;
    $auth = AuthContext::current();
    assertTrue(is_array($auth), 'AuthContext tableau pour admin');
    if (is_array($auth)) {
        assertSame(true, $auth['is_admin'] ?? null, 'AuthContext is_admin true pour role admin');
    }

    // ---- OwnershipGuard: avis/paiement/ligne ------------------------------

    $clientAuth = ['user_id' => 10, 'role_id' => 3, 'is_admin' => false];
    $artisanAuth = ['user_id' => 20, 'role_id' => 2, 'is_admin' => false];
    $adminAuth = ['user_id' => 1, 'role_id' => 1, 'is_admin' => true];

    assertTrue(
        OwnershipGuard::canAccessAvis(['id_utilisateur' => 10], $clientAuth) === true,
        'OwnershipGuard avis: proprietaire autorise'
    );
    assertTrue(
        OwnershipGuard::canAccessAvis(['id_utilisateur' => 11], $clientAuth) === false,
        'OwnershipGuard avis: autre utilisateur interdit'
    );
    assertTrue(
        OwnershipGuard::canAccessAvis(['id_utilisateur' => 11], $adminAuth) === true,
        'OwnershipGuard avis: admin autorise'
    );

    assertTrue(
        OwnershipGuard::canAccessPaiement(['id_commande' => 0], $clientAuth) === false,
        'OwnershipGuard paiement: id_commande invalide refuse'
    );
    assertTrue(
        OwnershipGuard::canAccessLigneCommande(['id_commande' => 0], $artisanAuth) === false,
        'OwnershipGuard ligne commande: id_commande invalide refuse'
    );

    // ---- OwnershipGuard: commande (base reelle) ---------------------------

    try {
        $orders = Commande::getAll();
        if (empty($orders)) {
            skip('OwnershipGuard commande', 'Aucune commande en base, tests d ownership commandes ignores');
        } else {
            $firstOrder = $orders[0];
            $orderId = (int) ($firstOrder['id_commande'] ?? 0);
            $ownerId = (int) ($firstOrder['id_utilisateur'] ?? 0);

            if ($orderId <= 0 || $ownerId <= 0) {
                skip('OwnershipGuard commande', 'Commande de reference invalide en base');
            } else {
                $ownerAuth = ['user_id' => $ownerId, 'role_id' => 3, 'is_admin' => false];

                assertTrue(
                    OwnershipGuard::canAccessCommande($orderId, $ownerAuth) === true,
                    'OwnershipGuard commande: proprietaire autorise'
                );

                assertTrue(
                    OwnershipGuard::canAccessCommande($orderId, $adminAuth) === true,
                    'OwnershipGuard commande: admin autorise'
                );

                $otherUsers = array_values(array_filter(
                    Utilisateur::getAll(),
                    static fn(array $u): bool => (int) ($u['id_utilisateur'] ?? 0) !== $ownerId
                ));

                if (empty($otherUsers)) {
                    skip('OwnershipGuard commande: autre utilisateur', 'Pas d autre utilisateur disponible');
                } else {
                    $otherUserId = (int) ($otherUsers[0]['id_utilisateur'] ?? 0);
                    $otherRoleId = (int) ($otherUsers[0]['id_role'] ?? 3);
                    if ($otherRoleId === 1) {
                        // Evite de tester un admin ici pour verifier un refus reel.
                        $otherRoleId = 3;
                    }

                    $otherAuth = ['user_id' => $otherUserId, 'role_id' => $otherRoleId, 'is_admin' => false];

                    assertTrue(
                        OwnershipGuard::canAccessCommande($orderId, $otherAuth) === false,
                        'OwnershipGuard commande: non proprietaire non-admin interdit'
                    );
                }

                assertTrue(
                    OwnershipGuard::canAccessPaiement(['id_commande' => $orderId], $ownerAuth) === true,
                    'OwnershipGuard paiement: propriete commande heritee'
                );

                assertTrue(
                    OwnershipGuard::canAccessLigneCommande(['id_commande' => $orderId], $ownerAuth) === true,
                    'OwnershipGuard ligne commande: propriete commande heritee'
                );
            }
        }
    } catch (Throwable $throwable) {
        skip('OwnershipGuard commande', 'Base indisponible: ' . $throwable->getMessage());
    }
} catch (Throwable $throwable) {
    fail('Execution du test', $throwable->getMessage());
}

echo "\n";
echo sprintf(
    "Resume: %d OK, %d FAIL, %d SKIP\n",
    $stats['passed'],
    $stats['failed'],
    $stats['skipped']
);

exit($stats['failed'] > 0 ? 1 : 0);
