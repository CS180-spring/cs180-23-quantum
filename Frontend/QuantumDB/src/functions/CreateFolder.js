import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SuccessNotification = (theme, name) => toast.success('Folder: ' + name + ' Created!', {
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

export function CreateFolder(theme, name, path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-218-184-170.us-east-2.compute.amazonaws.com:8000/create/'
    const url = base + name +'/' + path + '/folder'
    if (name === ""){
        WarningNotification(theme,'Please fill out the file name.');
    } else if (name.includes('.json')){
        WarningNotification(theme,'Please remove extension from name.');
    } else {
        axios.get(url)
        // .then(response=>{if (response.status != 200) {
        //     WarningNotification(theme,response.status)
        // }else {
        //     SuccessNotification(theme, name)
        // }})
        .catch(error=>WarningNotification(theme,error))
        .then(SuccessNotification(theme, name))
    }
}