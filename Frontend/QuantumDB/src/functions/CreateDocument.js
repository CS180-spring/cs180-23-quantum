import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SuccessNotification = (theme, name) => toast.success('Document: ' + name +' Created!', {
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

export function CreateDocument(theme,name,path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-224-39-255.us-east-2.compute.amazonaws.com:8000/create/'
    const url = base + name +'/' + path + '/file'
    if (name === ""){
        WarningNotification(theme,'Please fill out the file name.');
    } else if (name.includes('.json')){
        WarningNotification(theme,'Please remove extension from name.');
    } else {
        axios.get(url)
        .catch(error=>WarningNotification(theme,error))
        .then(res=>{console.log(res)})
        .then(SuccessNotification(theme, name))
    }
}