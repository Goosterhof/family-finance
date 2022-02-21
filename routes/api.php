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

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;

$router->post('login', [AuthController::class, 'login']);
$router->post('send-mail-reset-password', [PasswordResetsController::class, 'store']);
$router->post('reset-password', [PasswordResetsController::class, 'update']);
$router->post('register', [AuthController::class, 'register']);

$router->group(['middleware' => ['auth:api']], function () use ($router) {
    $router->post('logout', [AuthController::class, 'logout']);
    $router->get('me', [AuthController::class, 'me']);
    $router->get('categories', [CategoryController::class, 'index']);
    $router->post('categories', [CategoryController::class, 'store']);
});
