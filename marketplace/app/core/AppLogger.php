<?php

namespace App\Core;

use Throwable;

/**
 * Logger applicatif simple base sur des fichiers JSONL dans app/logs.
 *
 * Inclut une rotation manuelle .1 quand la taille max est depassee.
 */
final class AppLogger
{
    private const LOG_DIR = __DIR__ . '/../logs';
    private const DEFAULT_MAX_BYTES = 1048576;

    /**
     * Ecrit un enregistrement de log sur un canal dedie.
     */
    public static function log(string $channel, string $level, string $message, array $context = []): void
    {
        self::ensureLogDir();

        $record = [
            'timestamp' => date('c'),
            'level' => strtoupper($level),
            'channel' => $channel,
            'message' => $message,
            'context' => self::sanitizeContext($context),
        ];

        // JSONL: 1 ligne JSON = 1 evenement, facile a parser/outiller.
        $line = json_encode($record, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (!is_string($line)) {
            // Fallback defensif: evite de casser la journalisation si json_encode echoue.
            $line = '{"timestamp":"' . date('c') . '","level":"ERROR","channel":"logger","message":"json_encode_failed"}';
        }

        $logFile = self::LOG_DIR . '/' . $channel . '.log';
        // Rotation simple avant append pour limiter la taille des fichiers.
        self::rotateIfNeeded($logFile);
        @file_put_contents($logFile, $line . PHP_EOL, FILE_APPEND | LOCK_EX);
    }

    /**
     * Variante helper pour consigner une exception complete.
     */
    public static function logException(string $channel, Throwable $exception, array $context = []): void
    {
        $context['exception'] = [
            'type' => get_class($exception),
            'message' => $exception->getMessage(),
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString(),
        ];

        self::log($channel, 'error', 'Exception captured', $context);
    }

    private static function ensureLogDir(): void
    {
        if (!is_dir(self::LOG_DIR)) {
            @mkdir(self::LOG_DIR, 0775, true);
        }
    }

    private static function sanitizeContext(array $context): array
    {
        // On garde des donnees serialisables pour rester robuste en production.
        foreach ($context as $key => $value) {
            if (is_scalar($value) || $value === null) {
                continue;
            }

            if (is_array($value)) {
                continue;
            }

            $context[$key] = (string) $value;
        }

        return $context;
    }

    private static function rotateIfNeeded(string $logFile): void
    {
        if (!file_exists($logFile)) {
            return;
        }

        $maxBytes = self::resolveMaxBytes();
        $size = @filesize($logFile);
        if ($size === false || $size < $maxBytes) {
            return;
        }

        // Politique volontairement simple: un seul fichier de backup (.1).
        $rotated = $logFile . '.1';
        if (file_exists($rotated)) {
            @unlink($rotated);
        }

        @rename($logFile, $rotated);
    }

    private static function resolveMaxBytes(): int
    {
        $env = getenv('APP_LOG_MAX_BYTES');
        if (is_string($env) && ctype_digit($env)) {
            $value = (int) $env;
            if ($value > 0) {
                return $value;
            }
        }

        return self::DEFAULT_MAX_BYTES;
    }
}
