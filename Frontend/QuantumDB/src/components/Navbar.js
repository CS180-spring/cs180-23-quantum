import React from 'react'
import Toggle from './ThemeToggle'

const Navbar = () => {
  return (
    <nav className='bg-white border-gray-200 mx-2 px-2 py-3 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex items-center mx-auto'>
          <span className='text-xl font-medium whitespace-nowrap dark:text-white ml-10'>
            Welcome
          </span>
        </div>

        <div className='flex justify-end'>
          <Toggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
