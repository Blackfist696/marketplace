<?php

namespace App\Security;

/**
 * Gere le cycle de vie du token CSRF stocke en session.
 */
final class CsrfTokenManager
{
    // Cle de session reservee au token CSRF de l'utilisateur courant.
    private const SESSION_KEY = '_csrf_token';

    public function getToken(): string
    {
        // Assure qu'une session active existe avant lecture/ecriture du token.
        SessionSecurity::start();

        if (empty($_SESSION[self::SESSION_KEY])) {
            // 32 octets aleatoires -> 64 caracteres hexadecimaux.
            $_SESSION[self::SESSION_KEY] = bin2hex(random_bytes(32));
        }

        return (string) $_SESSION[self::SESSION_KEY];
    }

    public function isValid(?string $token): bool
    {
        if ($token === null || $token === '') {
            return false;
        }

        // hash_equals protege contre les attaques de timing.
        $current = $this->getToken();
        return hash_equals($current, $token);
    }
}
