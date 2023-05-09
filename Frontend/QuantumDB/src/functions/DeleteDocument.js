import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessNotification = (theme, name) => toast.success('Folder: ' + name + ' Deleted!', {
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
    const base = 'http://ec2-3-130-207-24.us-east-2.compute.amazonaws.com:8000/delete/'
    const url = base + name +'/' + path + '/folder'
    if (name === ""){
        WarningNotification(theme);
    }
    else {
    axios.get(url)
    .then(SuccessNotification(theme, name))
    .catch(error => {
        element.parentElement.innerHTML = `Error: ${error.message}`;
        console.error('There was an error!', error);
    });
        
    }
}