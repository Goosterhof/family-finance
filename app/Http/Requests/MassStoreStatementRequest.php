<?php

declare(strict_types = 1);

namespace App\Http\Requests;

use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class MassStoreStatementRequest extends BaseFormRequest
{
    /**
     * The authentication provider
     *
     * @var JWTAuth
     */
    private $auth;
    
    /**
     * Construct a new controller
     *
     * @param JWTAuth $auth
     */
    public function __construct(JWTAuth $auth)
    {
        $this->auth = $auth;
    }

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
            'statements.*.description' => "nullable|string",
            'statements.*.toAccount' => "nullable|string",
            'statements.*.toAccountName' => "required|string",
            'statements.*.transactionDate' => "required|date",
        ];
    }

    /**
     * Add family id after validation.
     *
     * @param string|null $key
     * @param mixed       $default
     *
     * @return array
     */
    public function validated($key = null, $default = null): array
    {
        /**
         * The authentication user
         *
         * @var \App\Models\User
         */
        $user = $this->auth->user();
        return array_merge(parent::validated($key = null, $default = null), [
            'familyId' => $user->familyId,
        ]);
    }
}
