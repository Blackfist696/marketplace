<?php

return [
    // Home route
    'GET /' => 'App\\Controllers\\HomeController@index',
    
    // Product routes
    'GET /products' => 'App\\Controllers\\ProductController@index',
    'GET /products/{id}' => 'App\\Controllers\\ProductController@show',
    'POST /products' => 'App\\Controllers\\ProductController@store',
    'PUT /products/{id}' => 'App\\Controllers\\ProductController@update',
    'DELETE /products/{id}' => 'App\\Controllers\\ProductController@destroy',
    
    // Cart routes
    'GET /cart' => 'App\\Controllers\\CartController@index',
    'POST /cart' => 'App\\Controllers\\CartController@add',
    'DELETE /cart/{id}' => 'App\\Controllers\\CartController@remove',
    
    // Order routes
    'GET /orders' => 'App\\Controllers\\OrderController@index',
    'POST /orders' => 'App\\Controllers\\OrderController@store',
    
    // User routes
    'GET /login' => 'App\\Controllers\\AuthController@loginForm',
    'POST /login' => 'App\\Controllers\\AuthController@login',
    'POST /logout' => 'App\\Controllers\\AuthController@logout',
    'GET /register' => 'App\\Controllers\\AuthController@registerForm',
    'POST /register' => 'App\\Controllers\\AuthController@register',
];