import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton
} from '../../../../ComponentIndex';
import { ENROLLMENT_STATUS } from '../../../../../assets/utilities/constants';
import styles from './TraineeRegistrationCreation.module.scss';

import { useTrainee, useGroupedBatches, useLatestRegistrationID, useActiveCourses } from '../../../../../assets/utilities/swr';
import { postTraineeRegistration } from '../../../../../assets/utilities/axiosUtility';
import dayjs from 'dayjs';

// TODO: VALIDATION
const TraineeRegistrationCreation = () => {
  const navigate = useNavigate();
  
  const [ courseOptions, setCourseOptions ] = useState([]);
  const ENROLLMENT_STATUS_OPTIONS = [
    ENROLLMENT_STATUS.ACTIVE,
    ENROLLMENT_STATUS.DROPPED,
    ENROLLMENT_STATUS.FINISHED,
    ENROLLMENT_STATUS.UNPAID
  ]

  const today = new Date();

  /* STATES */
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [sssNumber, setSSSNumber] = useState('');
  const [sgLicense, setSGLicense] = useState('');
  const [tinNumber, setTINNumber] = useState('');
  const [selectedEnrollmentStatus, setSelectedEnrollmentStatus] = useState(ENROLLMENT_STATUS_OPTIONS[0]);
  const [sgExpiry, setSGExpiry] = useState('');
  const [dateEnrolled, setDateEnrolled] = useState(today);

  const location = useLocation();

  const traineeID = location.state.traineeID;

  // GET NUMBER OF REGISTRATIONS FOR UNIQUE ID
  const [ regID, setRegID ] = useState(-1);
  const { latestRegistrationID, isLatestRegistrationIDLoading, isLatestRegistrationIDError } = useLatestRegistrationID();

  useEffect(
    () => {
      if (isLatestRegistrationIDError) alert("Error fetching total registrations! Please check internet connection!");
      if (!isLatestRegistrationIDLoading) {
        setRegID(location.state.regID ?? (latestRegistrationID._max.registrationNumber + 1));
      }
    }
  , [latestRegistrationID, isLatestRegistrationIDLoading, isLatestRegistrationIDError, regID, location.state.regID])

  // FETCH AVAILABLE COURSES
  const { activeCourses, isActiveCoursesLoading, isActiveCoursesError } = useActiveCourses();

  useEffect(
    () => {
      if (isActiveCoursesError) alert("Error fetching courses! Please refresh or check your internet connection.");
      let courseFlattened = [];

      // FLATTEN
      if (!isActiveCoursesLoading) {
        for (let course of activeCourses) {
          let flattenedCourseName = `${course.courseName} (${course.trainingYears?.trainingYearSpan})`
          courseFlattened.push(flattenedCourseName);
        }
      }

      setCourseOptions(courseFlattened);
    }
  , [ activeCourses, isActiveCoursesLoading, isActiveCoursesError ])

  // FETCH EXISTING TRAINEE DATA
  const { trainee, isTraineeLoading, isTraineeError } = useTrainee(traineeID);

  useEffect(
    () => {
      if (isTraineeError) alert("Error fetching trainee data! Please refresh or check your internet connection.");

      if (!isTraineeLoading) {
        setSSSNumber(trainee?.SSSNum);
        setSGLicense(trainee?.SGLicense);
        setTINNumber(trainee?.TINNum);
        setSGExpiry(trainee?.expiryDate);
      }
    }
  , [trainee, isTraineeLoading, isTraineeError])

  // FETCH EXISTING BATCHES
  const { groupedBatches, isGroupedBatchesLoading, isGroupedBatchesError } = useGroupedBatches();
  
  const [coursesMap, setCoursesMap] = useState({}); // KEY: courseName, VALUE: courseId
  const [batchesMap, setBatchesMap] = useState({}); // KEY: courseId, VALUE: Array of batches
  const [batchesIDMap, setBatchesIDMap] = useState({}); // KEY: batchName, VALUE: batchID
  const [availableBatches, setAvailableBatches] = useState([]);

  useEffect (
    () => {
      if (isGroupedBatchesError) alert("Error fetching grouped batches! Please refresh or check your internet connection.");
      let coursesFlattened = {};
      let batchesFlattened = {};
      if (!isGroupedBatchesLoading) {
        console.log(groupedBatches)
        for (let i = 0; i < groupedBatches.length; i++) {
          let flattenedCourseName = `${groupedBatches[i].courseName} (${groupedBatches[i].trainingYears?.trainingYearSpan})`
          // MAP COURSES TO RESPECTIVE courseId
          coursesFlattened[flattenedCourseName] =  groupedBatches[i].courseId
          // MAP BATCHES TO RESPECTIVE courseId
          batchesFlattened[groupedBatches[i].courseId] = groupedBatches[i].batch;
        }
      }

      setCoursesMap(coursesFlattened);
      setBatchesMap(batchesFlattened);
    }
  , [groupedBatches, isGroupedBatchesLoading, isGroupedBatchesError])

  // ON CHANGE OF SELECTED COURSE
  useEffect(
    () => {
      // CLEAR BATCH FIELD EVERYTIME SELECTED COURSE CHANGES
      setSelectedBatch("");

      let courseIdentification = coursesMap[selectedCourse];
      
      let batchesInCourse = batchesMap[courseIdentification] ?? [];
      let batchIDNameMap = {};
      let batchNamesFlattened = [];

      for (let batches of batchesInCourse) {
        batchIDNameMap[batches.batchName] = batches.batchId;
        batchNamesFlattened.push(batches.batchName);
      }

      setBatchesIDMap(batchIDNameMap);
      setAvailableBatches(batchNamesFlattened);
    }
  , [selectedCourse, batchesMap, coursesMap])

  function submitForm(event) {
    event.preventDefault();

    let data = {
      batchId: batchesIDMap[selectedBatch],
      SSSNum: sssNumber,
      TINNum: tinNumber,
      registrationStatus: selectedEnrollmentStatus,
      dateEnrolled: dateEnrolled
    }

    // OPTIONAL FIELDS
    if (sgLicense !== "") {
      data["SGLicense"] = sgLicense;
      data["expiryDate"] = dayjs(sgExpiry).hour(12).toDate();
    }

    // console.log(data)

    postTraineeRegistration(traineeID, data)
    .then(
      (status) => {
        if (status === 201) {
          navigate(`/trainees/${traineeID}`);
        }
        else if (status === 409) {
          alert("This trainee has an active registration! Mark it as 'dropped' or 'finished' first before setting another registration as 'active'.")
        }
        else if (status === 410) {
          alert("This trainee has unpaid registration. Settle payment first to continue enrolling.")
        }
        else if (status === 411) {
          alert("This trainee has already finished this course in the same batch.")
        }
        else if (status === 412) {
          alert("This trainee has a balance! Settle payment first.")
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <h1 className={styles["title"]}>Create Trainee Registration</h1>

        <form className={styles["TraineeRegistrationCreation"]} onSubmit={submitForm}>
          <div className={styles["header"]}>
            {/* CHANGE VALUES HERE */}
            <InputField
              label="Registration No."
              value={regID ?? ""}
              disabled={true}
              variant={"traineeID"}
            />

            <InputField
              label="Trainee ID"
              value={traineeID ?? ""}
              disabled={true}
              variant={"traineeID"}
            />
          </div>

          { courseOptions.length === 0 || (availableBatches.length === 0 && selectedCourse) ?
            <Alert severity="warning">
              <AlertTitle>Warning: Missing Data Field/s</AlertTitle>
              {courseOptions.length === 0 ? <p><strong>No courses available</strong> &mdash; add under <Link to={'/administrative/courses/new'} style={{color: "#0c4982", textDecoration: "none"}}>Administrative</Link>.</p> : null}
              {(availableBatches.length === 0 && selectedCourse) ? <p><strong>No batches available</strong> &mdash; add under <Link to={'/batches/new'} style={{color: "#0c4982", textDecoration: "none"}}>Batches</Link>.</p> : null}
            </Alert>
            : null
          }

          <div className={styles["row-2"]}>
            <FormControl fullWidth required>
              <InputLabel id="course-select-label">Course</InputLabel>
              <Select
                labelId="course-select-label"
                id="cousrse-select"
                name="course"
                value={selectedCourse ?? ''}
                label="Course"
                onChange={e => setSelectedCourse(e.target.value)}
              >
                {courseOptions.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel id="batch-select-label">Batch</InputLabel>
              <Select
                labelId="batch-select-label"
                id="batch-select"
                name="batch"
                value={selectedBatch ?? ""}
                label="Course"
                onChange={e => setSelectedBatch(e.target.value)}
                disabled={selectedCourse ? false : true}
              >
                {availableBatches.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          <div className={styles["row-3"]}>
            <TextField
              id="sss-text-field"
              name="SSSNumber"
              label="SSS Number"
              value={sssNumber ?? ""}
              onChange={e => setSSSNumber(e.target.value)}
              fullWidth={true} 
              required
            />

            <TextField
              id="tin-text-field"
              name="TINNumber"
              label="TIN Number"
              value={tinNumber ?? ""}
              onChange={e => setTINNumber(e.target.value)}
              fullWidth={true}
              required
            />
          </div>

          <div className={styles["row-4"]}>
            <TextField
              id="sg-license-text-field"
              label="SG License Number"
              value={sgLicense ?? ""}
              onChange={e => setSGLicense(e.target.value)}
              fullWidth={true} 
            />

            <div className={styles["sg-license-expiry-wrapper"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  minDate={today}
                  disabled={sgLicense ? false : true}
                  label="SG License Expiry" 
                  name="SG-License-Expiry" 
                  value={sgExpiry ?? ""}
                  onChange={(newValue) => {
                    setSGExpiry(newValue);
                  }}
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField {...params} required={sgLicense ? true : false} fullWidth />}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className={styles["row-5"]}>
            <FormControl required>
              <FormLabel id="enrollment-status-radio-buttons-group">Enrollment Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="enrollment-status-radio-buttons-group"
                name="enrollment-status-radio-buttons-group"
                value={selectedEnrollmentStatus ?? ""}
                onChange={e => setSelectedEnrollmentStatus(e.target.value)}
              >
                {ENROLLMENT_STATUS_OPTIONS.map((option, index) => {
                  return (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  )
                })}
              </RadioGroup>
            </FormControl>

            <div className={styles["date-enrolled-wrapper"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  maxDate={today}
                  label="Date Enrolled" 
                  name="Date-Enrolled" 
                  value={dateEnrolled ?? ""}
                  onChange={(newValue) => {
                    setDateEnrolled(newValue);
                  }}
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField {...params} required fullWidth />}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div className={styles["form_buttons"]}>
            <FormButton label="Submit" type="submit" />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </BubblePage>
    </>
  )
}

export default TraineeRegistrationCreation;