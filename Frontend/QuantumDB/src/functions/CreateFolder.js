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

export function CreateFolder(theme, name) {
    const Http = new XMLHttpRequest();
    const url='https://-/create/name/path/type';
    Http.open("GET", url);
    Http.send();
    if (name === ""){
        WarningNotification(theme);
    } else {
        SuccessNotification(theme, name);
    }
    Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    }
}