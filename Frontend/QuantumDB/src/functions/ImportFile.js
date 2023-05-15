import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SuccessNotification = (theme, name) => toast.success('File: ' + name + ' Saved!', {
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

export function ImportFile(theme, name, path, type, content) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-218-184-170.us-east-2.compute.amazonaws.com:8000/import/'
    const url = base + name +'/' + path + '/' + type + '/' + content
        axios.get(url)
        .catch(error=>WarningNotification(theme,error))
        .then(SuccessNotification(theme, name))
}