import axios from 'axios';

export function postTraineeRegistration(id, data) {
    axios.post(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations`,
        data
    )
    .then(function (response) {
        console.log("SUCCESS POST");
        console.log(response);
        return response;
    })
    .catch(function (error) {
        console.log("ERROR POST");
        console.log(error);
        return error;
    })
}

export function putTraineeRegistration(id, regId, data) {
    axios.put(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations/${regId}`,
        data
    )
    .then(function (response) {
        console.log("SUCCESS PUT");
        console.log(response);
        return response;
    })
    .catch(function (error) {
        console.log("ERROR PUT");
        console.log(error);
        return error;
    })
}