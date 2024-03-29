import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useNavigate, Link } from 'react-router-dom';

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import ListSubheader from '@mui/material/ListSubheader';

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton
} from '../../../ComponentIndex';
import styles from './BatchCreation.module.scss';
import { useBatchesLatestID, useTeachers, useCourses } from '../../../../assets/utilities/swr';
import { postBatch } from '../../../../assets/utilities/axiosUtility';
import { BATCH_STATUS } from '../../../../assets/utilities/constants';

// VALIDATION FOR START DATE AND END DATE
const BatchCreation = () => {
  const navigate = useNavigate();
  const today = new Date();
  const todayPlus30Days = dayjs().add(30, 'day').toDate();

  /* STATE */
  const [ batchID, setBatchID ] = useState('');
  const [ batchName, setBatchName ] = useState('');
  const [ laNumber, setLANumber ] = useState('');
  const [ studentLimit, setStudentLimit ] = useState(30);
  const [ instructor, setInstructor ] = useState('');
  const [ startDate, setStartDate ] = useState(today);
  const [ endDate, setEndDate ] = useState(todayPlus30Days);
  // const [ trainingYear, setTrainingYear ] = useState('');
  const [ course, setCourse ] = useState('');
  const [ isActive, setIsActive ] = useState("Active");
  const [inactiveCourses, setInactiveCourses] = useState([]);
  // const [ availableTrainingYears, setAvailableTrainingYears ] = useState([]);
  const [ availableCourses, setAvailableCourses ] = useState([]);

  // MAPS
  const [ courseNameID, setCourseNameID ] = useState({}); //KEY: COURSE NAME, VALUE=COURSE ID

  const [ instructorOptions, setInstructorOptions ] = useState([]);
  const [ instructorMapID, setInstructorMapID ] = useState({});

  const BATCH_STATUS_OPTIONS = [
    BATCH_STATUS.ACTIVE,
    BATCH_STATUS.INACTIVE
  ]

  // VALIDATION FOR DATES
  /* ERROR STATES */
  const [ dateErrorMessage, setDateErrorMessage ] = useState(null);
  const [ statusErrorMessage, setStatusErrorMessage ] = useState(null);

  /* VALIDATION */
  useEffect(
    () => {
      // IF END YEAR IS LESS THAN START OR EQUAL, ERROR
      if (dayjs(startDate) > dayjs(endDate)) {
        setDateErrorMessage({
          title: "INVALID DATES",
          description: "End Date must be greater than Start Date."
        })
      }
      else {
        setDateErrorMessage(null);
      }
    }
  , [startDate, endDate])

  // FETCH LATEST BATCHES ID HERE
  const { batchesLatestID, isLatestBatchesIDLoading, isLatestBatchesIDError } = useBatchesLatestID();
  
  useEffect (
    () => {
      if (isLatestBatchesIDError) alert("Error fetching batches ID! Please check internet connection");

      if (!isLatestBatchesIDLoading) {
        setBatchID( batchesLatestID?._max?.batchId === null ? (batchesLatestID?._max?.batchId + 1) ?? 1 : 1);
      }
    }
  , [batchesLatestID, isLatestBatchesIDLoading, isLatestBatchesIDError])

  // FETCH AVAILABLE COURSES HERE
  const { courses, isCoursesLoading, isCoursesError } = useCourses();

  useEffect(
    () => {
      if (isCoursesError) alert("Error fetching course! Please check internet connection.");
      
      let courseMap = {};
      let flattenActive = ["Active"];
      let flattenInactive = ["Inactive"];

      if (!isCoursesLoading) {
        for (let course of courses) {
          let flattenedCourseName = `${course.courseName} (${course.trainingYears?.trainingYearSpan})`
          courseMap[flattenedCourseName] = course.courseId;
          // flatten.push(flattenedCourseName);

          // SORT ACTIVE FROM INACTIVE COURSES
          if (course.courseStatus === "Active") {
            flattenActive.push(flattenedCourseName);
          }
          else {
            flattenInactive.push(flattenedCourseName);
          }
        }

        // console.log([flattenActive, flattenInactive]);
        setAvailableCourses([flattenActive, flattenInactive]);
        setCourseNameID(courseMap);
        setInactiveCourses(flattenInactive);
      }
    }
  , [ courses, isCoursesLoading, isCoursesError  ])

  // FETCH AVAILABLE INSTRUCTORS HERE
  const { teachers, isTeachersLoading, isTeachersError } = useTeachers();

  useEffect(
    () => {
      if (isTeachersError) alert("Error fetching teachers! Please check your internet.")
      let teachersOptions = [];
      let teachersMapID = {}; // value: employeeId, key: fullname
      if (!isTeachersLoading) {
        for (let teacher of teachers) {
          teachersMapID[`${teacher?.lastName}, ${teacher?.firstName}${teacher.middleName ? ' ' + teacher?.middleName[0] + ".": ""}`] = teacher.employeeId 
          teachersOptions.push(`${teacher?.lastName}, ${teacher?.firstName}${teacher.middleName ? ' ' + teacher?.middleName[0] + ".": ""}`)
        }
      }
      setInstructorOptions(teachersOptions);
      setInstructorMapID(teachersMapID);
    }
  , [teachers, isTeachersLoading, isTeachersError])

  useEffect(() => {
    let found = false;
    for (let inactiveCourse of inactiveCourses) {
      if (inactiveCourse === course && isActive === "Active") {
        setStatusErrorMessage({
          title: "Error",
          description: "You cannot add an active batch to an inactive course."
        })
        found = true;
      }
    }

    if (!found) {
      setStatusErrorMessage(null)
    }
  }, [inactiveCourses, course, isActive]);

  function handleSubmit(event) {
    event.preventDefault();
    
    let data = {
      laNumber: laNumber,
      batchName: batchName,
      startDate: startDate,
      endDate: endDate,
      maxStudents: Number(studentLimit),
      courseId: courseNameID[course],
      employeeId: instructorMapID[instructor],
      batchStatus: isActive
    }

    console.log(data)

    postBatch(data)
    .then(
      (status) => {
        if (status === 201) {
          navigate('/batches');
        }
        else if (status === 409) {
          alert(`ERROR! Instructor: ${instructor} currently has an active batch!`)
        }
        else if (status === 410) {
          alert('ERROR! Course Batch Name is already existing! Only unique batch names are allowed.')
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }


  return (
    <>
      <SideBar />
      <BubblePage>
        <h1 className={styles["title"]}>Create Course Batch</h1>
        <form className={styles["BatchesCreation"]} onSubmit={handleSubmit}>
          <div className={styles["IDs"]}>
            <InputField
              label="Batch ID"
              value={batchID ?? ""}
              disabled={true}
              variant={"traineeID"}
              style={{marginLeft: "auto"}} />
          </div>

          {
            dateErrorMessage ? 
            <Alert severity="error">
              <AlertTitle>{dateErrorMessage.title}</AlertTitle>
              {dateErrorMessage.description}
            </Alert>
            :
            null
          }

          {
            isActive === "Active" && statusErrorMessage ? 
            <Alert severity="error">
              <AlertTitle>{statusErrorMessage.title}</AlertTitle>
              {statusErrorMessage.description}
            </Alert>
            :
            null
          }

          {availableCourses.length !== 0 && instructorOptions.length !== 0 ?
            null
            :
            <Alert severity="warning">
              <AlertTitle>Warning: Missing Data Field/s</AlertTitle>
              {availableCourses.length === 0 ? <p><strong>No courses available</strong> &mdash; add under <Link to={'/administrative/courses/new'} style={{color: "#0c4982", textDecoration: "none"}}>Administrative</Link>.</p> : null}
              {instructorOptions.length === 0 ? <p><strong>No instructor available</strong> &mdash; add under <Link to={'/employees/new'} style={{color: "#0c4982", textDecoration: "none"}}>Employees</Link>.</p> : null}
            </Alert>
          }

          <div className={styles["row-2"]}>
            <TextField
              value={laNumber ?? ""}
              onChange={e => setLANumber(e.target.value)}
              label="LA Number"
              name="laNumber"
              id="laNumber-input"
              required
              fullWidth />

            <TextField
              value={batchName ?? ""}
              onChange={e => setBatchName(e.target.value)}
              label="Batch Name"
              name="batchName"
              id="batchName-input"
              required
              fullWidth />
          </div>

          <div className={styles["row-3"]}>
            <FormControl fullWidth required>
              <InputLabel id="course-select-label">Course</InputLabel>
              <Select
                labelId="course-select-label"
                id="course-select"
                name="course"
                value={course ?? ""}
                label="Course"
                onChange={e => setCourse(e.target.value)}
              >
                {
                  availableCourses.map((category, index) => {
                      return (
                        category.map((option, key) => {
                          if (option === "Active" || option === "Inactive") {
                            return <ListSubheader>{option}</ListSubheader>
                          }
                        return <MenuItem key={key} value={option}>{option}</MenuItem>
                      })
                      )
                  })
                }
              </Select>
            </FormControl>
            
          </div>

          <div className={styles["row-4"]}>
            <TextField
              value={studentLimit ?? ""}
              onChange={e => setStudentLimit(e.target.value)}
              label="Student Limit"
              name="studentLimit"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              fullWidth 
              required />

            <FormControl fullWidth required>
              <InputLabel id="teacher-select-label">Teacher</InputLabel>
              <Select
                labelId="teacher-select-label"
                id="teacher-select"
                name="teacher"
                value={instructor ?? ""}
                label="teacher"
                onChange={e => setInstructor(e.target.value)}
              >
                {instructorOptions.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          <div className={styles["row-4"]}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                name="startDate" 
                value={startDate ?? ""}
                onChange={value => setStartDate(value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                name="endDate" 
                value={endDate ?? ""}
                onChange={value => setEndDate(value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </div>

          <div className={styles["row-5"]}>
            <FormControl required>
              <FormLabel id="sex-radio-buttons-group">Batch Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="sex-radio-buttons-group"
                name="sex-radio-buttons-group"
                value={isActive ?? ""}
                onChange={e => setIsActive(e.target.value)}
              >
                {BATCH_STATUS_OPTIONS.map((option, index) => {
                  return (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles["form_buttons"]}>
            <FormButton label="Submit" type="submit" disabled={dateErrorMessage || statusErrorMessage} />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </BubblePage>
    </>
  )
}

export default BatchCreation