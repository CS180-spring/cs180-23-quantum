import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import Toggle from './ThemeToggle'

const Navbar = () => {
  const [title, setTitle] = React.useState('')
  const location = useLocation();

  useEffect(() => {
      if (window.location.pathname === '/'){
        setTitle('/')
      } else {
        setTitle(window.location.pathname.replace('-','/').replace('/json','.json'))
      }
  }, [location.pathname])
      
  return (
    <nav className='bg-offWhite border-gray-200 mx-2 px-2 py-3 rounded dark:bg-gray-800'>
      <div className='container flex justify-between items-center mx-auto pt-3'>
        <div className='flex items-center mx-auto'>
          <span className='text-xl font-medium whitespace-nowrap text-stone-700 dark:text-white ml-10'>
            ~{title}
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
