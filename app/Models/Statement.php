<?php

declare(strict_types = 1);

namespace App\Models;

class Statement extends BaseModel
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        "account" ,
        "amount" ,
        "balanceAfter" ,
        "bankId" ,
        "categoryId" ,
        "description" ,
        "toAccount" ,
        "toAccountName" ,
        "transactionDate" ,
    ];
}
