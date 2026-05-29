<?php

namespace App\Security;

/**
 * Encapsule les bonnes pratiques de session PHP.
 */
final class SessionSecurity
{
    /**
     * Demarre la session avec les options de cookie securisees.
     */
    public static function start(array $sessionConfig = []): void
    {
        if (session_status() === PHP_SESSION_ACTIVE) {
            return;
        }

        self::configure($sessionConfig);
        session_start();
    }

    /**
     * Regenerer l'identifiant de session apres login/logout.
     */
    public static function regenerateId(): void
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            return;
        }

        session_regenerate_id(true);
    }

    private static function configure(array $sessionConfig): void
    {
        if (session_status() !== PHP_SESSION_NONE) {
            return;
        }

        $cookieSecure = (bool) ($sessionConfig['cookie_secure'] ?? self::isHttps());
        $cookieHttpOnly = (bool) ($sessionConfig['cookie_httponly'] ?? true);
        $cookieSameSite = (string) ($sessionConfig['cookie_samesite'] ?? 'Lax');
        $cookieLifetime = (int) ($sessionConfig['cookie_lifetime'] ?? 0);

        ini_set('session.use_strict_mode', '1');
        ini_set('session.use_only_cookies', '1');

        session_set_cookie_params([
            'lifetime' => $cookieLifetime,
            'path' => '/',
            'domain' => '',
            'secure' => $cookieSecure,
            'httponly' => $cookieHttpOnly,
            'samesite' => $cookieSameSite,
        ]);
    }

    private static function isHttps(): bool
    {
        if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') {
            return true;
        }

        return (($_SERVER['SERVER_PORT'] ?? null) === 443);
    }
}
