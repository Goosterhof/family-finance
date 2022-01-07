<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * This code fixes a bug similar to this:
         * https://github.com/laravel/telescope/issues/347
         *
         * This is checked via strpos - strpos returns an integer if PHPUnit is found,
         * and false if it is not
         */

        if ($this->app->isLocal()) {
            $this->app->register(TelescopeServiceProvider::class);
            $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
        }

        if ($this->app->environment() === 'production') {
            \URL::forceScheme('https');
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();

        Schema::defaultStringLength(191);
    }
}
