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
                "Rijtuigen belasting",
                "Reparatie",
                "APK/Beurt",
                "Parkeren",
                "Autoverzekering",
                "ANWB"
            ],
            "Zorgverzekering" => [
                "ZV Gerard",
                "ZV Floor"
            ],
            "Nutsbedrijven" => [
                "Electriciteit",
                "Water",
                "Energiewacht"
            ],
            "Bankkosten" => [
                "Gerard Rabobank",
                "Gezamenlijke bank",
                "Floor ING"
            ],
            "Abbonementen" => [
                "Microsoft Family"
            ],
            "Streamingdiensten" => [
                "HBO",
                "Prime"
            ],
            "Mobiel abbonomenten" => [
                "Mobiel Gerard",
                "Mobiel Floor"
            ],
            "Hobbies" => [
                "Gamen Gerard",
                "Crypto",
                "Whisky"
            ],
            "Boodschappen" => [],
            "Heen en weer" => [
                "Naar gezamenlijk"
            ],
            "Loon en giften" => [
                "Loon Gerard",
                "Gift"
            ],
            "Verzorging" => [
                "Kapper",
                "Kleding",
                "Tandarts"
            ],
            "Lidmaatschappen" => [
                "BNN/VARA"
            ],
            "Overig" => [
                "Gereedschap",
                "Cadeau's",
                "Vakantie",
                "Uiteten",
                "Eten bezorgen"
            ],
            "Belastingen" => [
                "Teruggaven",
                "Andere belastingen"
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
