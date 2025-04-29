<?php

namespace App\Jobs;

use App\Mail\OrdineMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class creazioneOrdineMailJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public array $incoming)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $oggettoCliente = "Conferma creazione ordine n°{$this->incoming['numero']}/{$this->incoming['anno']}";
        $oggettoOperatore = "Nuovo ordine n°{$this->incoming['numero']}/{$this->incoming['anno']} ricevuto";

        Mail::to($this->incoming['mailCliente'])->send(new OrdineMail("creazioneOrdine", $oggettoCliente));

        foreach ($this->incoming['mailOperatori'] as $mailOperatore) {
            Mail::to($mailOperatore)->send(new OrdineMail("ricezioneOrdine", $oggettoOperatore, $this->incoming['ragioneSociale']));
        }
    }
}
