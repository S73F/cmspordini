<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Log;

class OrdineMail extends Mailable
{
    use Queueable, SerializesModels;

    public $tipo;
    public $subject;
    public $ragioneSociale;
    public $numero;
    public $anno;
    public $nomeOperatore;
    public $cognomeOperatore;


    /**
     * Create a new message instance.
     */
    public function __construct(
        $tipo,
        $subject,
        $ragioneSociale = null,
        $numero = null,
        $anno = null,
        $nomeOperatore = null,
        $cognomeOperatore = null,
    ) {
        $this->tipo = $tipo;
        $this->subject = $subject;
        $this->ragioneSociale = $ragioneSociale;
        $this->numero = $numero;
        $this->anno = $anno;
        $this->nomeOperatore = $nomeOperatore;
        $this->cognomeOperatore = $cognomeOperatore;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return match ($this->tipo) {
            "creazioneOrdine" => new Content(
                view: 'emails.confermaCreazioneOrdine',
            ),
            "ricezioneOrdine" => new Content(
                view: 'emails.confermaRicezioneOrdine',
                with: ['ragioneSociale' => $this->ragioneSociale],
            ),
            "termineOrdine" => new Content(
                view: 'emails.confermaTermineOrdine',
                with: ['numero' => $this->numero, 'anno' => $this->anno, 'nomeOperatore' => $this->nomeOperatore, 'cognomeOperatore' => $this->cognomeOperatore]
            ),
            default => new Content(
                view: 'defaultView',
            ),
        };
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
