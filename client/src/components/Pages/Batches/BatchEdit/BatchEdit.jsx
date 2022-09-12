import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton
} from '../../../ComponentIndex';
import styles from './BatchEdit.module.scss';
import { useCourses, useTrainingYears, useBatch } from '../../../../assets/utilities/swr';
import { putBatch } from '../../../../assets/utilities/axiosUtility';

// VALIDATION FOR START DATE AND END DATE
const BatchEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date();
  const todayPlus30Days = dayjs().add(30, 'day').toDate();

  // console.log(location.state.batchID)

  /* STATE */
  const [ batchID ] = useState(location.state.batchID);
  const [ batchName, setBatchName ] = useState('');
  const [ laNumber, setLANumber ] = useState('');
  const [ studentLimit, setStudentLimit ] = useState(30);
  const [ instructor, setInstructor ] = useState('');
  const [ startDate, setStartDate ] = useState(today);
  const [ endDate, setEndDate ] = useState(todayPlus30Days);
  const [ trainingYear, setTrainingYear ] = useState('');
  const [ course, setCourse ] = useState('');
  
  const [ availableTrainingYears, setAvailableTrainingYears ] = useState([]);
  const [ availableCourses, setAvailableCourses ] = useState([]);

  // MAPS
  const [ courseNameID, setCourseNameID ] = useState({}); //KEY: COURSE NAME, VALUE=COURSE ID
  const [ trainingYearNameID, setTrainingYearNameID ] = useState({}); //KEY: TRAINING YEAR NAME, VALUE=TRAINING YEAR ID

  const [instructorOptions, setInstructorOptions] = useState([]);

  useEffect(
    // FETCH HERE, DELETE THIS AFTER
    () => {
      setInstructorOptions(["Louis Miguel Pawaon", "Cyril Olanolan", "Julienne Andrea Panes"]);
    }
    // DELETE UNTIL HERE
  , [])

  // FETCH BATCH DETAILS HERE
  const { batch, isBatchLoading, isBatchError } = useBatch(batchID);

  useEffect(
    () => {
      if (isBatchError) alert("Error fetching batches data! Please check internet connection.");

      if (!isBatchLoading) {
        setLANumber(batch.laNumber);
        setBatchName(batch.batchName);
        setCourse(batch.courses.courseName);
        setEndDate(batch.endDate);
        setStartDate(batch.startDate);
        setStudentLimit(batch.maxStudents);
        setTrainingYear(batch?.trainingYears?.trainingYearSpan ?? "");
        // TODO SET TEACHER
      }
    }
  , [batch, isBatchLoading, isBatchError])

  // FETCH TRAINING YEAR HERE
  const { trainingYears, isTrainingYearsLoading, isTrainingYearsError } = useTrainingYears();

  useEffect(
    () => {
      if (isTrainingYearsError) alert("Error fetching training years! Please check internet connection.");

      let flatten = [];
      let trainingYearMap = {};

      if (!isTrainingYearsLoading) {
        for (let trainingYear of trainingYears) {
          flatten.push(trainingYear.trainingYearSpan);
          trainingYearMap[trainingYear.trainingYearSpan] = trainingYear.trainingYearId;
        }
        setAvailableTrainingYears(flatten);
        setTrainingYearNameID(trainingYearMap);
      }
    }
  , [trainingYears, isTrainingYearsLoading, isTrainingYearsError])

  // FETCH AVAILABLE COURSES HERE
  const { courses, isCoursesLoading, isCoursesError } = useCourses();

  useEffect(
    () => {
      if (isCoursesError) alert("Error fetching course! Please check internet connection.");
      
      let courseMap = {};
      let flatten = [];

      if (!isCoursesLoading) {
        for (let course of courses) {
          courseMap[course.courseName] = course.courseId;
          flatten.push(course.courseName);
        }
        setAvailableCourses(flatten);
        setCourseNameID(courseMap);
      }
    }
  , [courses, isCoursesLoading, isCoursesError])

  function handleSubmit(event) {
    event.preventDefault();
    
    let data = {
      laNumber: laNumber,
      batchName: batchName,
      startDate: startDate,
      endDate: endDate,
      maxStudents: studentLimit,
      courseId: courseNameID[course],
      trainingYearId: trainingYearNameID[trainingYear]
    }

    putBatch(batchID, data)
    .then(
      (status) => {
        if (status === 200) {
          navigate('/batches');
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
            {/* CHANGE TRAINEE ID HERE */}
            <InputField
              label="Course ID"
              value={1}
              disabled={true}
              variant={"traineeID"}
              style={{marginLeft: "auto"}} />

            <InputField
              label="Batch ID"
              value={batchID}
              disabled={true}
              variant={"traineeID"}
              style={{marginLeft: "auto"}} />
          </div>

          <div className={styles["row-2"]}>
            <TextField
              value={laNumber}
              onChange={e => setLANumber(e.target.value)}
              label="LA Number"
              name="laNumber"
              id="laNumber-input"
              required
              fullWidth />

            <TextField
              value={batchName}
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
                value={course}
                label="Course"
                onChange={e => setCourse(e.target.value)}
              >
                {availableCourses.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
            
            <FormControl fullWidth required>
              <InputLabel id="training-year-select-label">Training Year</InputLabel>
              <Select
                labelId="training-year-select-label"
                id="training-year-select"
                name="training-year"
                value={trainingYear}
                label="Training Year"
                onChange={e => setTrainingYear(e.target.value)}
              >
                {availableTrainingYears.map((option, index) => {
                  return <MenuItem key={index} value={option}>{option}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>

          <div className={styles["row-4"]}>
            <TextField
              value={studentLimit}
              onChange={e => setStudentLimit(e.target.value)}
              label="Student Limit"
              name="studentLimit"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*'}}
              fullWidth 
              required />

            <FormControl fullWidth required>
              <InputLabel id="instructor-select-label">Instructor</InputLabel>
              <Select
                labelId="instructor-select-label"
                id="instructor-select"
                name="instructor"
                value={instructor}
                label="Instructor"
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
                value={startDate}
                onChange={value => setStartDate(value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                name="endDate" 
                value={endDate}
                onChange={value => setEndDate(value)}
                renderInput={(params) => <TextField {...params} fullWidth required />}
              />
            </LocalizationProvider>
          </div>

          <div className={styles["form_buttons"]}>
            <FormButton label="Update" type="submit" />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </BubblePage>
    </>
  )
}

export default BatchEdit;