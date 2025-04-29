<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\Operatore;
use Illuminate\Database\Eloquent\Factories\Factory;

class OrdineFactory extends Factory
{
    public function definition(): array
    {
        return [
            'IDcliente' => Cliente::factory(),
            'IDoperatore' => Operatore::factory(),
            'numero' => $this->faker->unique()->randomNumber(5),
            'data' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'medicoOrdinante' => substr('Dott. ' . $this->faker->lastName, 0, 50),
            'PazienteNome' => substr($this->faker->firstName, 0, 50),
            'PazienteCognome' => substr($this->faker->lastName, 0, 50),
            'IndirizzoSpedizione' => substr($this->faker->address, 0, 50),
            'fileok' => $this->faker->boolean,
            'data_inizioLavorazione' => $this->faker->optional()->dateTimeBetween('-6 months', 'now'),
            'stato' => $this->faker->numberBetween(0, 2),
            'data_spedizione' => $this->faker->optional()->dateTimeBetween('-3 months', 'now'),
            'note' => $this->faker->paragraph,
            'nomefile' => substr($this->faker->optional()->word . '.pdf', 0, 100),
            'lavorazione' => substr($this->faker->text(500), 0, 1000),
            'colore' => substr($this->faker->safeColorName, 0, 100),
            'piattaforma' => substr($this->faker->randomElement(['Windows', 'macOS', 'Linux', 'Altro']), 0, 1000),
            'data_cons' => $this->faker->date,
            'ora_cons' => $this->faker->time,
            'note_int' => $this->faker->text(200),
            'note_ulti_mod' => $this->faker->optional()->dateTime,
            'utente_modifica' => substr($this->faker->userName, 0, 150),
            'file_fin' => $this->faker->boolean,
            'file_fin_nome' => substr($this->faker->optional()->word . '.zip', 0, 150),
        ];
    }
}
