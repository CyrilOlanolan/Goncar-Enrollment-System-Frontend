import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs';

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
} from '../../../ComponentIndex';
import styles from './BatchesCreation.module.scss';

// VALIDATION FOR START DATE AND END DATE
const BatchesCreation = () => {
  const today = Date();
  const todayPlus30Days = dayjs().add(30, 'day').toDate();

  const [instructorOptions, setInstructorOptions] = useState([]);

  useEffect(
    // FETCH HERE, DELETE THIS AFTER
    () => {
      setInstructorOptions(["Louis Miguel Pawaon", "Cyril Olanolan", "Julienne Andrea Panes"]);
    }
    // DELETE UNTIL HERE
  , [])

  function handleSubmit(event) {
    event.preventDefault();
    console.log("LA Number:", laNumber);
    console.log("Student Limit:", studentLimit);
    console.log("Instructor:", instructor);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
  }

  /* STATE */
  const [ laNumber, setLANumber ] = useState('');
  const [ studentLimit, setStudentLimit ] = useState(30);
  const [ instructor, setInstructor ] = useState('');
  const [ startDate, setStartDate ] = useState(today);
  const [ endDate, setEndDate ] = useState(todayPlus30Days);

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
              value={1}
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
          </div>

          <div className={styles["row-3"]}>
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
            <FormButton label="Submit" type="submit" />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </BubblePage>
    </>
  )
}

export default BatchesCreation