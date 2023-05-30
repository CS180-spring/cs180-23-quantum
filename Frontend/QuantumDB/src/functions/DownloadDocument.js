import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export function DownloadDocument(theme,name,path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-3-18-109-0.us-east-2.compute.amazonaws.com:8000/download/'
    const url = base + name +'/' + path + '/file'
    fetch(url)
        .then(res => res.blob())
        .then(data => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = name;
        a.click();
        SuccessNotification(theme, 'Document: ' + name +' Downloaded!')
        });
}