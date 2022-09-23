import axios from 'axios';

export function postTraineeRegistration(id, data) {
    return axios.post(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations`,
        data
    )
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putTraineeRegistration(id, regId, data) {
    return axios.put(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations/${regId}`,
        data
    )
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postTrainee(data) {
    return axios.post(
        `https://goncar-system-backend.herokuapp.com/api/trainees`,
        data
    )
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putTrainee(id, data) {
    return axios.put(
        `https://goncar-system-backend.herokuapp.com/api/trainees/${id}`,
        data
    )
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function deleteTrainee(id) {
    return axios.delete(`https://goncar-system-backend.herokuapp.com/api/trainees/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postTrainingYear(data) {
    return axios.post(`https://goncar-system-backend.herokuapp.com/api/trainingYears`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putTrainingYear(id, data) {
    return axios.put(`https://goncar-system-backend.herokuapp.com/api/trainingYears/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function deleteTrainingYear(id) {
    return axios.delete(`https://goncar-system-backend.herokuapp.com/api/trainingYears/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postBatch(data) {
    return axios.post(`https://goncar-system-backend.herokuapp.com/api/batches`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putBatch(id, data) {
    return axios.put(`https://goncar-system-backend.herokuapp.com/api/batches/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postCourse(data) {
    return axios.post(`https://goncar-system-backend.herokuapp.com/api/courses`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putCourse(id, data) {
    return axios.put(`https://goncar-system-backend.herokuapp.com/api/courses/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function deleteCourse(id) {
    return axios.delete(`https://goncar-system-backend.herokuapp.com/api/courses/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postEmployee(data) {
    return axios.post(`https://goncar-system-backend.herokuapp.com/api/employees`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}