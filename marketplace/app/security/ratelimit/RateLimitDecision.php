<?php

namespace App\Security\RateLimit;

/**
 * Resultat immutable d'une verification de limite de debit.
 */
final class RateLimitDecision
{
    // allowed: autorisation immediate ou non.
    // remaining: tentatives restantes dans la fenetre.
    // retryAfterSeconds: delai recommande avant nouvel essai.
    public function __construct(
        public readonly bool $allowed,
        public readonly int $remaining,
        public readonly int $retryAfterSeconds
    ) {
    }
}
