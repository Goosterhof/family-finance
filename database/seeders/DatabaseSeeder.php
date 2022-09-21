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
        if (App::environment('local', 'example', 'testing')) {
            $this->call([
                // UserSeeder::class,
                FamilySeeder::class,
                CategorySeeder::class
            ]);
        }
    }
}
