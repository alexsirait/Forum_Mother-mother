<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;

class LikeController extends Controller
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
    public function __invoke(Request $request)
    {
        $key = $request->keys()[0]; // thread || reply //keys() itu didapat dari properti data html
        abort_if(!$request->hasAny(['thread', 'reply']), 404);

        $fullNameSpaceOfTheModel = 'App\Models\\' . Str::studly($key);
        $model = $fullNameSpaceOfTheModel::find($request->get($key));
        $toggle = $model->likes()->where('user_id', $request->user()->id)->exists() ? 'delete' : 'save';
        if($toggle == 'delete'){
            $model->likes()->where('user_id', $request->user()->id)->delete();
        } else{
            $request->user()->likes()->$toggle($model->likes()->make());
        }

        return back();
    } 
}
