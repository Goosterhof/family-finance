<?php

declare(strict_types = 1);

namespace App\Http\Requests;

class UpdatePassword extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'token' => 'required',
            'password' => 'required|min:12|max:255',
            'password2' => 'required|same:password|min:12|max:255',
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
            'token.required' => 'Geen geldig token aanwezig',
            'password.required' => 'Voer een nieuw wachtwoord in',
            'password2.required' => 'Herhaal het nieuwe wachtwoord',
            'password2.same' => 'Wachtwoorden komen niet overeen',
            'password.min' => 'Wachtwoord moet minimaal uit 12 tekens bestaan',
        ];
    }
}
