<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ExceptionEmail extends Mailable
{
    use Queueable, SerializesModels;

    // public $subject;
    // public $exception;
    private $content;
    private $css;



    /**
     * Create a new message instance.
     */
    public function __construct($content, $css)
    {
        // $this->subject = $subject;
        // $this->exception = $exception;
        $this->content = $content;
        $this->css = $css;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Exception in CMSPordini',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.exception',
            with: ['content' => $this->content, 'css' => $this->css]
        );
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
