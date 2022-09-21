<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Family;
use Illuminate\Database\Seeder;

class FamilySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Family::factory()
            ->hasUsers(1, [
                'first_name' => 'Gerard',
                'last_name' => 'Oosterhof',
                'password' => 'password',
                'email' => 'user@test.com',
            ])
            ->create();

        Family::factory(10)
            ->hasUsers(2)
            ->has(Category::factory(3)
                // TODO ::  this one doenst get the family id
                // ->hasCategories(2)
            )
            ->create();
    }
}
