import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export async function ReadFile(name,path,type) {
    const base = 'http://ec2-18-221-246-92.us-east-2.compute.amazonaws.com:8000/read/'
    const url = base + name + '/' + path + '/' + "file"

    axios.get(url)
    .catch((error) => { // error is handled in catch block
        if (error.response) { // status code out of the range of 2xx
            if (error.response.status === 400){
                WarningNotification(theme,"Failed to read file: " + name)
            }
            if (error.response.status === 404){
                WarningNotification(theme,"File already exists in this directory")
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
    .then(response=>{return response.data.toString()});
    
}
