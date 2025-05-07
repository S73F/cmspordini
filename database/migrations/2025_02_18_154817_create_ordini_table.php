<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('ordini', function (Blueprint $table) {
            $table->id('IDordine');
            $table->foreignId('IDcliente')->constrained('clienti', 'IDcliente')->onDelete('restrict')->onUpdate('restrict');
            $table->foreignId('IDoperatore')->nullable()->constrained('operatoriCMSP', 'IDoperatore')->onDelete('restrict')->onUpdate('restrict');
            $table->integer('numero');
            $table->dateTime('data');
            $table->string('medicoOrdinante', 50);
            $table->string('PazienteNome', 50);
            $table->string('PazienteCognome', 50);
            $table->string('IndirizzoSpedizione', 50);
            $table->boolean('fileok')->nullable();
            $table->dateTime('data_inizioLavorazione')->nullable();
            $table->tinyInteger('stato');
            $table->dateTime('data_spedizione')->nullable();
            $table->text('note');
            $table->string('nomefile', 100)->nullable();
            $table->string('lavorazione', 1000);
            $table->string('colore', 100);
            $table->text('piattaforma');
            $table->date('data_cons');
            $table->time('ora_cons');
            $table->text('note_int');
            $table->dateTime('note_ulti_mod')->nullable();
            $table->string('utente_modifica', 150)->default('-');
            $table->boolean('file_fin')->default(0);
            $table->string('file_fin_nome', 150)->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('ordini');
    }
};
