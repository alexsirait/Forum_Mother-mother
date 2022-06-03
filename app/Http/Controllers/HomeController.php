<?php

namespace App\Http\Controllers;

use App\Http\Resources\ThreadResource;
use App\Models\Thread;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $threads = Thread::query()->with(['category', 'user'])->latest()->limit(9)->get();
        return inertia('Home', [
            'threads' => ThreadResource::collection($threads),
        ]);
    }
}
