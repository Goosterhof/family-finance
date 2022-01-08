<?php

namespace App\Http\Requests;

use App\Rules\BetterEmail;

class LoginUser extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'string'],
            'password' => 'required|min:5|max:255',
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
            'email.required' => 'Vul een e-mailadres in',
            'password.required' => 'Vul een wachtwoord in',
            'password.min' => 'Het wachtwoord mag niet kleiner dan 5 tekens zijn',
        ];
    }
}
