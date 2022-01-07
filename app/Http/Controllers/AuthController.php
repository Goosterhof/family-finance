<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUser;
use App\Http\Resources\UserResource;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private const JWT_TTL_REMEMBER = 60 * 24 * 7;

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginUser $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUser $request)
    {
        $validated = $request->validated();

        $token = $this->guard()->attempt($validated);

        if (!$token) {
            return response()->json([
                'errors' => [
                    'password' => [
                        'Het ingevoerde wachtwoord is onjuist'
                        ]
                    ],
                    "message" => "Formulier bevat fouten"
                ], 422);
        }

        $jwtTtl = request('rememberMe') ? self::JWT_TTL_REMEMBER : config('jwt.ttl');

        $user = $this->guard()->user();

        $token = auth()->setTTL(self::JWT_TTL_REMEMBER)->login($user);

        $responseData = [
            'status' => 'success',
            'user' => new UserResource($user),
        ];

        return response()
            ->json($responseData, 200)->cookie('Authorization', "Bearer {$token}", $jwtTtl, $secure = true);
    }

    /**
     * Undocumented function
     *
     * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
     */
    private function guard()
    {
        return Auth::guard('api');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(['user' => new UserResource($this->guard()->user())]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return integer
     */
    public function logout(): int
    {
        Auth::logout();
        return Response::HTTP_NO_CONTENT;
    }
}
