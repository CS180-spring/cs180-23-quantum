import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export async function UpdateDocument(theme,oldName,newName,path) {
    const base = 'http://ec2-3-18-109-0.us-east-2.compute.amazonaws.com:8000/update/'
    if ( path === undefined){
        path = 'database'
    }
    const url = base + oldName + '/' + newName + '/' + path + '/file'
    if (newName === ""){
        WarningNotification(theme, 'Please fill out the file name.');
    } else if (newName.includes('.json')){
        WarningNotification(theme, 'Please remove extension from name.');
    }
    else{
        axios.get(url)
        .catch((error) => { // error is handled in catch block
            if (error.response) { // status code out of the range of 2xx
                if (error.response.status === 400){
                    WarningNotification(theme,"Failed to update file")
                }
                if (error.response.status === 404){
                    WarningNotification(theme,"File already exists")
                }
                if (error.response.status === 403){
                    WarningNotification(theme,"File does not exist")
                }
            } 
            else if (error.request) { // The request was made but no response was received
                WarningNotification(theme,"No response received")
            } else {// Error on setting up the request
              console.log('Error', error.message);
            }
          })
        .then(SuccessNotification(theme, oldName + 'successfully renamed to' + newName + '!'))
    }
}
