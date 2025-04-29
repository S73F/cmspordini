<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Operatore;

class OperatoreSeeder extends Seeder
{
    public function run()
    {
        Operatore::factory()->count(10)->create(); // Genera 10 operatori fittizi
    }
}
