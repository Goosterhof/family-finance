<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

/**
 * $router is injected from RouteServiceProvider when loading this file
 *
 * @var \Illuminate\Routing\Router $router
 */

$router->post('login', 'AuthController@login');
$router->post('sendEmailResetPassword', 'PasswordResetsController@store');
$router->post('resetpassword', 'PasswordResetsController@update');
$router->post('users', 'UserController@store');

$router->group(['middleware' => ['auth:api']], function () use ($router) {
    $router->post('logout', 'AuthController@logout');
    $router->get('me', 'AuthController@me');
});
