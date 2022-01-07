<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([ AdminSeeder::class, ]);

        if (App::environment('local', 'example', 'testing')) {
            $this->call([
                CompanySeeder::class,
                UserSeeder::class,
                ProfileSeeder::class,
            ]);
        }
    }
}
