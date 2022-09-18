<?php

declare(strict_types = 1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Mailer extends Mailable
{
    use Queueable, SerializesModels;

    protected $user;

    /**
     * Creates a new instance
     *
     * @param Model  $user
     * @param string $type
     */
    public function __construct(Model $user, string $type)
    {
        $this->user = $user;
        $this->type = $type;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        switch ($this->type) {
            case 'inviteUser':
                return $this->subject('Uitnodiging voor de Family Finance App')
                    ->view('emails.inviteuser')
                    ->with([
                        'token' => $this->user->token,
                        'email' => $this->user->email,
                    ]);
            case 'passwordreset':
                return $this->view('emails.passwordreset')
                    ->with([
                        'token' => $this->user->token,
                        'email' => $this->user->email,
                    ]);
        }
    }
}
