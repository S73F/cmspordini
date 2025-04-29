<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Cliente extends Authenticatable
{
    use HasFactory;

    protected $table = "clienti";

    protected $primaryKey = "IDcliente";

    protected $fillable = [
        'ragione_sociale',
        'nome',
        'cognome',
        'partitaIVA',
        'indirizzo',
        'citta',
        'cap',
        'provincia',
        'emailcliente',
        'username',
        'password'
    ];

    public function ordine()
    {
        return $this->hasMany(Ordine::class, 'IDcliente');
    }

    public function operatore()
    {
        return $this->belongsTo(User::class, 'IDoperatore');
    }

    public $timestamps = false;
}
