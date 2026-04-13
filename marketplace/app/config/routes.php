<?php

return [
    // Home route
    'GET /' => 'App\\Controllers\\HomeController@index',

    // ── Auth (visiteur anonyme) ─────────────────────────────────────────────
    'GET /login'    => 'App\\Controllers\\AuthController@loginForm',
    'POST /login'   => 'App\\Controllers\\AuthController@login',
    'POST /logout'  => 'App\\Controllers\\AuthController@logout',
    'GET /register' => 'App\\Controllers\\AuthController@registerForm',
    'POST /register'=> 'App\\Controllers\\AuthController@register',

    // ── Artisans publics (lecture anonyme) ─────────────────────────────────
    'GET /artisans'       => 'App\\Controllers\\ArtisanController@index',
    'GET /artisans/{id}'  => 'App\\Controllers\\ArtisanController@show',

    // ── Produits (lecture anonyme, CRUD réservé artisan/admin) ─────────────
    'GET /products'                        => 'App\\Controllers\\ProductController@index',
    'GET /products/{id}'                   => 'App\\Controllers\\ProductController@show',
    'GET /artisans/{artisan_id}/products'  => 'App\\Controllers\\ProductController@indexByArtisan',
    'POST /products'                       => 'App\\Controllers\\ProductController@store',
    'PUT /products/{id}'                   => 'App\\Controllers\\ProductController@update',
    'DELETE /products/{id}'               => 'App\\Controllers\\ProductController@destroy',

    // ── Panier (visiteur anonyme + client authentifié) ──────────────────────
    'GET /cart'          => 'App\\Controllers\\CartController@index',
    'POST /cart'         => 'App\\Controllers\\CartController@add',
    'PUT /cart/{id}'     => 'App\\Controllers\\CartController@updateLine',
    'DELETE /cart/{id}'  => 'App\\Controllers\\CartController@remove',

    // ── Paiement fictif (Bancontact) ────────────────────────────────────────
    'GET /payment'         => 'App\\Controllers\\PaymentController@page',
    'POST /payment/process'=> 'App\\Controllers\\PaymentController@process',

    // ── Commandes (client authentifié) ─────────────────────────────────────
    'GET /orders'         => 'App\\Controllers\\OrderController@index',
    'GET /orders/{id}'    => 'App\\Controllers\\OrderController@show',
    'POST /orders'        => 'App\\Controllers\\OrderController@store',

    // ── Profil client (authentifié) ─────────────────────────────────────────
    'GET /profile'        => 'App\\Controllers\\ProfileController@show',
    'PUT /profile'        => 'App\\Controllers\\ProfileController@update',
    'DELETE /profile'     => 'App\\Controllers\\ProfileController@deactivate',

    // ── Espace artisan (rôle artisan requis) ────────────────────────────────
    'GET /artisan/products'         => 'App\\Controllers\\ArtisanController@myProducts',
    'GET /artisan/stats'            => 'App\\Controllers\\ArtisanController@stats',

    // ── Administration (rôle admin requis) ──────────────────────────────────
    'GET /admin/users'              => 'App\\Controllers\\AdminController@users',
    'GET /admin/users/{id}'         => 'App\\Controllers\\AdminController@showUser',
    'PUT /admin/users/{id}'         => 'App\\Controllers\\AdminController@updateUser',
    'DELETE /admin/users/{id}'      => 'App\\Controllers\\AdminController@deactivateUser',

    'GET /admin/artisans'           => 'App\\Controllers\\AdminController@artisans',
    'GET /admin/artisans/{id}'      => 'App\\Controllers\\AdminController@showArtisan',
    'PUT /admin/artisans/{id}'      => 'App\\Controllers\\AdminController@updateArtisan',
    'DELETE /admin/artisans/{id}'   => 'App\\Controllers\\AdminController@deactivateArtisan',

    'GET /admin/products'           => 'App\\Controllers\\AdminController@products',
    'PUT /admin/products/{id}'      => 'App\\Controllers\\AdminController@updateProduct',
    'DELETE /admin/products/{id}'   => 'App\\Controllers\\AdminController@deactivateProduct',

    'GET /admin/stats'              => 'App\\Controllers\\AdminController@stats',
];