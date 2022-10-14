import download from 'downloadjs';
import axios from  'axios';

let deployedURI = 'https://goncar-system-backend.herokuapp.com';

export function getTraineeProfile(id) {
    return axios
    .get(`${deployedURI}/api/trainees/${id}`, {
        headers: this.headers,
        responseType: 'blob',
    })
    .then(function (response) {
        return response.status;
    })
    .catch(function (error){
        return error.rsponse.status;
    })
}

export function downloadFile(id) {
    axios
        .get(`${deployedURI}/api/trainees/${id}`, {
            headers: this.headers,
            responseType: 'blob', // had to add this one here
        })
        .then(response => {
           const content = response.headers['content-type'];
           download(response.id, id.pdf, content)
        })
        .catch(error => console.log(error));
}