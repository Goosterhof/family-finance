<?php

declare(strict_types = 1);

namespace Database\Factories;

use App\Models\Family;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'firstName' => $this->faker->firstName(),
            'lastName' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'familyId' => $this->faker->randomElement(Family::all()),
            'password' => $this->faker->password(),
        ];
    }
}
