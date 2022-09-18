<?php

declare(strict_types = 1);

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUser;
use App\Http\Requests\RegisterUser;
use App\Http\Resources\LoggedInUserResource;
use App\Http\Responses\NoContentResponse;
use App\Models\Family;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use PHPOpenSourceSaver\JWTAuth\JWTAuth;

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
     * @return JsonResponse
     */
    public function login(LoginUser $request): JsonResponse
    {
        $validated = $request->validated();

        return $this->loginByCredentials($validated['email'], $validated['password'], $validated['rememberMe']);
    }

    /**
     * Register a new user and login immediatly
     *
     * @param RegisterUser $request
     *
     * @return JsonResponse
     */
    public function register(RegisterUser $request): JsonResponse
    {
        $validated = $request->validated();

        $family = Family::create(['name' => $validated['family']]);

        User::create([
            'firstName' => $validated['firstName'],
            'lastName' => $validated['lastName'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'familyId' => $family->id,
        ]);

        return $this->loginByCredentials($validated['email'], $validated['password'], $validated['rememberMe']);
    }

    /**
     * Get the authenticated User.
     *
     * @return LoggedInUserResource
     */
    public function me(): LoggedInUserResource
    {
        return new LoggedInUserResource($this->auth->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return NoContentResponse
     */
    public function logout(): NoContentResponse
    {
        $this->auth->invalidate();
        return new NoContentResponse;
    }

    /**
     * Login by the given credentials
     *
     * @param string $email
     * @param string $password
     * @param bool   $rememberMe
     *
     * @return JsonResponse
     */
    private function loginByCredentials(string $email, string $password, bool $rememberMe): JsonResponse
    {
        $jwtTtl = $rememberMe ? self::JWT_TTL_REMEMBER : config('jwt.ttl');
        $this->auth->factory()->setTTL($jwtTtl);

        $credentials = ['email' => $email, 'password' => $password];
        $token = $this->auth->attempt($credentials);

        if (!$token) {
            return new JsonResponse(
                [
                    'message' => 'E-mail of wachtwoord is onjuist',
                    'errors' => [
                        'password' => [
                            'probeer het opnieuw, of klik hieronder op "wachtwoord vergeten"',
                        ],
                    ],
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        return (new JsonResponse(new LoggedInUserResource($this->auth->user())))
            ->cookie('Authorization', "Bearer {$token}", $jwtTtl, $secure = true);
    }
}
