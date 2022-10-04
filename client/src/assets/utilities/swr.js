import useSWR from "swr";

// let deployedURI = 'localhost:5000'
let deployedURI = 'https://goncar-system-backend.herokuapp.com';

/* WRAPPER FUNCTION FOR FETCH API */
const fetcher = (...args) => fetch(...args).then(res => res.json());

export function useTrainees() {
    const { data, error } = useSWR(`${deployedURI}/api/trainees`, fetcher);

    return {
        trainees: data,
        isTraineesLoading: !error && !data,
        isTraineesError: error
    }
}

export function useBatches() {
    const { data, error } = useSWR(`${deployedURI}/api/batches`, fetcher);

    return {
        batches: data,
        isBatchesLoading: !error && !data,
        isBatchesError: error
    }
}

export function useTrainee(id) {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/${id}`, fetcher);

    return {
        trainee: data,
        isTraineeLoading: !error && !data,
        isTraineeError: error
    }
}

export function useTraineeRegistrations(id) {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/${id}/registrations`, fetcher);

    return {
        traineeRegistrations: data,
        isTraineeRegistrationsLoading: !error && !data,
        isTraineeRegistrationsError: error
    }
}

export function useTraineeRegistration(id, regid) {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/${id}/registrations/${regid}`, fetcher);

    return {
        traineeRegistration: data,
        isTraineeRegistrationLoading: !error && !data,
        isTraineeRegistrationError: error
    }
}

export function useCourses() {
    const { data, error } = useSWR(`${deployedURI}/api/courses`, fetcher);

    return {
        courses: data,
        isCoursesLoading: !error && !data,
        isCoursesError: error
    }
}

export function useGroupedBatches() {
    const { data, error } = useSWR(`${deployedURI}/api/courses/batches/grouped`, fetcher);

    return {
        groupedBatches: data,
        isGroupedBatchesLoading: !error && !data,
        isGroupedBatchesError: error
    }
}

export function useTotalRegistrations() {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/registrations/total`, fetcher);

    return {
        totalRegistrations: data,
        isTotalRegistrationsLoading: !error && !data,
        isTotalRegistrationsError: error
    }
}

export function useLatestRegistrationID() {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/registrations/max`, fetcher);

    return {
        latestRegistrationID: data,
        isLatestRegistrationIDLoading: !error && !data,
        isLatestRegistrationIDError: error
    }
}

export function useLatestTraineeID() {
    const { data, error } = useSWR(`${deployedURI}/api/trainees/all/max`, fetcher);

    return {
        latestTraineeID: data,
        isLatestTraineeIDLoading: !error && !data,
        isLatestTraineeIDError: error
    }
}

export function useBatch(id) {
    const { data, error } = useSWR(`${deployedURI}/api/batches/${id}`, fetcher);

    return {
        batch: data,
        isBatchLoading: !error && !data,
        isBatchError: error
    }
}

export function useTrainingYears() {
    const { data, error } = useSWR(`${deployedURI}/api/trainingYears`, fetcher);

    return {
        trainingYears: data,
        isTrainingYearsLoading: !error && !data,
        isTrainingYearsError: error
    }
}

export function useTrainingYear(id) {
    const { data, error } = useSWR(`${deployedURI}/api/trainingYears/${id}`, fetcher);

    return {
        trainingYear: data,
        isTrainingYearLoading: !error && !data,
        isTrainingYearError: error
    }
}

export function useBatchesLatestID() {
    const { data, error } = useSWR(`${deployedURI}/api/batches/all/max`, fetcher);

    return {
        batchesLatestID: data,
        isBatchesLatestIDLoading: !error && !data,
        isBatchesLatestIDError: error
    }
}

export function useCourse(courseID) {
    const { data, error } = useSWR(`${deployedURI}/api/courses/${courseID}`, fetcher);

    return {
        course: data,
        isCourseLoading: !error && !data,
        isCourseError: error
    }
}

export function useLatestCourseID() {
    const { data, error } = useSWR(`${deployedURI}/api/courses/all/max`, fetcher);

    return {
        latestCourseID: data,
        isLatestCourseIDLoading: !error && !data,
        isLatestCourseIDError: error
    }
}

export function useEmployees() {
    const { data, error } = useSWR(`${deployedURI}/api/employees`, fetcher);

    return {
        employees: data,
        isEmployeesLoading: !error && !data,
        isEmployeesError: error
    }
}

export function useEmployee(id) {
    const { data, error } = useSWR(`${deployedURI}/api/employees/${id}`, fetcher);

    return {
        employee: data,
        isEmployeeLoading: !error && !data,
        isEmployeeError: error
    }
}

export function useLatestEmployeeID() {
    const { data, error } = useSWR(`${deployedURI}/api/employees/all/max`, fetcher);

    return {
        latestEmployeeID: data,
        isLatestEmployeeIDLoading: !error && !data,
        isLatestEmployeeIDError: error
    }
}

export function useRoles() {
    const { data, error } = useSWR(`${deployedURI}/api/roles`, fetcher);

    return {
        roles: data,
        isRolesLoading: !error && !data,
        isRolesError: error
    }
}

export function useTeachers() {
    const { data, error } = useSWR(`${deployedURI}/api/employees/all/teacher`, fetcher);

    return {
        teachers: data,
        isTeachersLoading: !error && !data,
        isTeachersError: error
    }
}

export function useFinance() {
    const { data, error } = useSWR(`${deployedURI}/api/finance`, fetcher);

    return {
        finance: data,
        isFinanceLoading: !error && !data,
        isFinanceError: error
    }
}

export function useCoursePayables(courseID) {
    const { data, error } = useSWR(`${deployedURI}/api/courses/${courseID}/payables`, fetcher);

    return {
        coursePayables: data,
        isCoursePayablesLoading: !error && !data,
        isCoursePayablesError: error
    }
}

export function useLatestPayableID() {
    const { data, error } = useSWR(`${deployedURI}/api/payables/all/max`, fetcher);

    return {
        latestPayableID: data,
        isLatestPayableIDLoading: !error && !data,
        isLatestPayableIDError: error
    }
}