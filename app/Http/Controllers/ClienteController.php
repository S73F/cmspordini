<?php

namespace App\Http\Controllers;

use App\Models\Ordine;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClienteController extends Controller
{
    /**
     * Mostra la dashboard del cliente.
     *
     * @return \Inertia\Response - La vista della dashboard del cliente.
     */
    public function showDashboard()
    {
        return Inertia::render("Cliente/Dashboard");
    }

    /**
     * Mostra lo storico degli ordini del cliente autenticato.
     * 
     * Se viene fornito un parametro "tempo", filtra gli ordini effettuati nel lasso di tempo specificato;
     * altrimenti, renderizza la vista senza ordini.
     *
     * @param string|null $tempo - Il periodo di tempo per cui visualizzare gli ordini (es. "30", "tutto").
     * @return \Inertia\Response - La vista con lo storico degli ordini.
     */
    public function getStoricoOrdini($tempo = null)
    {
        $ordini = [];

        if ($tempo !== null) {

            $idCliente = Auth::guard('cliente')->user()->IDcliente;

            // Prepara la query per recuperare gli ordini del cliente autenticato
            $query = Ordine::where('IDcliente', $idCliente);

            // Se il parametro non è "tutto", filtra gli ordini per il lasso di tempo specificato
            if ($tempo !== "tutto") {
                $query->whereBetween("data", [now()->subDays($tempo), now()]);
            }

            $ordini = $query->select(
                'IDordine',
                'data',
                'medicoOrdinante',
                'PazienteNome',
                'PazienteCognome',
                'IndirizzoSpedizione',
                'data_inizioLavorazione',
                'stato',
                'data_spedizione',
                'file_fin'
            )
                ->orderBy('data', "desc")
                ->get();

            return Inertia::render('Cliente/StoricoOrdini', ['ordini' => $ordini]);

        } else {
            // Se non è stato passato alcun parametro, renderizza la vista senza ordini
            return Inertia::render('Cliente/StoricoOrdini');
        }
    }

    /**
     * Mostra la pagina per la creazione di un nuovo ordine.
     *
     * @return \Inertia\Response - La vista per la creazione di un nuovo ordine.
     */
    public function showCreazioneOrdine()
    {
        return Inertia::render("Cliente/CreazioneOrdine");
    }
}
