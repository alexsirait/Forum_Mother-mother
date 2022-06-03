<?php

use App\Models\Category;
use App\Models\Thread;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

test('an authenticated user can create new thread', function () {
    $thread = Thread::factory()->make();
    $response = $this->actingAs($this->user)->post(route('threads.store'), $thread->toArray());
    $response->assertRedirect();
});

test('an authenticated user can not create new thread if he does not fill anything required', function(){
    $response = $this->actingAs($this->user)->post(route('threads.store'), [
        'title' => '',
    ]);
    $response->assertRedirect();
});

test('a guest can not create new thread', function(){
    $thread = Thread::factory()->make();
    $response = $this->post(route('threads.store'), $thread->toArray());
    $response->assertRedirect(route('login'));
    expect($response->getStatusCode())->toEqual(302);
    $this->assertGuest();
});

it('can be update by the owner of the thread', function() {
    $this->withoutExceptionHandling();
    $thread = Thread::factory()->create(['user_id' => $this->user->id]);
    expect($thread->user_id)->toEqual($this->user->id);
    $response = $this->actingAs($this->user)->put(route('threads.update', $thread->slug), [
        'title' => 'Thread Update',
        'body' => 'Ok. the body is updated',
        'category_id' => Category::factory()->create()->id,
    ]);
    $response->assertRedirect();
});

it('it can not be updated if he does not fill anything required', function () {
    $thread = Thread::factory()->create(['user_id' => $this->user->id]);
    expect($thread->user_id)->toEqual($this->user->id);
    $response = $this->actingAs($this->user)->put(route('threads.update', $thread->slug), []);
    $response->assertRedirect()->assertSessionHasErrors();
});

it('it can not be updated if he does not own the thread', function () {
    $thread = Thread::factory()->create();
    $response = $this->actingAs($this->user)->put(route('threads.update', $thread->slug), []);
    expect($response->status())->toEqual(403);
});

it('can be deleted if he the owner of the thread', function () {
    $thread = Thread::factory()->create([ 'user_id' => $this->user->id ]);
    expect($thread->user_id)->toEqual($this->user->id);
    $response = $this->actingAs($this->user)->delete(route('threads.destroy', $thread->slug));
    $response->assertRedirect();
    $this->assertDeleted($thread);
});

it('can not be deleted if he does not own the thread', function () {
    $thread = Thread::factory()->create();
    $response = $this->actingAs($this->user)->delete(route('threads.destroy', $thread->slug));
    expect($response->status())->toEqual(403);
});

