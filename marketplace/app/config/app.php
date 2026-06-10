<?php

/**
 * Configuration globale de l'application.
 *
 * Regroupe les options de debug, de logging et de securite.
 */

return [
    // Prefixe URL de deploiement (ex: /project02). Peut etre surcharge par APP_BASE_PATH.
    'base_path' => '/project02',
    // Active les details d'erreur en environnement de dev uniquement.
    'display_error_details' => filter_var(getenv('APP_DEBUG') ?: '0', FILTER_VALIDATE_BOOL),
    'logging' => [
        // Rotation simple .1 pilotee par AppLogger.
        'max_file_bytes' => (int) (getenv('APP_LOG_MAX_BYTES') ?: 1048576),
    ],
    'ai' => [
        // Endpoint Ollama local sur le serveur de production.
        'ollama_url' => getenv('OLLAMA_URL') ?: 'http://localhost:11434/api/chat',
        // Modele par defaut pour le MVP.
        'model' => getenv('OLLAMA_MODEL') ?: 'gpt-oss:120b-cloud',
        // Modele de secours si le modele principal n'est pas disponible.
        'fallback_model' => getenv('OLLAMA_FALLBACK_MODEL') ?: 'gpt-oss:120b-cloud',
        // Timeout reseau (secondes) pour eviter les requetes bloquantes.
        'connect_timeout' => (int) (getenv('OLLAMA_CONNECT_TIMEOUT') ?: 5),
        'timeout' => (int) (getenv('OLLAMA_TIMEOUT') ?: 90),
        'tags_timeout' => (int) (getenv('OLLAMA_TAGS_TIMEOUT') ?: 3),
        // Limite de prompt MVP pour controler cout/latence.
        'max_prompt_chars' => (int) (getenv('OLLAMA_MAX_PROMPT_CHARS') ?: 4000),
    ],
    'security' => [
        // Role force a l'inscription (3 = client) pour eviter l'elevation de privilege.
        'default_register_role_id' => (int) (getenv('DEFAULT_REGISTER_ROLE_ID') ?: 3),
        'session' => [
            // Flags cookies: adapter selon HTTP local / HTTPS prod.
            'cookie_secure' => filter_var(getenv('SESSION_COOKIE_SECURE') ?: '0', FILTER_VALIDATE_BOOL),
            'cookie_httponly' => true,
            'cookie_samesite' => getenv('SESSION_COOKIE_SAMESITE') ?: 'Lax',
            'cookie_lifetime' => (int) (getenv('SESSION_COOKIE_LIFETIME') ?: 0),
        ],
        'csrf' => [
            // CSRF actif par defaut; except_paths reserve les routes publiques d'auth.
            'enabled' => filter_var(getenv('CSRF_ENFORCE') ?: '1', FILTER_VALIDATE_BOOL),
            'except_paths' => ['/login', '/register', '/logout'],
        ],
        'rate_limit' => [
            // Anti brute-force login (tentatives max sur fenetre glissante).
            'login_max_attempts' => (int) (getenv('LOGIN_MAX_ATTEMPTS') ?: 5),
            'login_window_seconds' => (int) (getenv('LOGIN_WINDOW_SECONDS') ?: 300),
        ],
    ],
];
