<?php

declare(strict_types = 1);

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StatementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'account' => $this->account,
            'amount' => $this->amount,
            'balanceAfter' => $this->balanceAfter,
            'bankId' => $this->bankId,
            'categoryId' => $this->categoryId,
            'description' => $this->description,
            'toAccount' => $this->toAccount,
            'toAccountName' => $this->toAccountName,
            'transactionDate' => $this->transactionDate,
        ];
    }
}
