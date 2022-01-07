<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Routing\Router;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The routing router instance.
     *
     * @var Router
     */
    protected $router;

    /**
     * Define the routes for the application.
     *
     * @param Router $router
     *
     * @return void
     */
    public function map(Router $router)
    {
        $this->router = $router;

        $this->mapApiRoutes();

        $this->mapWebRoutes();
    }

     /**
      * Define the "web" routes for the application.
      *
      * These routes all receive session state, CSRF protection, etc.
      *
      * @return void
      */
    protected function mapWebRoutes()
    {
        $this->router->group([
            'middleware' => ['web'],
        ], function ($router) {
            // $router is injected in this function, so it's available in the routes/web.php
            require base_path('routes/web.php');
        });
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        $this->router->group([
            'middleware' => ['api'],
            'prefix' => 'api'
        ], function ($router) {
            // $router is injected in this function, so it's available in the routes/api.php
            require base_path('routes/api.php');
        });
    }
}
