import axios from 'axios';

export async function ReadCollection(name,path,type) {
    const base = 'http://ec2-3-145-4-143.us-east-2.compute.amazonaws.com:8000/read/'
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