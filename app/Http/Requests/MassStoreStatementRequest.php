<?php

declare(strict_types = 1);

namespace App\Http\Requests;

class MassStoreStatementRequest extends BaseFormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'statements' => 'required|array',
            'statements.*.account' => "required|string",
            'statements.*.amount' => 'required|numeric',
            'statements.*.balanceAfter' => 'required|numeric',
            'statements.*.bankId' => "required|string",
            'statements.*.categoryId' => 'required|numeric|exists:categories,id',
            'statements.*.description' => "required|string",
            'statements.*.toAccount' => "required|string",
            'statements.*.toAccountName' => "required|string",
            'statements.*.transactionDate' => "required|date",
        ];
    }
}
