<?php

use App\Models\Reply;
use App\Models\Thread;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->thread = Thread::factory()->create();
});

test('can be reply by authenticated user', function () {
    $this->actingAs($this->user)->post(route('replies.store', $this->thread->slug), [
        'body' => 'comentarkan lah . . .',
    ])->assertRedirect();
    expect($this->thread->replies->count())->toEqual(1);
});

test('can not be reply by unauthenticated user', function () {
    $this->post(route('replies.store', $this->thread->slug), [
        'body' => 'comentarkan lah . . .',
    ])->assertRedirect(route('login'));
    $this->assertGuest();
});

test('will be redirect to 404 page if thread does not exists', function () {
    $this->actingAs($this->user)->post(route('replies.store', 12346785), [
        'body' => 'comentarkan lah . . .',
    ])->assertStatus(404);
});

test('can not be reply if authenticated user does not fill the body field', function () {
    $response = $this->actingAs($this->user)->post(route('replies.store', $this->thread->slug), []);
    $response->assertRedirect()->assertSessionHasErrors();
});

test('reply can be reply', function () {
    $reply = Reply::factory()->create(['thread_id' => $this->thread->id, 'user_id' => $this->user->id]);

    $anotherUser = User::factory()->create();

    $this->actingAs($anotherUser)->post(route('replies.store', $this->thread->slug), [
        'body' => 'istis a cchilderen',
        'parent_id' => $reply->id
    ]);

    expect($reply->children->count())->toEqual(1);
});