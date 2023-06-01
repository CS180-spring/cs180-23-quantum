// import { WarningNotification } from './WarningNotification';
import { SuccessNotification } from './SuccessNotification';

export function DownloadDocument(theme,name,path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-3-144-132-172.us-east-2.compute.amazonaws.com:8000/download/'
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