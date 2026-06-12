<?php

/**
 * Composant de sécurité du backend. Il encapsule les mécanismes de protection et d’authentification autour des routes sensibles.
 */

namespace App\Security\RateLimit;

final class SlidingWindowLimiter
{
    private string $storageFile;

    public function __construct(?string $storageFile = null)
    {
        $this->storageFile = $storageFile ?? sys_get_temp_dir() . '/marketplace_rate_limit.json';
    }

    public function hit(string $key, int $maxAttempts, int $windowSeconds): RateLimitDecision
    {
        $now = time();
        $state = $this->readState();

        $attempts = $state[$key] ?? [];
        // Sliding window: on conserve uniquement les tentatives encore dans la fenetre.
        $attempts = array_values(array_filter($attempts, static fn(int $ts): bool => ($now - $ts) < $windowSeconds));

        if (count($attempts) >= $maxAttempts) {
            $oldest = min($attempts);
            $retryAfter = max(1, $windowSeconds - ($now - $oldest));
            $state[$key] = $attempts;
            $this->writeState($state);
            return new RateLimitDecision(false, 0, $retryAfter);
        }

        $attempts[] = $now;
        $state[$key] = $attempts;
        $this->writeState($state);

        return new RateLimitDecision(true, max(0, $maxAttempts - count($attempts)), 0);
    }

    /**
     * @return array<string,array<int,int>>
     */
    private function readState(): array
    {
        if (!file_exists($this->storageFile)) {
            return [];
        }

        $raw = file_get_contents($this->storageFile);
        if ($raw === false || $raw === '') {
            return [];
        }

        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * @param array<string,array<int,int>> $state
     */
    private function writeState(array $state): void
    {
        $dir = dirname($this->storageFile);
        if (!is_dir($dir)) {
            mkdir($dir, 0775, true);
        }

        // Ecriture verrouillee pour eviter les corruptions en acces concurrent.
        $handle = fopen($this->storageFile, 'c+');
        if ($handle === false) {
            return;
        }

        if (flock($handle, LOCK_EX)) {
            ftruncate($handle, 0);
            fwrite($handle, json_encode($state, JSON_UNESCAPED_SLASHES));
            fflush($handle);
            flock($handle, LOCK_UN);
        }

        fclose($handle);
    }
}
