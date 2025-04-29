<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('clienti', function (Blueprint $table) {
            $table->id('IDcliente');
            $table->string('ragione_sociale', 100);
            $table->string('nome', 50)->nullable();
            $table->string('cognome', 50)->nullable();
            $table->string('partitaIVA', 50);
            $table->string('indirizzo', 50);
            $table->string('citta', 50);
            $table->integer('cap');
            $table->string('provincia', 50);
            $table->string('emailcliente', 50);
            $table->string('username', 20)->unique();
            $table->string('password', 100);
        });
    }

    public function down()
    {
        Schema::dropIfExists('clienti');
    }
};
