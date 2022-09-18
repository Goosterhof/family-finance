<?php

declare(strict_types = 1);

namespace App\Exceptions;

use Illuminate\Http\Response;

class TokenException extends CustomException
{
    protected $responseCode = Response::HTTP_UNAUTHORIZED;
}
