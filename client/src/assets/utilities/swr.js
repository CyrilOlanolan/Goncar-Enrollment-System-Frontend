import useSWR from "swr";

/* WRAPPER FUNCTION FOR FETCH API */
const fetcher = (...args) => fetch(...args).then(res => res.json());

export function useTrainees() {
    const { data, error } = useSWR("https://goncar-system-backend.herokuapp.com/api/trainees", fetcher);

    return {
        trainees: data,
        isTraineesLoading: !error && !data,
        isTraineesError: error
    }
}

export function useBatches() {
    const { data, error } = useSWR("https://goncar-system-backend.herokuapp.com/api/batches", fetcher);

    return {
        batches: data,
        isBatchesLoading: !error && !data,
        isBatchesError: error
    }
}

export function useTrainee(id) {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/trainees/${id}`, fetcher);

    return {
        trainee: data,
        isTraineeLoading: !error && !data,
        isTraineeError: error
    }
}

export function useTraineeRegistrations(id) {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations`, fetcher);

    return {
        traineeRegistrations: data,
        isTraineeRegistrationsLoading: !error && !data,
        isTraineeRegistrationsError: error
    }
}

export function useTraineeRegistration(id, regid) {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/trainees/${id}/registrations/${regid}`, fetcher);

    return {
        traineeRegistration: data,
        isTraineeRegistrationLoading: !error && !data,
        isTraineeRegistrationError: error
    }
}

export function useCourses() {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/courses`, fetcher);

    return {
        courses: data,
        isCoursesLoading: !error && !data,
        isCoursesError: error
    }
}

export function useGroupedBatches() {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/courses/batches/grouped`, fetcher);

    return {
        groupedBatches: data,
        isGroupedBatchesLoading: !error && !data,
        isGroupedBatchesError: error
    }
}

export function useTotalRegistrations() {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/trainees/registrations/total`, fetcher);

    return {
        totalRegistrations: data,
        isTotalRegistrationsLoading: !error && !data,
        isTotalRegistrationsError: error
    }
}

export function useLatestRegistrationID() {
    const { data, error } = useSWR(`https://goncar-system-backend.herokuapp.com/api/trainees/registrations/max`, fetcher);

    return {
        latestRegistrationID: data,
        isLatestRegistrationIDLoading: !error && !data,
        isLatestRegistrationIDError: error
    }
}

