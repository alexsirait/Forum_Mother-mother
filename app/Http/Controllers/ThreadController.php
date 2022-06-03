<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReplyResource;
use App\Http\Resources\ThreadResource;
use App\Models\Category;
use App\Models\Like;
use App\Models\Thread;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except(['index', 'show']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (in_array($request->filtered, [ 'mine', 'participation', 'answer' ])) {
            abort_if(!Auth::check(), 401);
        }
        $threads = Thread::query()->with(['category', 'user'])
                ->when($request->category, fn ($q, $slug) => $q->whereBelongsTo(Category::where('slug', $slug)->firstOr(fn() => abort(404))))
                ->when($request->search, fn ($q, $key) => $q->where('title', 'like', "%{$key}%"))
                ->when($request->filtered, function ($q, $value) {
                    switch ($value) {
                        case 'latest': $q->latest(); break;
                        case 'oldest': $q->oldest(); break;
                        case 'mine' : $q->whereBelongsTo(Auth::user()); break;
                        case 'participation' : $q->whereHas('replies', fn($r) => $r->whereBelongsTo(Auth::user())); break;
                        case 'answer' : $q->whereNotNull('answer_id')->whereBelongsTo(Auth::user()); break;
                        case 'popular' : $q->orderByDesc('replies_count'); break;
                        case 'popular-this-week' : $q->whereHas('replies', fn($r) => $r->whereBetween('created_at', [ now()->subDays(), now() ]))->orderByDesc('replies_count'); break;
                        case 'solved': $q->whereNotNull('answer_id'); break;
                        case 'unsolved': $q->whereHas('replies')->whereNull('answer_id'); break;
                        case 'no-reply' : $q->doesntHave('replies'); break;
                        
                        default: abort(404);break;
                    }
                })
                ;

        return inertia('Threads/Index', [
            'threads' => ThreadResource::collection($threads->latest()->paginate()->withQueryString()),
            'filter' => $request->only(['search', 'page', 'category', 'filtered']),
            'categories' => Category::get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Threads/Create', [
            'category' => Category::get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => ['required'],
            'body' => ['required'],
            'title' => ['required'],
        ]);

        $thread = $request->user()->threads()->create([
            'category_id' => $request->category_id,
            'title' => $title = $request->title,
            'slug' => Str::slug($title . '-' . Str::random(6)),
            'body' => $request->body,
        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function show(Thread $thread)
    {
        $thread = (new ThreadResource($thread->loadCount('likes')))->additional([
            'replies' => ReplyResource::collection($thread->replies()->withCount('likes')->whereNull('parent_id')->get())
        ]);
        return inertia('Threads/Show', [
            'thread' => $thread,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function edit(Thread $thread)
    {
        return inertia('Threads/Edit', [
            'thread' => $thread,
            'category' => Category::get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Thread $thread)
    {
        $this->authorize('update', $thread);
        
        $request->validate([
            'title' => ['required'],
            'body' => ['required'],
            'category_id' => ['required'],
        ]);

        $thread->update([
            'title' => $request->title,
            'body' => $request->body,
        ]);

        return redirect(route('threads.show', $thread));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Thread  $thread
     * @return \Illuminate\Http\Response
     */
    public function destroy(Thread $thread)
    {
        $this->authorize('delete', $thread);
        $thread->delete();
        return redirect(route('threads.index'));
    }
}
