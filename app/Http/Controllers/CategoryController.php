<?php

declare(strict_types = 1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

class CategoryController extends Controller
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
     * Display a listing of the resource.
     *
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        /**
         * The authentication user
         *
         * @var User
         */
        $user = $this->auth->user();
        return CategoryResource::collection($user->family->categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCategoryRequest $request
     *
     * @return CategoryResource
     */
    public function store(StoreCategoryRequest $request): CategoryResource
    {
        return new CategoryResource(Category::create($request->validated()));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateCategoryRequest $request
     * @param \App\Models\Category  $category
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Category $category
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
}
