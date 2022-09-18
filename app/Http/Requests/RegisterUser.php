<?php

declare(strict_types = 1);

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
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|string',
            'family' => 'required|string',
            'password' => 'required|same:repeatPassword|min:12|max:255',
            'repeatPassword' => 'required|same:password|min:12|max:255',
            'rememberMe' => 'required',
        ];
    }
}
