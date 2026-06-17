# Sécurité backend

Ce document résume le rôle des composants présents dans `app/security` et `app/middleware`.

## Vue d’ensemble
- `app/security` contient les primitives de sécurité (session, CSRF, rate limiting, autorisation).
- `app/middleware` contient les middlewares HTTP qui appliquent ces règles avant d’atteindre les contrôleurs.

---

## Dossier `app/security`

### `CsrfTokenManager.php`
Rôle : génère et valide un token CSRF lié à la session.

Extrait clé :
```php
public function getToken(): string
{
    SessionSecurity::start();

    if (empty($_SESSION[self::SESSION_KEY])) {
        $_SESSION[self::SESSION_KEY] = bin2hex(random_bytes(32));
    }

    return (string) $_SESSION[self::SESSION_KEY];
}
```

### `SessionSecurity.php`
Rôle : démarre la session PHP avec des options sécurisées (cookie HttpOnly, Secure, SameSite).

Extrait clé :
```php
public static function start(array $sessionConfig = []): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    self::configure($sessionConfig);
    session_start();
}
```

### `auth/AuthContext.php`
Rôle : fournit un contexte utilisateur courant depuis la session.

Extrait clé :
```php
public static function current(): ?array
{
    SessionSecurity::start();

    if (empty($_SESSION['user_id'])) {
        return null;
    }

    return [
        'user_id' => (int) $_SESSION['user_id'],
        'role_id' => (int) ($_SESSION['user_role'] ?? 0),
        'is_admin' => ((int) ($_SESSION['user_role'] ?? 0) === 1),
    ];
}
```

### `authorization/OwnershipGuard.php`
Rôle : centralise les contrôles d’accès basés sur la propriété métier (ex. : l’utilisateur peut voir/modifier seulement ses propres commandes).

Extrait clé :
```php
public static function canAccessCommande(int $commandeId, array $auth): bool
{
    if ($auth['is_admin']) {
        return true;
    }

    $commande = Commande::getById($commandeId);
    return (int) ($commande['id_utilisateur'] ?? 0) === $auth['user_id'];
}
```

### `middleware/AbstractSecurityMiddleware.php`
Rôle : base commune des middlewares de sécurité ; standardise les réponses d’erreur et le logging.

Extrait clé :
```php
protected function deny(int $status, string $message, array $extra = []): ResponseInterface
{
    AppLogger::log('access', 'warning', $message, [
        'status' => $status,
        'uri' => (string) ($_SERVER['REQUEST_URI'] ?? ''),
    ] + $extra);

    return JsonResponder::write(new \Slim\Psr7\Response(), $status, [
        'status' => $status,
        'message' => $message,
    ] + $extra);
}
```

### `middleware/CsrfMiddleware.php`
Rôle : applique la protection CSRF sur les requêtes sensibles (hors GET/HEAD/OPTIONS et hors chemins exemptés).

Extrait clé :
```php
if ($this->requiresValidation($method, $path)) {
    $provided = $request->getHeaderLine('X-CSRF-Token');
    if ($this->enforce && !$this->tokenManager->isValid($provided)) {
        return $this->deny(419, 'Jeton CSRF invalide ou manquant');
    }
}
```

### `middleware/LoginRateLimitMiddleware.php`
Rôle : limite les tentatives de connexion par couple IP + email pour réduire les attaques par force brute.

Extrait clé :
```php
$email = strtolower(trim((string) ($body['email'] ?? '')));
$ip = $this->resolveClientIp();
$key = hash('sha256', $ip . '|' . $email);

$decision = $this->limiter->hit($key, $this->maxAttempts, $this->windowSeconds);
if (!$decision->allowed) {
    return $this->deny(429, 'Trop de tentatives de connexion. Reessayez plus tard.');
}
```

### `ratelimit/SlidingWindowLimiter.php`
Rôle : implémente le mécanisme de limitation par fenêtre glissante.

Extrait clé :
```php
$attempts = array_values(array_filter($attempts, static fn(int $ts): bool => ($now - $ts) < $windowSeconds));
if (count($attempts) >= $maxAttempts) {
    $retryAfter = max(1, $windowSeconds - ($now - min($attempts)));
    return new RateLimitDecision(false, 0, $retryAfter);
}
```

### `ratelimit/RateLimitDecision.php`
Rôle : valeur immuable renvoyée par le limiteur (`allowed`, `remaining`, `retryAfterSeconds`).

Extrait clé :
```php
public function __construct(
    public readonly bool $allowed,
    public readonly int $remaining,
    public readonly int $retryAfterSeconds
) {
}
```

---

## Dossier `app/middleware`

### `SessionMiddleware.php`
Rôle : initialise la session au début du pipeline HTTP en appliquant la configuration globale.

Extrait clé :
```php
$config = require __DIR__ . '/../config/app.php';
SessionSecurity::start($config['security']['session'] ?? []);
```

### `AuthMiddleware.php`
Rôle : bloque l’accès si l’utilisateur n’est pas authentifié.

Extrait clé :
```php
if (empty($_SESSION['user_id'])) {
    return JsonResponder::write($this->createResponse(), 401, [
        'status' => 401,
        'message' => 'Authentification requise',
    ]);
}
```

### `RoleMiddleware.php`
Rôle : vérifie que l’utilisateur possède un rôle autorisé pour la route.

Extrait clé :
```php
$roleId = (int) ($_SESSION['user_role'] ?? 0);
if ($roleId !== 1 && !in_array($roleId, $this->allowedRoles, true)) {
    return JsonResponder::write($this->createResponse(), 403, [
        'status' => 403,
        'message' => 'Acces interdit',
    ]);
}
```

### `CorsMiddleware.php`
Rôle : gère les en-têtes CORS et les requêtes preflight `OPTIONS`.

Extrait clé :
```php
if ($request->getMethod() === 'OPTIONS') {
    $response = new \Slim\Psr7\Response();
    return $this->addCorsHeaders($response, $allowedOrigin)->withStatus(204);
}
```

### `RequestDataMiddleware.php`
Rôle : normalise les données des requêtes mutantes (`POST`, `PUT`, `PATCH`, `DELETE`) pour un accès uniforme.

Extrait clé :
```php
if (str_contains($contentType, 'application/json')) {
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $parsed = $decoded;
    }
}

return $handler->handle($request->withParsedBody($parsed));
```

### `QueryValidationMiddleware.php`
Rôle : valide les query params selon un schéma déclaré, rejette les clés inconnues et normalise les valeurs.

Extrait clé :
```php
$unknown = array_diff(array_keys($query), array_keys($this->schema));
if (!empty($unknown)) {
    return JsonResponder::write($this->createResponse(), 400, [
        'status' => 400,
        'message' => 'Parametres de requete non autorises',
        'errors' => ['unknown' => array_values($unknown)],
    ]);
}
```

### `StripTrailingSlashMiddleware.php`
Rôle : supprime le slash final des URLs pour éviter les incohérences de routage.

Extrait clé :
```php
if ($path !== '/' && str_ends_with($path, '/')) {
    $request = $request->withUri($uri->withPath(rtrim($path, '/')));
}
```

---

## En pratique
- `SessionMiddleware` et `AuthMiddleware` assurent la base d’authentification.
- `CsrfMiddleware` et `LoginRateLimitMiddleware` protègent les opérations sensibles.
- `RoleMiddleware` et `OwnershipGuard` contrôlent les droits d’accès.
- `QueryValidationMiddleware` et `RequestDataMiddleware` réduisent les risques liés aux entrées utilisateur.
