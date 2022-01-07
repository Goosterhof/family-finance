<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class CustomException extends Exception
{

    protected $responseCode = Response::HTTP_INTERNAL_SERVER_ERROR;
    /**
     * Render the exception into an HTTP response.
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json(['message' => $this->message], $this->responseCode);
    }
}
