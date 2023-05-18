import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SuccessNotification = (theme, name) => toast.success('File: ' + name + ' Deleted!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const WarningNotification = (theme, err) => toast.warn(err, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});


export async function DeleteFolder(theme, name, path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-218-184-170.us-east-2.compute.amazonaws.com:8000/delete/'
    const url = base + name +'/' + path + '/folder'
    axios.get(url)
    .catch(error=>WarningNotification(theme,error))
    .then(res=>{console.log(res)})
    .then(SuccessNotification(theme,name))
}