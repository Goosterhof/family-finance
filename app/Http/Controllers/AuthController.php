<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUser;
use App\Http\Resources\LoggedInUserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private const JWT_TTL_REMEMBER = 60 * 24 * 7;

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
     * Get a JWT via given credentials.
     *
     * @param LoginUser $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUser $request)
    {
        $credentials = $request->validated();

        $jwtTtl = $credentials['rememberMe'] ? self::JWT_TTL_REMEMBER : config('jwt.ttl');
        $this->auth->factory()->setTTL($jwtTtl);

        unset($credentials['rememberMe']);

        $token = $this->auth->attempt($credentials);

        if (!$token) {
            return new JsonResponse(
                [
                    'message' => 'E-mail of wachtwoord is onjuist',
                    'errors' => [
                        'password' => [
                            'probeer het opnieuw, of klik hieronder op "wachtwoord vergeten"'
                        ]
                    ]
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY
            );
        }

        return (new JsonResponse(new LoggedInUserResource($this->auth->user())))
            ->cookie('Authorization', "Bearer {$token}", $jwtTtl, $secure = true);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return new JsonResponse(new LoggedInUserResource($this->auth->user()));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return integer
     */
    public function logout(): int
    {
        $this->auth->invalidate();
        return Response::HTTP_NO_CONTENT;
    }
}
