<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Database\Seeders\ClienteSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Popola la tabella users
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Popola la tabella clienti
        $this->call(ClienteSeeder::class);
        $this->call(OperatoreSeeder::class);
        $this->call(OrdineSeeder::class);
    }
}
