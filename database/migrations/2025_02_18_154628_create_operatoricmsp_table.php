<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('operatoriCMSP', function (Blueprint $table) {
            $table->id('IDoperatore');
            $table->string('nome', 50);
            $table->string('cognome', 50);
            $table->string('username', 20)->unique();
            $table->string('password', 100);
            $table->string('emailoperatore', 50);
        });
    }

    public function down()
    {
        Schema::dropIfExists('operatoriCMSP');
    }
};
