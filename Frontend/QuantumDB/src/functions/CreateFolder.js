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
    const base = 'http://ec2-3-18-109-0.us-east-2.compute.amazonaws.com:8000/create/'
    const url = base + name +'/' + path + '/folder'
    if (name === ""){
        WarningNotification(theme,'Please fill out the file name.');
    } else if (name.includes('.json')){
        WarningNotification(theme,'Please remove extension from name.');
    } else {
        axios.get(url)
        .catch((error) => { // error is handled in catch block
            if (error.response) { // status code out of the range of 2xx
                if (error.response.status == 400){
                    WarningNotification(theme,"Failed to create folder: " + name)
                }
                if (error.response.status == 404){
                    WarningNotification(theme,"Folder already exists")
                }
                if (error.response.status == 403){
                    WarningNotification(theme,"Folder does not exist")
                }
            } 
            else if (error.request) { // The request was made but no response was received
                WarningNotification(theme,"No response received")
            } else {// Error on setting up the request
              console.log('Error', error.message);
            }
          })
        .then(SuccessNotification(theme, name))
    }
}