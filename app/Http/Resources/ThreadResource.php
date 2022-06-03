<?php

namespace App\Http\Resources;

use Illuminate\Support\Str;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'created_at' => $this->created_at->format('d F, Y'),
            'answer_id' => $this->answer_id,
            'likes_count' => $this->likes_count,
            'replies_count' => $this->replies_count,
            'teaser' => Str::limit($this->body, 180),
            'category' => [
                'name' => $this->category->name,
                'slug' => $this->category->slug,
                'id' => $this->category->id,
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                // 'picture' => $this->when(request()->routeIs('threads.show', $this->slug), $this->user->picture()),
                'picture' => $this->user->picture(),
            ]
        ];
    }
}
