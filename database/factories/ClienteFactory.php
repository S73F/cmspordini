<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'ragione_sociale' => substr($this->faker->company, 0, 100),
            'nome' => $this->faker->firstName,
            'cognome' => $this->faker->lastName,
            'partitaIVA' => $this->faker->numerify('###########'), // 11 cifre, valido per l'Italia
            'indirizzo' => substr($this->faker->streetAddress, 0, 50),
            'citta' => substr($this->faker->city, 0, 50),
            'cap' => $this->faker->numberBetween(10000, 98100),
            'provincia' => substr($this->faker->stateAbbr, 0, 50),
            'emailcliente' => substr($this->faker->unique()->safeEmail, 0, 50),
            'username' => substr($this->faker->unique()->userName, 0, 20),
            'password' => bcrypt('password'),
        ];
    }
}
