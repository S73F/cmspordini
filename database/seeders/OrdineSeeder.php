<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Ordine;

class OrdineSeeder extends Seeder
{
    public function run()
    {
        Ordine::factory()->count(300)->create(); // Genera 30 ordini fittizi
    }
}
