import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export async function DeleteDocument(theme, name, path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-3-144-132-172.us-east-2.compute.amazonaws.com:8000/delete/'
    const url = base + name +'/' + path + '/file'
    axios.get(url)
    .catch((error) => { // error is handled in catch block
        if (error.response) { // status code out of the range of 2xx
            if (error.response.status === 400){
                WarningNotification(theme,"Failed to delete file: " + name)
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
        }
      })
    .then(res=>{console.log(res)})
    .then(SuccessNotification(theme,'File: ' + name + ' Deleted!'))
}