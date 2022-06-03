import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import Button from './Button'

export default function ReplyBlock({ reply, auth, thread, data, setData, ShowReplyForm, replyStoreHandler, handleChange }) {
  return (
    <div>
        <div className="flex gap-x-4 bg-white p-4 my-2.5 lg:my-4 rounded-lg shadow">
            <img src={reply.user.picture} alt={reply.user.name} className="w-8 h-8 rounded-full mt-1" />
            <div>
                <h4 className="text-sm font-medium">
                    {reply.user.name}
                </h4>
                <div>{reply.body}</div>
                <div className="flex items-center gap-x-4">
                    <span className="text-gray-500 text-xs">
                        {reply.created_at}
                    </span>
                    {reply.likes_count}
                    {auth.user && (
                        <>
                            <Link href={route('likes.store')} method='post' data={{ reply: reply.id }} as='button' preserveScroll>
                                Like
                            </Link>
                            {thread.data.answer_id == reply.id && (
                                <div className="bg-green-500 text-white px-2 py-1 rounded">
                                    Best
                                </div>
                            )}
                            {auth.user.id == thread.data.user.id && (
                                <Link href={route('answer.store',  thread.data.slug)} data={{ answer_id: reply.id }} method="post" as="button" preserveScroll >
                                    Mark as Best
                                </Link>
                            )}
                        </>
                    )}
                    {auth.user && reply.parent_id == null ?
                        <button className="text-gray-500 text-xs" onClick={() => ShowReplyForm(reply)} >
                            Reply
                        </button> : ''
                    }
                </div>
                { reply.children.length ? reply.children.map(child => (<ReplyBlock key={child.id} {...{ reply: child, thread, auth, data, setData, ShowReplyForm, replyStoreHandler, handleChange }} />)) : '' }
                {data.parent_id ? data.parent_id == reply.id && (
                    <form onSubmit={replyStoreHandler}>
                    <div className="mb-5">
                        <textarea className='bg-white w-full rounded-lg shadow resize-none border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-100 transition duration-200' name="body" value={data.body} onChange={handleChange} />
                    </div>
                    <button onClick={() => setData({...data, parent_id: ''})}>Cancel</button>
                    <Button>Reply</Button>
                </form>
                ) : ''}
            </div>
        </div>
    </div>
  )
}
