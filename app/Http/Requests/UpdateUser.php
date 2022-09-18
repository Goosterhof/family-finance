<?php

declare(strict_types = 1);

namespace App\Http\Requests;

use App\Rules\BetterEmail;
use App\Rules\NameSpacesDashes;

class UpdateUser extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'firstName' => ['required', 'string', new NameSpacesDashes],
            'lastName' => ['required', 'string', new NameSpacesDashes],
            'email' => ['required', 'string', new BetterEmail],
            'company_id' => 'required|integer',
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
            'firstName.required' => 'Vul een voornaam in',
            'lastName.required' => 'Vul een achternaam in',
            'email.required' => 'Vul een E-mailadres in',
            'company_id.required' => 'Selecteer een klant',
        ];
    }
}
