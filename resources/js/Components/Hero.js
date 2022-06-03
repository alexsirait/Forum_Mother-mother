import React from 'react'

export default function Hero({ children }) {
  return (
    <div className='bg-white shadow py-4 sm:py-10 lg:py-20 mb-16'>
        {children}
    </div>
  )
}
