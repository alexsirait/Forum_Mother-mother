import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function Pagination({meta}) {
  return (
    //'!' importent supaya dapat ditimpa
    <div className='flex items-center gap-x-1 !mb-10'> 
        {meta.links.map((link, key) => {
            return (
                link.url == null ? <span key={key} className='text-gray-500 mx-4' dangerouslySetInnerHTML={{  __html: link.label }}/> : 
                <Link 
                    className={`${link.active && 'text-blue-500'} px-5 py-2 shadow rounded-lg bg-white`}
                    key={key} href={link.url || ''} 
                    dangerouslySetInnerHTML={{ __html: link.label }} 
                />
            )
        })}
    </div>
  )
}
