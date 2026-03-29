<?php

return [
    // Home route
    'GET /' => 'HomeController@index',
    
    // Product routes
    'GET /products' => 'ProductController@index',
    'GET /products/{id}' => 'ProductController@show',
    'POST /products' => 'ProductController@store',
    'PUT /products/{id}' => 'ProductController@update',
    'DELETE /products/{id}' => 'ProductController@destroy',
    
    // Cart routes
    'GET /cart' => 'CartController@index',
    'POST /cart' => 'CartController@add',
    'DELETE /cart/{id}' => 'CartController@remove',
    
    // Order routes
    'GET /orders' => 'OrderController@index',
    'POST /orders' => 'OrderController@store',
    
    // User routes
    'GET /login' => 'AuthController@loginForm',
    'POST /login' => 'AuthController@login',
    'POST /logout' => 'AuthController@logout',
    'GET /register' => 'AuthController@registerForm',
    'POST /register' => 'AuthController@register',
];