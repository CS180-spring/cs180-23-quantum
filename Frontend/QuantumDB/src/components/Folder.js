import React, { useContext } from 'react'
import {ThemeContext} from './ThemeContext'

const Folder = (props) => {
    const {theme} = useContext(ThemeContext)

  return (
    <>
    {!props.name.includes('.json') ? 
        <a href={'/database/' + props.name}>
            <div className='flex border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <>
            { theme === 'dark' ? 
                <svg fill="white" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                :
                <svg fill="black" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                }
            </>
            <h3 className='ml-5 text-stone-700 dark:text-white'> {props.name}</h3>
            </div>
        </a>
    :
        <></>
    }
    </>
  )
}

export default Folder