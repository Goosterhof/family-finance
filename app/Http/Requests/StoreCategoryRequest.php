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
            'categoryId' => ['nullable', new Exists('categories', 'id')]
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
         * @var User
         */
        $user = $this->auth->user();
        return array_merge(parent::validated($key = null, $default = null), [
            'family_id' => $user->family_id
        ]);
    }
}
