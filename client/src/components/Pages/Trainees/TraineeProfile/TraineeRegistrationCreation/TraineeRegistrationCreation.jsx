import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCourses } from '../../../../../assets/utilities/swr';

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

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton
} from '../../../../ComponentIndex';
import { ENROLLMENT_STATUS } from '../../../../../assets/utilities/constants';
import styles from './TraineeRegistrationCreation.module.scss';

import { useTrainee, useGroupedBatches, useTraineeRegistration, useTotalRegistrations } from '../../../../../assets/utilities/swr';
import { postTraineeRegistration } from '../../../../../assets/utilities/axiosUtility';

// TODO: VALIDATION
const TraineeRegistrationCreation = () => {
  const [ courseOptions, setCourseOptions ] = useState([]);
  const ENROLLMENT_STATUS_OPTIONS = [
    ENROLLMENT_STATUS.ACTIVE,
    ENROLLMENT_STATUS.DROPPED,
    ENROLLMENT_STATUS.FINISHED
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
  // const [ regDetails, setRegDetails ] = useState({});
  const { totalRegistrations, isTotalRegistrationsLoading, isTotalRegistrationsError } = useTotalRegistrations();

  useEffect(
    () => {
      if (isTotalRegistrationsError) alert("Error fetching total registrations! Please check internet connection!");
      if (!isTotalRegistrationsLoading) {
        setRegID(location.state.regID ?? (totalRegistrations._count + 1));
      }
    }
  , [totalRegistrations, isTotalRegistrationsLoading, isTotalRegistrationsError, regID, location.state.regID])

  // FETCH AVAILABLE COURSES
  const { courses, isCoursesLoading, isCoursesError } = useCourses();

  useEffect(
    () => {
      if (isCoursesError) alert("Error fetching courses! Please refresh or check your internet connection.");
      let courseFlattened = [];

      // FLATTEN
      if (!isCoursesLoading) {
        for (let course of courses) {
          courseFlattened.push(course.courseName);
        }
      }

      setCourseOptions(courseFlattened);
    }
  , [courses, isCoursesLoading, isCoursesError])


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
        for (let i = 0; i < groupedBatches.length; i++) {
          // MAP COURSES TO RESPECTIVE courseId
          coursesFlattened[groupedBatches[i].courseName] =  groupedBatches[i].courseId
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

  // FETCH REG DETAILS IF FROM EDIT BUTTON
  const { traineeRegistration, isTraineeRegistrationLoading, isTraineeRegistrationError } = useTraineeRegistration(traineeID, regID);

  useEffect(
    () => {
      if (isTraineeRegistrationError) console.log("ERROR");
    
      if (!isTraineeRegistrationLoading && traineeRegistration[0] !== undefined) {
        setSelectedCourse(traineeRegistration[0]?.batch?.courses?.courseName ?? "");
        setSelectedBatch(selectedCourse ? (traineeRegistration[0]?.batch.batchName ?? "") : "");
      }
    }
  , [traineeRegistration, isTraineeRegistrationLoading, isTraineeRegistrationError, selectedCourse, selectedBatch])

  function submitForm(event) {
    event.preventDefault();

    postTraineeRegistration(traineeID, {
      batchId: batchesIDMap[selectedBatch],
      SSSNum: sssNumber,
      TINNum: tinNumber,
      SGLicense: sgLicense,
      expiryDate: sgExpiry,
      dateEnrolled: dateEnrolled,
      registrationStatus: selectedEnrollmentStatus
    })

    // GO BACK
    window.history.go(-1);

    // console.log("Trainee ID: ", traineeID);
    // console.log("Reg ID: ", regID);
    // console.log("Course Name: ", selectedCourse);
    // console.log("Batch Name: ", selectedBatch);
    // console.log("Batch ID: ", batchesIDMap[selectedBatch]);
    // console.log("SSS Number: ", sssNumber);
    // console.log("SBR Number: ", sbrNumber);
    // console.log("TIN Number: ", tinNumber);
    // console.log("SG License Number: ", sgLicense);
    // console.log("SG License Expiry: ", sgExpiry);
    // console.log("Enrollment Status: ", selectedEnrollmentStatus);
    // console.log("Date Enrolled: ", dateEnrolled);
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
                  label="SG License Expiry" 
                  name="SG-License-Expiry" 
                  value={sgExpiry}
                  onChange={(newValue) => {
                    setSGExpiry(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
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
                  renderInput={(params) => <TextField {...params} fullWidth />}
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