import React, { Fragment } from 'react'
import { Link, usePage  } from '@inertiajs/inertia-react'
import { Menu, Transition } from '@headlessui/react'

const NavLink = ({ as = 'a', method = 'get', className = '', href, children  }) => {
  return (
    <Link className={`${className} py-6 block`} as={as} method={method} href={href} >{children}</Link>
  )
}

const DropdownLink = ({ as = 'a', method = 'get', className = '', href, children  }) => {
  return (
    <Menu.Item>
      <Link className={`${className} w-full text-left px-2 py-2 block text-sm hover:bg-gray-100`} as={as} method={method} href={href} >{children}</Link>
    </Menu.Item>
  )
}

export default function Navbar() {
  const { auth } = usePage().props 
  return (
    <div className='bg-white border-b shadow-sm'>
      <div className="container">
        {/* Mobile */}

        <Menu as='div' className='flex lg:hidden items-center justify-between h-14 py-2' >
          <Link className='text-black uppercase font-semibold' href='/'>Forum</Link>
          <Menu.Button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
          <Menu.Items as={`div`} className='divide-y bg-white py-0.5 w-52 right-12 top-4 rounded-lg z-50 absolute shadow-sm border'>
              <div className='py-0.5'>
                <DropdownLink href={`/`}>Home</DropdownLink>
                <DropdownLink href={`/threads`}>Threads</DropdownLink>
              </div>
                { auth.user ? (
                  <>
                    <div className='py-0.5'>
                      <DropdownLink href={`/`} className="flex items-center gap-x-2" >
                        <div className='flex-shrink-0'>
                          <img className='w-6 h-6 rounded-full' src={auth.user.picture} alt={auth.user.name} />
                        </div>
                        <div>
                          {auth.user.name}
                        </div>
                      </DropdownLink>
                      <DropdownLink href={`/dashboard`}>Dashboard</DropdownLink>

                    </div>
                    <div className='py-0.5'>
                      <DropdownLink href='/threads?filtered=mine'>
                              My Question
                      </DropdownLink>
                      <DropdownLink href='/threads?filtered=participation'>
                              My Participation
                      </DropdownLink>
                      <DropdownLink href='/threads?filtered=answer'>
                              My Answer
                      </DropdownLink>
                    </div>
                    <DropdownLink href={`/logout`} as='button' method='post'>Logout</DropdownLink>
                  </>
                ) : (
                  <div className='py-0.5'>
                    <DropdownLink href={`/login`}>Login</DropdownLink>
                    <DropdownLink href={`/register`}>Register</DropdownLink>
                  </div>
                ) }
          </Menu.Items>
          </Transition>
        </Menu>

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between">
          <ul className="flex items-center gap-x-8">
            <li><NavLink className='font-semibold text-black uppercase' href='/'>Forum</NavLink></li>
            <li><NavLink href='/'>Home</NavLink></li>
            <li><NavLink href='/threads'>Threads</NavLink></li>
            { auth.user ? <li><NavLink href='/dashboard'>Dashboard</NavLink></li> : '' }
          </ul>
          { auth.user ? (
            <ul className="flex items-center gap-x-8">
              <li><NavLink href='/'>{auth.user.name}</NavLink></li>
              <li><NavLink href='/logout' method='post' as='button'>Logout</NavLink></li>
            </ul>
          ) : (
            <ul className="flex items-center gap-x-8">
              <li><NavLink href='/login'>Login</NavLink></li>
              <li><NavLink href='/register'>Register</NavLink></li>
            </ul>
          ) }
          
        </div>      
      </div>
    </div>
  )
}
