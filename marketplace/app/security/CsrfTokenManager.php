<?php

namespace App\Security;

/**
 * Gere le cycle de vie du token CSRF stocke en session.
 */
final class CsrfTokenManager
{
    private const SESSION_KEY = '_csrf_token';

    public function getToken(): string
    {
        SessionSecurity::start();

        if (empty($_SESSION[self::SESSION_KEY])) {
            $_SESSION[self::SESSION_KEY] = bin2hex(random_bytes(32));
        }

        return (string) $_SESSION[self::SESSION_KEY];
    }

    public function isValid(?string $token): bool
    {
        if ($token === null || $token === '') {
            return false;
        }

        $current = $this->getToken();
        return hash_equals($current, $token);
    }
}
