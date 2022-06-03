<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function __construct()
    {
        return $this->middleware('auth');
    }
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Thread $thread)
    {
        abort_if($thread->user_id != $request->user()->id, 403);
        $thread->update([
            'answer_id' => $request->answer_id,
        ]);
        return back();
    }
}
