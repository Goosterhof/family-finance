<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        if (User::count() > 0) {
            return;
        }
        $company = Company::create(['name'=>'Script']);

        // Create one admin first
        // Cant use firstOrCreate, probably because of password
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'Test',
            'email' => 'admin@test.com',
            'password' => '10script10',
            'admin' => 1,
            'company_id' => $company->id,
        ]);
    }
}
