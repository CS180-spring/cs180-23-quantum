import React from 'react'
import { CreateFolder } from '../functions/CreateFolder'
import { CreateDocument } from '../functions/CreateDocument'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext';

function create(theme){
    if (document.getElementById('folder').checked){
        CreateFolder(theme,document.getElementById('name').value);
    } else {
        CreateDocument(theme,document.getElementById('name').value);
    }
}

const Operations = () => {
    const {theme} = useContext(ThemeContext)
    return (
    <div className='flex justify-around items-center space-x-3'>
        <div className="w-48">
        <input type="text" placeholder="Name" id='name' className="input input-bordered w-full max-w-xs"/>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text mr-2">Folder</span> 
            <input type="radio" id='folder' name="radio-10" className="radio checked:bg-red-500" checked />
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text mr-2">File</span> 
            <input type="radio" id='file' name="radio-10" className="radio checked:bg-blue-500" checked />
        </label>
        </div>
        <button onClick={(e) => create(theme)} className='bg-darkPurple rounded p-3 text-white'>Create</button>
    </div>
    )
}

export default Operations
