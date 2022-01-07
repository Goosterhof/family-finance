<?php

namespace Database\Seeders;

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
        Family::factory()->hasUsers(1, [
            'password' => 'password',
            'email' => 'user@test.com',
        ])->create();
        Family::factory(10)->hasUsers(2)->create();
    }
}
