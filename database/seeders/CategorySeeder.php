<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoryStructure = [
            "Auto" => [
                "Tanken",
                "Belasting",
                "Reparatie",
                "APK/Beurt"
            ]
        ];

        foreach($categoryStructure as $category => $children) {
            $parent = Category::create(["name" => $category, "family_id" => 1]);

            foreach ($children as $child ) {
                Category::create(["name" => $child, "categoryId" => $parent->id, "family_id" => 1]);
            }
        }
    }
}
