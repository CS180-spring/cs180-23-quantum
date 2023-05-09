import React from 'react'
import { motion } from "framer-motion";
import { AiOutlineSave, AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import { IoMdAdd, IoMdClose } from "react-icons/io"

const Document = (props) => {
  const [editState, setEditState] = React.useState(false)

  return (
    <>
    {!props.name.includes('.json') ? 
        <></>
    :
    <> 
    {editState === false ?
      <div className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <a className='flex items-center' href='/database/json'>
            <h4 className='font-bold text-stone-700 dark:text-white mt-1 mb-1'>JSON</h4>
            <h3 className='ml-5 text-stone-700 dark:text-white'> {props.name.split(".")[0]}</h3>
            </a>
            <button onClick={(e) => setEditState(true)} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineEdit/></button>
        </div>
      :
      <motion.div style={{opacity:0.6}} className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-stone-700 dark:border-white'>
            <div className='flex items-center'>
            <h4 className='font-bold text-stone-700 dark:text-white mt-1 mb-1'>JSON</h4>
            <input id='new-file-name' placeholder={props.name.split(".")[0]} className='ml-5 w-1/2 p-1 rounded-md text-stone-700 dark:text-white'></input>
            </div>
            <div className='flex space-x-1'>
              <button onClick={(e) => setEditState(false)} className='bg-green-700 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineSave/></button>
              <button onClick={(e) => setEditState(false)} className='bg-red-800 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineDelete/></button>
              <button onClick={(e) => setEditState(false)} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><IoMdClose/></button>
            </div>
      </motion.div>
    }
    </>
    }
    </>
  )
}

export default Document