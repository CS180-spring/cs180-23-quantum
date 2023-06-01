import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export async function ReadCollection(name,path,type) {
    const base = 'http://ec2-3-144-132-172.us-east-2.compute.amazonaws.com:8000/read/'
    const url = base + name + '/' + path + '/' + type
    var d = [];
    d = await axios.get(url)
        .then(function (response) {
            const objects = response.data.toString().split('-');
            var filtered = objects.filter(function (el) {
                return el !== "";
              });
            return filtered;
        })
        .catch((error) => { // error is handled in catch block
            if (error.response) { // status code out of the range of 2xx
                if (error.response.status === 400){
                    WarningNotification(theme,"Failed to read folder: " + name)
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
    return d;
}