<?php

declare(strict_types = 1);

namespace App\Http\Controllers;

use App\Http\Requests\MassStoreStatementRequest;
use App\Http\Requests\StoreStatementRequest;
use App\Http\Requests\UpdateStatementRequest;
use App\Http\Resources\StatementResource;
use App\Models\Statement;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class StatementController extends Controller
{
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
        // $user = $this->auth->user();
        return StatementResource::collection(Statement::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreStatementRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStatementRequest $request)
    {
        //
    }

    /**
     * Store multiple newly created resources in storage.
     *
     * @param \App\Http\Requests\MassStoreStatementRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function massStore(MassStoreStatementRequest $request)
    {
        Statement::insert($request->validated());
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Statement $statement
     *
     * @return \Illuminate\Http\Response
     */
    public function show(Statement $statement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Statement $statement
     *
     * @return \Illuminate\Http\Response
     */
    public function edit(Statement $statement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateStatementRequest $request
     * @param \App\Models\Statement                     $statement
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStatementRequest $request, Statement $statement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Statement $statement
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Statement $statement)
    {
        //
    }
}
