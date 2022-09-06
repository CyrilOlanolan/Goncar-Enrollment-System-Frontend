import axios from 'axios';

export function postTraineeRegistration(id, data) {
    axios.post(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations`,
        data
    )
    .then(function (response) {
        console.log("SUCCESS POST");
        console.log(response);
    })
    .catch(function (error) {
        console.log("ERROR POST");
        console.log(error);
    })
}