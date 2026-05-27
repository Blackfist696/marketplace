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

    // ── Panier en session (visiteur anonyme + client authentifie) ──────────
    'GET /cart'          => 'App\\Controllers\\CartController@index',
    'POST /cart'         => 'App\\Controllers\\CartController@add',
    'PUT /cart/{id_produit}'     => 'App\\Controllers\\CartController@updateLine',
    'DELETE /cart/{id_produit}'  => 'App\\Controllers\\CartController@remove',

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

    // ── API Referentiels et contenus ───────────────────────────────────────
    'GET /api/pays'                 => 'App\\Controllers\\PaysController@index',
    'GET /api/pays/{id}'            => 'App\\Controllers\\PaysController@show',
    'POST /api/pays'                => 'App\\Controllers\\PaysController@store',
    'PUT /api/pays/{id}'            => 'App\\Controllers\\PaysController@update',
    'DELETE /api/pays/{id}'         => 'App\\Controllers\\PaysController@destroy',

    'GET /api/villes'               => 'App\\Controllers\\VilleController@index',
    'GET /api/villes/{id}'          => 'App\\Controllers\\VilleController@show',
    'POST /api/villes'              => 'App\\Controllers\\VilleController@store',
    'PUT /api/villes/{id}'          => 'App\\Controllers\\VilleController@update',
    'DELETE /api/villes/{id}'       => 'App\\Controllers\\VilleController@destroy',

    'GET /api/avis'                 => 'App\\Controllers\\AvisController@index',
    'GET /api/avis/{id}'            => 'App\\Controllers\\AvisController@show',
    'GET /api/produits/{id_produit}/avis' => 'App\\Controllers\\AvisController@indexByProduit',
    'POST /api/avis'                => 'App\\Controllers\\AvisController@store',
    'PUT /api/avis/{id}'            => 'App\\Controllers\\AvisController@update',
    'DELETE /api/avis/{id}'         => 'App\\Controllers\\AvisController@destroy',

    'GET /api/paiements'            => 'App\\Controllers\\PaiementApiController@index',
    'GET /api/paiements/{id}'       => 'App\\Controllers\\PaiementApiController@show',
    'POST /api/paiements'           => 'App\\Controllers\\PaiementApiController@store',
    'PUT /api/paiements/{id}'       => 'App\\Controllers\\PaiementApiController@update',
    'DELETE /api/paiements/{id}'    => 'App\\Controllers\\PaiementApiController@destroy',

    'GET /api/classes'                                => 'App\\Controllers\\ClasseController@index',
    'GET /api/categories/{id_categorie}/classes'      => 'App\\Controllers\\ClasseController@indexByCategorie',
    'GET /api/produits/{id_produit}/classes'          => 'App\\Controllers\\ClasseController@indexByProduit',
    'POST /api/classes'                               => 'App\\Controllers\\ClasseController@store',
    'DELETE /api/classes/{id_categorie}/{id_produit}' => 'App\\Controllers\\ClasseController@destroy',

    'GET /api/user-addresses'                                 => 'App\\Controllers\\UserAddressController@index',
    'GET /api/utilisateurs/{id_utilisateur}/adresses'         => 'App\\Controllers\\UserAddressController@indexByUtilisateur',
    'GET /api/adresses/{id_adresse}/utilisateurs'             => 'App\\Controllers\\UserAddressController@indexByAdresse',
    'POST /api/user-addresses'                                => 'App\\Controllers\\UserAddressController@store',
    'DELETE /api/user-addresses/{id_utilisateur}/{id_adresse}' => 'App\\Controllers\\UserAddressController@destroy',

    'GET /api/lignes-commandes'                               => 'App\\Controllers\\LigneCommandeController@index',
    'GET /api/lignes-commandes/{id}'                          => 'App\\Controllers\\LigneCommandeController@show',
    'GET /api/commandes/{id_commande}/lignes'                 => 'App\\Controllers\\LigneCommandeController@indexByCommande',
    'POST /api/lignes-commandes'                              => 'App\\Controllers\\LigneCommandeController@store',
    'PUT /api/lignes-commandes/{id}'                          => 'App\\Controllers\\LigneCommandeController@update',
    'DELETE /api/lignes-commandes/{id}'                       => 'App\\Controllers\\LigneCommandeController@destroy',

    'GET /api/statistiques-artisans'                          => 'App\\Controllers\\StatistiqueArtisanController@index',
    'GET /api/statistiques-artisans/{id}'                     => 'App\\Controllers\\StatistiqueArtisanController@show',
    'GET /api/artisans/{id_artisan}/statistiques'             => 'App\\Controllers\\StatistiqueArtisanController@indexByArtisan',
    'POST /api/statistiques-artisans'                         => 'App\\Controllers\\StatistiqueArtisanController@store',
    'PUT /api/statistiques-artisans/{id}'                     => 'App\\Controllers\\StatistiqueArtisanController@update',
    'DELETE /api/statistiques-artisans/{id}'                  => 'App\\Controllers\\StatistiqueArtisanController@destroy',
];