<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ordine extends Model
{
    use HasFactory;

    protected $table = 'ordini';
    protected $primaryKey = 'IDordine';
    public $timestamps = false;

    protected $fillable = [
        'IDcliente',
        'IDoperatore',
        'numero',
        'data',
        'medicoOrdinante',
        'PazienteNome',
        'PazienteCognome',
        'IndirizzoSpedizione',
        'fileok',
        'data_inizioLavorazione',
        'stato',
        'data_spedizione',
        'note',
        'nomefile',
        'lavorazione',
        'colore',
        'piattaforma',
        'data_cons',
        'ora_cons',
        'note_int',
        'note_ulti_mod',
        'utente_modifica',
        'file_fin',
        'file_fin_nome',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'IDcliente', 'IDcliente');
    }

    public function operatore()
    {
        return $this->belongsTo(Operatore::class, 'IDoperatore', 'IDoperatore');
    }
}
