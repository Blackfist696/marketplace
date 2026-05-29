<?php

namespace App\Security\RateLimit;

/**
 * Resultat immutable d'une verification de limite de debit.
 */
final class RateLimitDecision
{
    public function __construct(
        public readonly bool $allowed,
        public readonly int $remaining,
        public readonly int $retryAfterSeconds
    ) {
    }
}
