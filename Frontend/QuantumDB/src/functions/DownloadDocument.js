import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuccessNotification = (theme, name) => toast.success('Document: ' + name +' Downloaded!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

export function DownloadDocument(theme,name,path) {
    if ( path === undefined){
        path = 'database'
    }
    const base = 'http://ec2-18-220-175-18.us-east-2.compute.amazonaws.com:8000/download/'
    const url = base + name +'/' + path + '/file'
    // axios.get(url)
        // .catch(error=>WarningNotification(theme,error))
        // .then(res=>{console.log(res)})
        // .then(SuccessNotification(theme, name))
    fetch(url)
        .then(res => res.blob())
        .then(data => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = name;
        a.click();
        SuccessNotification(theme, name)
        });
}