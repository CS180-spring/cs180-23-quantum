import React from 'react'
import { CreateFolder } from '../functions/CreateFolder'
import { CreateDocument } from '../functions/CreateDocument'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext';
import { useParams } from "react-router";

function create(theme,path,update){
    if (document.getElementById('folder').checked){
        CreateFolder(theme,document.getElementById('name').value,path);
    } else {
        CreateDocument(theme,document.getElementById('name').value,path);
    }
    update();
}

const Operations = (props) => {
    let { id } = useParams();
    const {theme} = useContext(ThemeContext)
    return (
    <div className='flex justify-around items-center space-x-3'>
        <div className="w-48">
        <input type="text" placeholder="Name" id='name' className="input input-bordered w-full max-w-xs"/>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text mr-2">Folder</span> 
            <input type="radio" id='folder' name="radio-10" className="radio checked:bg-red-500" defaultChecked />
        </label>
        </div>
        <div className="form-control">
        <label className="label cursor-pointer">
            <span className="label-text mr-2">File</span> 
            <input type="radio" id='file' name="radio-10" className="radio checked:bg-blue-500" defaultChecked />
        </label>
        </div>
        <button onClick={(e) => create(theme,id, props.refresh)} className='bg-darkPurple rounded p-3 text-white'>Create</button>
    </div>
    )
}

export default Operations
