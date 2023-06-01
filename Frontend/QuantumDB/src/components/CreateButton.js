import React from 'react'
import { CreateFolder } from '../functions/CreateFolder'
import { CreateDocument } from '../functions/CreateDocument'
import { ImportFile } from '../functions/ImportFile'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext';
import { useParams } from "react-router";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineFolderAdd, AiOutlineFileAdd} from "react-icons/ai";
import { IoMdAdd, IoMdClose } from "react-icons/io"
import { motion } from 'framer-motion'

const CreateButton = (props) => {
    let { id } = useParams();
    const {theme} = useContext(ThemeContext)
    const [create, setCreate] = React.useState(false)
    const [file, setFile] = React.useState(false)
    const [folder, setFolder] = React.useState(false)
    const [imp, setImp] = React.useState(false)
    const [drag, setDrag] = React.useState(null);
    const fileTypes = ["JSON"];

    const logFile = () => {
        drag?.text().then((response) => console.log(response));
    };
    
    const handleChange = (file) => {
        setDrag(file);
    };

    React.useEffect(() => {
        if (drag !== null){
            logFile();
            drag?.text().then((response) => ImportFile(theme, drag?.name.split(".")[0],id,'file',response.replace(' ','')));
            setDrag(null);
        }
      }, [drag]);

    return (
        <div className='flex items-center justify-center space-x-1'>
        { create === false ?
        <>
            <motion.button whileHover={{scale:1.1}} onClick={(e) => setCreate(true)} className='bg-darkPurple rounded p-3 text-white w-12 flex justify-center items-center'><IoMdAdd/></motion.button>
        </>
        :
        <div className="grid space-y-1 w-36">
            { file === false ?
                <motion.button whileHover={{scale:1.1}} onClick={(e) => {setFile(true); setFolder(false)}} className='bg-darkPurple rounded p-3 w-36 text-white'>Create File</motion.button>
            :
                <div className='flex space-x-1'>
                    <input placeholder='File Name' id='file-name' className='bg-darkPurple w-36 rounded p-3 text-white'></input>
                    <button onClick={(e) => {CreateDocument(theme,document.getElementById('file-name').value,id); setFile(false); props.refresh()}} className='bg-green-700 flex justify-center items-center rounded p-3 w-12 text-white'> <AiOutlineFileAdd/> </button>
                </div>
            }
            { folder === false  ?
                <motion.button whileHover={{scale:1.1}} onClick={(e) => {setFile(false); setFolder(true)}} className='bg-darkPurple rounded p-3 w-36 text-white'>Create Folder</motion.button>
            :
                <div className='flex space-x-1'>
                    <input id='folder-name' placeholder='Folder Name' className='bg-darkPurple w-36 rounded p-3 text-white'></input>
                    <button onClick={(e) => {setFolder(false); CreateFolder(theme,document.getElementById('folder-name').value,id); props.refresh()}} className='bg-green-700 flex justify-center items-center rounded p-3 w-12 text-white'> <AiOutlineFolderAdd/> </button>
                </div>
            }
            { imp === false  ?
                <motion.button whileHover={{scale:1.1}} onClick={(e) => {setFile(false); setFolder(false); setImp(true)}} className='bg-darkPurple rounded p-3 w-36 text-white'>Import File</motion.button>
            :
                <div className='flex space-x-1'>
                    <FileUploader handleChange={handleChange} id="file" name="file" types={fileTypes} />
                </div>
            }
            <motion.button whileHover={{scale:1.1}} onClick={(e) => {setCreate(false); setFile(false); setFolder(false); setImp(false); props.refresh()}} className='bg-darkPurple flex justify-center items-center rounded p-3 text-white w-12'><IoMdClose/></motion.button>
        </div>
        }
        </div>
    )
}

export default CreateButton