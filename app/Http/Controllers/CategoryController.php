<?php

declare(strict_types = 1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Responses\NoContentResponse;
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
        return CategoryResource::collection(
            $user->family->categories()->whereNull('category_id')->get(),
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCategoryRequest $request
     *
     * @return NoContentResponse
     */
    public function store(StoreCategoryRequest $request): NoContentResponse
    {
        Category::create($request->validated());
        return new NoContentResponse;
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
