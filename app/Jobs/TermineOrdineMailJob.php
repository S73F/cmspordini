<?php

namespace App\Jobs;

use App\Mail\OrdineMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class TermineOrdineMailJob implements ShouldQueue
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
        $oggetto = "Conferma termine ordine n°{$this->incoming['numero']}/{$this->incoming['anno']}";

        Mail::to($this->incoming['mailCliente'])->send(new OrdineMail("termineOrdine", $oggetto, null, $this->incoming['numero'], $this->incoming['anno'], $this->incoming['nomeOperatore'], $this->incoming['cognomeOperatore']));
    }
}
