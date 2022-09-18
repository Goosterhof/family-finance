<?php

declare(strict_types = 1);

namespace App\Http\Middleware;

use App\Exceptions\TokenException;
use Closure;
use Exception;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use PHPOpenSourceSaver\JWTAuth\Http\Middleware\BaseMiddleware;

// TODO :: refactor
class Authenticate extends BaseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @throws TokenException
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // TODO :: not the best way. but it works
        if ($cookie = $request->cookie('Authorization')) {
            $request->headers->set('Authorization', $cookie);
        }

        try {
            $this->auth->parseToken()->authenticate();
        } catch (Exception $e) {
            $status = 'Authorization Token niet gevonden';
            if ($e instanceof TokenInvalidException) {
                $status = 'Authorization Token is niet geldig';
            } elseif ($e instanceof TokenExpiredException) {
                $status = 'Authorization Token is verlopen';
            }
            throw new TokenException($status);
        }
        return $next($request);
    }
}
