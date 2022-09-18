<?php

declare(strict_types = 1);

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class BaseFormRequest extends FormRequest
{
    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     *
     * @return void
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(new JsonResponse([
            'errors' => $validator->errors(),
            'message' => 'Formulier bevat fouten',
        ], 422));
    }
}
