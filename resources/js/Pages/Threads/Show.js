import Reply from '@/Components/Reply'
import Forum from '@/Layouts/Forum'
import { Head, Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'

export default function Show({thread}) {
  const { auth } = usePage().props
  return (
    <div>
        <Head title={thread.data.title} />
        <div className='bg-white rounded-lg shadow'>
          <div className="flex p-6">
          <div className='flex-shrink-0 mr-3'>
            <img className='w-8 h-8 rounded-full' src={thread.data.user.picture} alt={thread.data.user.name} />
          </div>
          <div>
            <h1>{thread.data.title}</h1>
            <div>
                {thread.data.created_at}
            </div>
            <div className="leading-relaxed">
                {thread.data.body}
            </div>
          </div>
          </div>
          <div className="border-t px-6 py-3">
          { auth.user ? (
              <div className='flex items-center justify-between'>
                
                  <Link className='px-3 space-x-2 py-0.5 text-sm rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500 transition duration-200' href={route('likes.store')} method='post' data={{ thread: thread.data.id }} as='button' preserveScroll>
                    <span>Like</span>
                    <span>{thread.data.likes_count}</span>
                  </Link> 
                  { thread.data.user.id == auth.user.id && (
                  <Link href={route('threads.destroy', thread.data.slug)} method="delete" as='button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                      <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z" />
                    </svg>
                  </Link> )
                }
              </div>
            ) : '' }
          </div>
        </div>
          <Reply {...{auth, thread}} />
    </div>
  )
}

Show.layout = page => <Forum children={page} />
