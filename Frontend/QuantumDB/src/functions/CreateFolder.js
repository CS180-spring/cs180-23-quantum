import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
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

const WarningNotification = (theme) => toast.warn('Please fill out the folder name.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const ExtensionWarning = (theme) => toast.warn('Please remove extension from name.', {
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
    const base = 'http://ec2-3-145-4-143.us-east-2.compute.amazonaws.com:8000/create/'
    const url = base + name +'/' + path + '/folder'
    if (name === ""){
        WarningNotification(theme);
    } else if (name.includes('.json')){
        ExtensionWarning(theme);
    } else {
        fetch(url)
        .then(data=>{return data.json()})
        .then(res=>{console.log(res)})
        .then(SuccessNotification(theme, name))
    }
}