import axios from 'axios';

let deployedURI = 'https://goncar-system-backend.herokuapp.com';

export function postTraineeRegistration(id, data) {
    return axios.post(
        `${deployedURI}/api/trainees/${id}/registrations`,
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
        `${deployedURI}/api/trainees/${id}/registrations/${regId}`,
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
        `${deployedURI}/api/trainees`,
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
        `${deployedURI}/api/trainees/${id}`,
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
    return axios.delete(`${deployedURI}/api/trainees/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postTrainingYear(data) {
    return axios.post(`${deployedURI}/api/trainingYears`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putTrainingYear(id, data) {
    return axios.put(`${deployedURI}/api/trainingYears/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response;
    })
}

export function deleteTrainingYear(id) {
    return axios.delete(`${deployedURI}/api/trainingYears/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postBatch(data) {
    return axios.post(`${deployedURI}/api/batches`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putBatch(id, data) {
    return axios.put(`${deployedURI}/api/batches/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postCourse(data) {
    return axios.post(`${deployedURI}/api/courses`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putCourse(id, data) {
    return axios.put(`${deployedURI}/api/courses/${id}`,
    data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response;
    })
}

export function deleteCourse(id) {
    return axios.delete(`${deployedURI}/api/courses/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postEmployee(data) {
    return axios.post(`${deployedURI}/api/employees`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putEmployee(id, data) {
    return axios.put(`${deployedURI}/api/employees/${id}`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function deleteEmployee(id) {
    return axios.delete(`${deployedURI}/api/employees/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postPayable(data) {
    return axios.post(`${deployedURI}/api/payables`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function putPayable(id, data) {
    return axios.put(`${deployedURI}/api/payables/${id}`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function deletePayable(id) {
    return axios.delete(`${deployedURI}/api/payables/${id}`)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}

export function postTransaction(id, data) {
    return axios.post(`${deployedURI}/api/trainees/${id}/transactions/`, data)
    .then(function (response) {
        return response.status;
    })
    .catch(function (error) {
        return error.response.status;
    })
}