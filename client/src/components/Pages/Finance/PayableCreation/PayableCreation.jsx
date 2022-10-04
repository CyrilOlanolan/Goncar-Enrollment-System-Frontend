import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
  BubblePage,
  SideBar,
  InputField,
  FormButton,
  Spinner
} from '../../../ComponentIndex';
import styles from './PayableCreation.module.scss';

import { useFinance, useLatestPayableID } from '../../../../assets/utilities/swr';
import { postPayable } from '../../../../assets/utilities/axiosUtility';
const PayableCreation = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentType = params.type;
  const currentCourse = location?.state?.courseName;

  const [course, setCourse] = useState("");
  const [payableName, setPayableName] = useState("");
  const [payableCost, setPayableCost] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [payableID, setPayableID] = useState('...');

  const [courseMapID, setCourseMapID] = useState({});

  // FETCH ALL COURSES WITH TUITION HERE
  const { finance, isFinanceLoading, isFinanceError } = useFinance();

  useEffect(() => {
    if (isFinanceError) alert("Error fetching payables data! Check internet connection.");

    // STORE COURSE NAME + TRAINING YEAR STRING LITERAL HERE
    let coursesWithTrainingYear = [];

    // MAP COURSE NAME + TRAINING YEAR STRING LITERAL HERE AS VALUE AND KEY AS COURSEID
    let mapCourseID = {};

    if (!isFinanceLoading) {
      for (let course of finance) {
        // COURSE NAME + TRAINING YEAR STRING LITERAL
        let newCourseName = `${course.courseName} (${course?.trainingYears?.trainingYearSpan})`;
        coursesWithTrainingYear.push(newCourseName);

        // MAP COURSES WITH THEIR ID
        mapCourseID[newCourseName] = course.courseId;
      }

      // STORE IN OPTIONS
      setCourseOptions(coursesWithTrainingYear);

      // STORE MAP
      setCourseMapID(mapCourseID);
    }
  }, [finance, isFinanceLoading, isFinanceError]);

  // FETCH LATEST PAYABLE ID HERE
  const { latestPayableID, isLatestPayableIDLoading, isLatestPayableIDError } = useLatestPayableID();

  useEffect(() => {
    if (isLatestPayableIDError) alert("Error fetching latest payable id data! Check internet connection.");

    if (!isLatestPayableIDLoading) {
      setPayableID(latestPayableID._max.payableId + 1);
    }
  }, [latestPayableID, isLatestPayableIDLoading, isLatestPayableIDError]);

  // SET FIELDS BASED ON ROUTE
  useEffect(() => {
    // IF THE ROUTE DOESNT CONTAIN GENERAL,
    // IT MEANS THE BUTTON CLICK IS FROM THE SPECIFIC COURSE
    if (currentType !== "general") {
      setCourse(currentCourse)
    }
  }, [currentCourse, currentType]);

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      courseId: courseMapID[course],
      payableName: payableName,
      payableCost: payableCost
    }

    console.log(data);

    postPayable(data)
    .then(
      (status) => {
        if (status === 201) {
          navigate(-1);
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["PayableCreation"]}>
        <h1>Add Payment</h1>
        {
          isFinanceLoading && isLatestPayableIDLoading ? <Spinner /> :
          <form className={styles["PayableCreation__form"]} onSubmit={(event) => handleSubmit(event)}>
            <div className={styles["header"]}>
            {/* CHANGE TRANSACTION NO HERE */}
              <InputField
                label="Payable ID"
                value={payableID}
                disabled={true}
                variant={"traineeID"}
                style={{marginLeft: "auto"}} />
            </div>

            <div className={styles["row-2"]}>
              <div className={styles["course"]}>
                <FormControl fullWidth required>
                  <InputLabel id="course-select-label">Course</InputLabel>
                  <Select
                    labelId="course-select-label"
                    id="course-select"
                    name="course"
                    value={course ?? ''}
                    label="Course"
                    onChange={e => setCourse(e.target.value)}
                  >
                    {courseOptions.map((option, index) => {
                      return <MenuItem key={index} value={option}>{option}</MenuItem>
                    })}
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className={styles["row-3"]}>
              <TextField
                value={payableName}
                onChange={e => setPayableName(e.target.value)}
                label="Payable Name"
                name="payableName"
                fullWidth
                required />

              <TextField
                value={payableCost}
                onChange={e => setPayableCost(e.target.value)}
                label="Payable Cost"
                placeholder={"10000"}
                name="payableCost"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]*'}}
                fullWidth
                required />
            </div>

            <div className={styles["form_buttons"]}>
                <FormButton label="Submit" type="submit" />
                {/* GO BACK TO PREVIOUS PAGE */}
                <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
              </div>
          </form>
        }
      </div>
    </BubblePage>
    </>
  )
}

export default PayableCreation