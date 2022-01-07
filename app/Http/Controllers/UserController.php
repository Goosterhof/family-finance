<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUser;
use App\Http\Requests\UpdateUser;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'users' => UserResource::collection(User::get()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUser $request)
    {
        $validated = $request->validated();

        $user = User::where('token', $validated['token'])->first();
        $user->first_name = $validated['first_name'];
        $user->last_name = $validated['last_name'];
        $user->email = $user->email;
        $user->password = bcrypt($validated['password']);
        $user->company_id = $user->company_id;
        $user->email = $validated['email'];
        $user->active = 1;
        $user->save();


        return response()->json(['message' => 'U bent succesvol geregistreerd! Welkom!']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateUser $request
     * @param User       $user
     *
     * @return UserResource
     */
    public function update(UpdateUser $request, User $user): UserResource
    {
        $user->update($request->validated());

        return new UserResource($user);
    }
}
