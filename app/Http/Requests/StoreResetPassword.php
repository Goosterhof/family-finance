<?php

declare(strict_types = 1);

namespace App\Http\Requests;

use App\Rules\BetterEmail;

class StoreResetPassword extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', new BetterEmail],
        ];
    }

    /**
     * The error messages
     *
     * @return array
     */
    public function messages()
    {
        return [
            'email.required' => 'Voer een e-mailadres in',
        ];
    }
}
