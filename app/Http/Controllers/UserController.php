<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUser;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
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
