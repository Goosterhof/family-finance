<?php

namespace App\Http\Requests;

use App\Rules\NameSpacesDashes;
use App\Rules\BetterEmail;

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
            'first_name' => ['required', 'string', new NameSpacesDashes],
            'last_name' => ['required', 'string', new NameSpacesDashes],
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
            'first_name.required' => 'Vul een voornaam in',
            'last_name.required' => 'Vul een achternaam in',
            'email.required' => 'Vul een E-mailadres in',
            'company_id.required' => 'Selecteer een klant',
        ];
    }
}
