import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessNotification = (theme, name) => toast.success('File successfully renamed!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const WarningNotification = (theme,err) => toast.warn(err, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

export async function UpdateDocument(theme,oldName,newName,path) {
    const base = 'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/update/'
    if ( path === undefined){
        path = 'database'
    }
    const url = base + oldName + '/' + newName + '/' + path + '/file'
    if (newName === ""){
        WarningNotification(theme, 'Please fill out the file name.');
    } else if (newName.includes('.json')){
        WarningNotification(theme, 'Please remove extension from name.');
    }
    else{
        axios.get(url)
        .catch(error=>WarningNotification(theme,error))
        .then(res=>{console.log(res)})
        .then(SuccessNotification(theme,oldName))
    }
}
