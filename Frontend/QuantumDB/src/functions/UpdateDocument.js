import axios from 'axios';

const SuccessNotification = (theme, name) => toast.success('File successfully renamed!', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const WarningNotification = (theme,err) => toast.warn(err, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

const ExtensionWarning = (theme) => toast.warn('Please remove extension from name.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

export async function UpdateDocument(oldName,newName,path,type) {
    const base = 'http://ec2-3-130-207-24.us-east-2.compute.amazonaws.com:8000/update/'
    const url = base + oldName + '/' + newName + '/' + path + '/file'
    if (newName === ""){
        WarningNotification(theme, 'Please fill out the file name.');
    } else if (newName.includes('.json')){
        ExtensionWarning(theme);
    }
    else{
        axios.get(url)
        .then(data=>{return data.json()})
        .then(res=>{console.log(res)})
        .then(SuccessNotification(theme,oldName))
        .catch(error=>WarningNotification(theme,error))
    }
}
