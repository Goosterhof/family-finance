<?php

declare(strict_types = 1);

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\EmailProfileWerkCvController;

/**
 * $router is injected from RouteServiceProvider when loading this file
 *
 * @var \Illuminate\Routing\Router $router
*/

$router->get('/waardering/{emailProfileWerkCv}/{Quality}', [EmailProfileWerkCvController::class, 'update']);

// /waardering?id=1&q=1

$router->get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
