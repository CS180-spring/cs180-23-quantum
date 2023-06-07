import React from 'react'
import { motion } from "framer-motion";
import { AiOutlineSave, AiOutlineDelete, AiOutlineEdit, AiOutlineDownload} from "react-icons/ai";
import { IoMdClose } from "react-icons/io"
import { DownloadDocument } from '../functions/DownloadDocument';
import { DeleteDocument } from '../functions/DeleteDocument';
import { UpdateDocument } from '../functions/UpdateDocument';
import { ThemeContext } from '../components/ThemeContext';
import { useParams } from "react-router";

const Document = (props) => {
  let { id } = useParams();
  const [editState, setEditState] = React.useState(false)
  const {theme} = React.useContext(ThemeContext)

  return (
    <>
    {!props.name.includes('.json') ? 
        <></>
    :
    <> 
    {editState === false ?
      <motion.div whileHover={{scale:1.05}} className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-darkPurple dark:border-white truncate shadow-white shadow-sm'>
            {
              id === undefined ?
              <a className='flex items-center' href={ '/' + props.name.replace('.json','') + '/json'}>
              <h4 className='font-bold text-darkPurple dark:text-white mt-1 mb-1'>JSON</h4>
                  <h3 className='ml-5 text-stone-700 dark:text-white truncate'> {props.name.replace("database/",'')}</h3>
                  </a>
              :
              <a className='flex items-center' href={ '/' + id + '/' + props.name.replace('.json','') + '/json'}>
              <h4 className='font-bold text-darkPurple dark:text-white mt-1 mb-1'>JSON</h4>
                  <h3 className='ml-5 text-stone-700 dark:text-white truncate'> {props.name.replace("database/",'')}</h3>
                  </a>
            }
            <div className="flex space-x-1">
            <button onClick={(e) => DownloadDocument(theme, props.name.split(".")[0], id)}  className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineDownload /></button>
            <button onClick={(e) => setEditState(true)} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineEdit/></button>
            </div>
        </motion.div>
      :
      <motion.div className='flex justify-between border-2 p-3 rounded-md m-2 items-center border-darkPurple dark:border-white shadow-white shadow-sm'>
            <h4 className='font-bold text-darkPurple dark:text-white mt-1 mb-1'>JSON</h4>
            <input id='new-file-name' placeholder={props.name.split(".")[0]} className='w-1/3 p-1 rounded-md text-stone-700 dark:text-white'></input>
            <div className='flex space-x-1'>
              <button onClick={(e) => {UpdateDocument(theme, props.name.split(".")[0], document.getElementById('new-file-name').value, id, 'new-file-name'); props.refresh()}} className='bg-green-700 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineSave/></button>
              <button onClick={(e) => {DeleteDocument(theme, props.name.split(".")[0], id); props.refresh()}} className='bg-red-800 rounded p-2 text-white w-8 flex justify-center items-center'><AiOutlineDelete/></button>
              <button onClick={(e) => {setEditState(false); props.refresh()}} className='bg-darkPurple rounded p-2 text-white w-8 flex justify-center items-center'><IoMdClose/></button>
            </div>
      </motion.div>
    }
    </>
    }
    </>
  )
}

export default Document