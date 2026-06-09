<?php

/**
 * Front controller unique du backend.
 * Charge l'application Slim bootstrappee puis execute la requete courante.
 */

$requestMethod = strtoupper((string) ($_SERVER['REQUEST_METHOD'] ?? 'GET'));
$requestPath = (string) parse_url((string) ($_SERVER['REQUEST_URI'] ?? '/'), PHP_URL_PATH);
$spaRoot = __DIR__ . '/app/browser';

// Si un fichier statique existe directement sous `public/`, le servir immédiatement
if (in_array($requestMethod, ['GET', 'HEAD'], true)) {
	$publicFile = realpath(__DIR__ . $requestPath);
	if ($publicFile !== false && str_starts_with($publicFile, realpath(__DIR__) . DIRECTORY_SEPARATOR) && is_file($publicFile)) {
		$ext = strtolower(pathinfo($publicFile, PATHINFO_EXTENSION));
		$mime = match ($ext) {
			'html' => 'text/html; charset=UTF-8',
			'js', 'mjs' => 'application/javascript; charset=UTF-8',
			'css' => 'text/css; charset=UTF-8',
			'json' => 'application/json; charset=UTF-8',
			'svg' => 'image/svg+xml',
			'png' => 'image/png',
			'jpg', 'jpeg' => 'image/jpeg',
			'webp' => 'image/webp',
			'ico' => 'image/x-icon',
			'woff' => 'font/woff',
			'woff2' => 'font/woff2',
			default => 'application/octet-stream',
		};

		header('Content-Type: ' . $mime);
		if ($requestMethod !== 'HEAD') {
			readfile($publicFile);
		}
		exit;
	}
}

if (is_dir($spaRoot) && in_array($requestMethod, ['GET', 'HEAD'], true)) {
	$pathVariants = [$requestPath];

	// Support both local and production prefixes.
	if (str_starts_with($requestPath, '/project02')) {
		$pathVariants[] = substr($requestPath, strlen('/project02')) ?: '/';
	}

	$serveFile = static function (string $absolutePath, string $method): void {
		$ext = strtolower(pathinfo($absolutePath, PATHINFO_EXTENSION));
		$mime = match ($ext) {
			'html' => 'text/html; charset=UTF-8',
			'js', 'mjs' => 'application/javascript; charset=UTF-8',
			'css' => 'text/css; charset=UTF-8',
			'json' => 'application/json; charset=UTF-8',
			'svg' => 'image/svg+xml',
			'png' => 'image/png',
			'jpg', 'jpeg' => 'image/jpeg',
			'webp' => 'image/webp',
			'ico' => 'image/x-icon',
			'woff' => 'font/woff',
			'woff2' => 'font/woff2',
			default => 'application/octet-stream',
		};

		header('Content-Type: ' . $mime);
		if ($method !== 'HEAD') {
			readfile($absolutePath);
		}

		exit;
	};

	$isBackendPath = static function (string $path): bool {
		$backendPrefixes = [
			'/api',
			'/login',
			'/logout',
			'/register',
			'/profile',
			'/products',
			'/artisans',
			'/artisan',
			'/orders',
			'/cart',
			'/admin',
			'/categories',
			'/payment',
			'/home',
		];

		$normalized = strtolower($path);
		if ($normalized === '/project02') {
			$normalized = '/';
		} elseif (str_starts_with($normalized, '/project02/')) {
			$normalized = substr($normalized, strlen('/project02')) ?: '/';
		}

		foreach ($backendPrefixes as $prefix) {
			if ($normalized === $prefix || str_starts_with($normalized, $prefix . '/')) {
				return true;
			}
		}

		return false;
	};

	foreach ($pathVariants as $candidatePath) {
		if (preg_match('#^/(?:public/)?app(?:/(.*))?$#', $candidatePath, $matches) !== 1) {
			continue;
		}

		$relative = $matches[1] ?? '';
		if ($relative === '' || $relative === '/') {
			$serveFile($spaRoot . '/index.html', $requestMethod);
		}

		$safeRelative = ltrim($relative, '/');
		$spaRealRoot = realpath($spaRoot);
		$candidatePaths = [];

		if ($safeRelative !== '') {
			$candidatePaths[] = $spaRoot . '/' . $safeRelative;
			$candidatePaths[] = $spaRoot . '/project02/public/app/' . $safeRelative;
			$candidatePaths[] = $spaRoot . '/project02/public/app/' . $safeRelative . '/index.html';
			$candidatePaths[] = $spaRoot . '/' . $safeRelative . '/index.html';
		}

		$candidatePaths[] = $spaRoot . '/index.html';
		$candidatePaths[] = $spaRoot . '/index.csr.html';
		$candidatePaths[] = $spaRoot . '/project02/public/app/index.html';
		$candidatePaths[] = $spaRoot . '/project02/public/app/home/index.html';

		foreach ($candidatePaths as $candidatePath) {
			$assetPath = realpath($candidatePath);
			if ($assetPath !== false && $spaRealRoot !== false && str_starts_with($assetPath, $spaRealRoot . DIRECTORY_SEPARATOR) && is_file($assetPath)) {
				$serveFile($assetPath, $requestMethod);
			}
		}

		$serveFile($spaRoot . '/index.csr.html', $requestMethod);
	}

	foreach ($pathVariants as $candidatePath) {
		$isRoot = ($candidatePath === '/' || $candidatePath === '');
		$isFrontendRoute = !$isBackendPath($candidatePath);
		if ($isRoot || $isFrontendRoute) {
			$serveFile($spaRoot . '/index.html', $requestMethod);
		}
	}
}

$app = require_once __DIR__ . '/../app/bootstrap.php';

$app->run();