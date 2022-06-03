import Pagination from '@/Components/Pagination';
import Forum from '@/Layouts/Forum';
import { Inertia } from '@inertiajs/inertia';
import { Link, usePage } from '@inertiajs/inertia-react';
import { debounce, pickBy } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react'
import Filter from "@/Components/Filter";
import { Menu } from '@headlessui/react';

const menus = [
  { label: 'Latest', value: 'latest' },
  { label: 'oldest', value: 'oldest' },
  { label: 'line', value: '' },
  { label: 'My Question', value: 'mine' },
  { label: 'My Perticipation', value: 'participation' },
  { label: 'My Answer', value: 'answer' },
  { label: 'line', value: '' },
  { label: 'Popular this week', value: 'popular-this-week' },
  { label: 'Popular all time', value: 'popular' },
  { label: 'line', value: '' },
  { label: 'Solved', value: 'solved' },
  { label: 'Unsolved', value: 'unsolved' },
  { label: 'line', value: '' },
  { label: 'No Replies', value: 'no-reply' },
];

const ThreadSetting = ({ thread }) => {
  return (
    <Menu as={`div`} className='relative'>
      <Menu.Button>
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
      </Menu.Button>
      <Menu.Items as='div' className={`absolute right-0 mr-4 bg-white w-52 border shadow-sm rounded-lg overflow-hidden py-0.5 top-0`}>
        <Menu.Item>
          <Link className='py-2.5 px-4 block hover:bg-gray-50' href={`/threads/${thread.slug}/edit`}>
            Edit
          </Link>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  )
}

export default function Index(props) {
    const {filter, categories, auth} = props 
    const { data: threads, meta } = props.threads
    const [ keyword, setKeyword ] = useState(filter.search)

    const reload = useCallback(
      debounce((q) => {
          Inertia.get('/threads', pickBy({ search: q, page: filter.page, category: filter.category, filtered: filter.filtered }), { preserveState: true })
      }, 500)
    , [])

    useEffect(() => {
      reload(keyword)
    }, [keyword])

  return (
    <div className='space-y-4'>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full">
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
          <Menu as='div' className='relative'>
            <Menu.Button className='capitalize focus:outline-none bg-white rounded-lg px-4 w-full lg:w-52 py-2 shadow flex items-center justify-between'>
            { filter.filtered == 'popular-this-week' ? 'Popular This Week' : filter.filtered == 'no-replies' ? 'No Replies' : !filter.filtered ? 'Filter' : filter.filtered } 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Menu.Button>
            <Menu.Items className='absolute mt-1 w-52 z-50 bg-white shadow rounded-lg overflow-hidden py-0.5'>
              {menus.map((menu, key) => {
                return menu.label == 'line' ? <div key={key} className='h-px bg-gray-200 my-0.5 w-full'></div> : (
                  <Menu.Item key={key}>
                      <Link
                        className={`block px-4 py-2 hover:bg-gray-100 font-medium capitalize text-sm`}
                        href={`/threads?filtered=${menu.value}`}
                        preserveState
                      >
                        {menu.label}
                      </Link>
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Menu>
          <Filter categories={categories} initialState={filter.category} />
        </div>
        <div className='bg-white flex overflow-hidden items-center rounded-lg shadow px-2 border-gray-200'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder='Search . . .' name='search' value={keyword} onChange={(e) => setKeyword(e.target.value)} className='h-10 p-0 focus:ring-transparent focus:border-transparent border-0' />
        </div>
      </div>
        {threads.length ? threads.map(thread => (
            <div key={thread.id} className="bg-white flex gap-x-4 mb-8 p-4 rounded-lg shadow" >
                <div className='flex-shrink-0'>
                  <img className='w-10 h-10 rounded-full' src={thread.user.picture} alt={thread.user.name} />
                </div>
                <div className='w-full'>
                  <div className="flex items-center justify-between">
                    <Link href={route('threads.show', thread.slug)}>
                      <h1>{thread.title}</h1>
                    </Link>
                    {auth.user.id == thread.user.id && 
                      <ThreadSetting thread={thread} />
                    }
                  </div>
                  <div className="leading-relexed text-sm mb-3 text-gray-500">
                    {thread.teaser}
                  </div>
                <div className="flex items-center justify-between">
                  <div className='flex items-center gap-x-4 text-sm'>
                      <div className='text-blue-500 font-semibold'>{thread.user.name}</div>
                      <Link href={`/threads?category=${thread.category.slug}`} className='hidden md:block text-gray-500 font-semibold text-sm'>{thread.category.name}</Link>
                      <span className='text-gray-500 hidden md:block'>{thread.created_at}</span>
                  </div>
                  <div className='flex items-center text-sm gap-x-4'>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-1">{thread.likes_count}</span>
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      <span className='ml-1'>{thread.replies_count}</span>
                    </span>
                  </div>
                </div>
                </div>
            </div>
        )) : (
          <div className="bg-white border border-dashed p-10 text-center text-gray-800 rounded-2xl">
            No threads.
          </div>
        )}

        <Pagination meta={meta} />
    </div>
  )
}

Index.layout = page => <Forum children={page} title="Thread"/>
