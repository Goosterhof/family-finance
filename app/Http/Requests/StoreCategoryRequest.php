<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rules\Exists;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class StoreCategoryRequest extends BaseFormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'min:3'],
            'category_id' => ['nullable', new Exists('categories', 'id')]
        ];
    }

    /**
     * Add family id after validation.
     *
     * @return array
     */
    public function validated(): array
    {
        /**
         * The authentication user
         *
         * @var User
         */
        $user = $this->auth->user();
        return array_merge(parent::validated(), [
            'family_id' => $user->family_id
        ]);
    }
}
