<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OperatoreFactory extends Factory
{
    public function definition(): array
    {
        return [
            'nome' => $this->faker->firstName,
            'cognome' => $this->faker->lastName,
            'username' => substr($this->faker->unique()->userName, 0, 20),
            'password' => bcrypt('password'),
            'emailoperatore' => substr($this->faker->unique()->safeEmail, 0, 50),
        ];
    }
}
