import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export async function UpdateFolder(theme,oldName,newName,path) {
    const base = 'http://ec2-18-220-45-239.us-east-2.compute.amazonaws.com:8000/update/'
    if ( path === undefined){
        path = 'database'
    }
    const url = base + oldName + '/' + newName + '/' + path + '/folder'
    if (newName === ""){
        WarningNotification(theme, 'Please fill out the folder name.');
    } else if (newName.includes('.json')){
        WarningNotification(theme, 'Please remove extension from name.');
    }
    else{
        axios.get(url)
        .catch((error) => { // error is handled in catch block
            if (error.response) { // status code out of the range of 2xx
                if (error.response.status === 400){
                    WarningNotification(theme,"Failed to update folder: " + oldName)
                }
                if (error.response.status === 404){
                    WarningNotification(theme,"Folder already exists")
                }
                if (error.response.status === 403){
                    WarningNotification(theme,"Folder does not exist")
                }
            } 
            else if (error.request) { // The request was made but no response was received
                WarningNotification(theme,"No response received")
            } else {// Error on setting up the request
              console.log('Error', error.message);
            }
          })
        .then(SuccessNotification(theme,oldName + 'successfully renamed to' + newName + '!'))
    }
}
