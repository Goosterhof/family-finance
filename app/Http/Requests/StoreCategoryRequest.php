<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Exists;

class StoreCategoryRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'min:3'],
            'category_id' => ['nullable', new Exists('categories')]
        ];
    }
}
