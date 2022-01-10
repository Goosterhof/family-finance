<?php

namespace App\Http\Requests;

class RegisterUser extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'family' => 'required|string',
            'password' => 'required|same:repeat_password|min:12|max:255',
            'repeat_password' => 'required|same:password|min:12|max:255',
            'rememberMe' => 'required',
        ];
    }
}
