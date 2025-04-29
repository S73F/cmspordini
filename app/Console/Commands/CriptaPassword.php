<?php

namespace App\Console\Commands;

use App\Models\Cliente;
use App\Models\Operatore;
use DB;
use Hash;
use Illuminate\Console\Command;

class CriptaPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cripta-password';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cripta le password di tutti gli utenti';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Inizio criptazione delle password');

        $clienti = Cliente::all();
        foreach ($clienti as $cliente) {
            $password = $cliente->password;

            if (Hash::needsRehash($password)) {
                $cliente->password = bcrypt($password);
                $cliente->save();
            }
        }

        $operatori = Operatore::all();
        foreach ($operatori as $operatore) {
            $password = $operatore->password;

            if (Hash::needsRehash($password)) {
                $operatore->password = bcrypt($password);
                $operatore->save();
            }
        }

        $this->info('Criptazione delle password completata');
    }
}
