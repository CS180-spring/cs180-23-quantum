import React, { useContext } from 'react'
import {ThemeContext} from './ThemeContext'
import { motion } from "framer-motion";
import { AiOutlineEdit, AiOutlineSave, AiOutlineDelete} from "react-icons/ai";
import { IoMdClose } from "react-icons/io"

const Folder = (props) => {
    const {theme} = useContext(ThemeContext)
    const [editState, setEditState] = React.useState(false)
  return (
    <>
    {!props.name.includes('.json') ?
    <> 
    {editState === false ?
        <div className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <a className='flex items-center' href={'/database/' + props.name} >
            <>
            { theme === 'dark' ? 
                <svg fill="white" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                :
                <svg fill="black" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                }
            </>
            <h3 className='ml-5 text-stone-700 dark:text-white'> {props.name}</h3>
            </a>
            <div className=''>
            <button onClick={(e) => setEditState(true)} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineEdit/></button>
            </div>
        </div>
        :
        <motion.div style={{opacity:0.6}} className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <div className='flex items-center'>
            <>
            { theme === 'dark' ? 
                <svg fill="white" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                :
                <svg fill="black" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"></path></svg>
                }
            </>
            <input id='new-folder-name' placeholder={props.name} className='ml-5 w-1/2 p-1 rounded-md text-stone-700 dark:text-white'></input>
            </div>
            <div className='flex space-x-1'>
              <button onClick={(e) => setEditState(false)} className='bg-green-700 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineSave/></button>
              <button onClick={(e) => setEditState(false)} className='bg-red-800 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineDelete/></button>
              <button onClick={(e) => setEditState(false)} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><IoMdClose/></button>
            </div>
        </motion.div>
    }
    </>
    :
        <></>
    }
    </>
  )
}

export default Folder