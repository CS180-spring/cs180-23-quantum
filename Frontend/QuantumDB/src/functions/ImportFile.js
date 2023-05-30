import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export function ImportFile(theme, name, path, type, content) {

    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-3-18-109-0.us-east-2.compute.amazonaws.com:8000/import/'
    const url = base + name +'/' + path + '/' + type
    axios
    .post(
        url,
        [
            {
                body: content,
            },
        ],
        {
            params: { 'api-version': '3.0' },
            headers: {
                'content-type': 'text/plain',
            },
        }
    )
        .then(function (response) {
        console.log(response.data);})
        .catch(error=>WarningNotification(theme,error))
        .then(SuccessNotification(theme, 'File: ' + name + ' Saved!'))
}