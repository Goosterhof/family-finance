<?php

namespace App\Exceptions;

use Illuminate\Http\Response;

class TokenException extends CustomException
{

    protected $responseCode = Response::HTTP_UNAUTHORIZED;
}
