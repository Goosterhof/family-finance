<?php

namespace App\Http\Requests;

class StoreUser extends BaseFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'password' => 'required|same:passwordrepeat|min:12|max:255',
            'passwordrepeat' => 'required|same:password|min:12|max:255',
        ];
    }
}
