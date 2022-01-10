<?php

namespace App\Http\Resources;

class LoggedInUserResource extends UserResource
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

        $userData = parent::toArray($request);

        $userData['family'] = $this->family->name;
        $userData['family_users'] = UserResource::collection($this->family->users);

        return $userData;
    }
}
