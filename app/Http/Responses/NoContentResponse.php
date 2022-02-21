<?php

namespace App\Http\Responses;

use Illuminate\Http\Response;

class NoContentResponse extends Response
{
    /**
     * Construct a new no content response
     */
    public function __construct()
    {
        parent::__construct('', Response::HTTP_NO_CONTENT);
    }
}
