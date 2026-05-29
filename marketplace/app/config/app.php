<?php

return [
    'base_path' => '/project02',
    'display_error_details' => filter_var(getenv('APP_DEBUG') ?: '0', FILTER_VALIDATE_BOOL),
    'security' => [
        'default_register_role_id' => (int) (getenv('DEFAULT_REGISTER_ROLE_ID') ?: 3),
        'session' => [
            'cookie_secure' => filter_var(getenv('SESSION_COOKIE_SECURE') ?: '0', FILTER_VALIDATE_BOOL),
            'cookie_httponly' => true,
            'cookie_samesite' => getenv('SESSION_COOKIE_SAMESITE') ?: 'Lax',
            'cookie_lifetime' => (int) (getenv('SESSION_COOKIE_LIFETIME') ?: 0),
        ],
        'csrf' => [
            'enabled' => filter_var(getenv('CSRF_ENFORCE') ?: '1', FILTER_VALIDATE_BOOL),
            'except_paths' => ['/login', '/register', '/logout'],
        ],
        'rate_limit' => [
            'login_max_attempts' => (int) (getenv('LOGIN_MAX_ATTEMPTS') ?: 5),
            'login_window_seconds' => (int) (getenv('LOGIN_WINDOW_SECONDS') ?: 300),
        ],
    ],
];
