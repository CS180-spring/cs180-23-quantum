import axios from 'axios';

const WarningNotification = (theme, err) => toast.warn(err, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
});

export async function ReadCollection(name,path,type) {
    const base = 'http://ec2-18-221-246-92.us-east-2.compute.amazonaws.com:8000/read/'
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
        .catch(function (error) {
            console.log(error);
        });
    return d;
}