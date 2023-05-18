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

export async function DeleteDocument(theme, name, path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-218-184-170.us-east-2.compute.amazonaws.com:8000/delete/'
    const url = base + name +'/' + path + '/file'
    axios.get(url)
    .catch((error) => { // error is handled in catch block
        if (error.response) { // status code out of the range of 2xx
            if (response.status == 400){
                WarningNotification(theme,"Failed to delete file: " + name)
            }
            if (response.status == 404){
                WarningNotification(theme,"File already exists")
            }
            if (response.status == 403){
                WarningNotification(theme,"File does not exist")
            }
        } 
        else if (error.request) { // The request was made but no response was received
            WarningNotification(theme,"No response received")
        }
      })
    .then(res=>{console.log(res)})
    .then(SuccessNotification(theme,name))
}