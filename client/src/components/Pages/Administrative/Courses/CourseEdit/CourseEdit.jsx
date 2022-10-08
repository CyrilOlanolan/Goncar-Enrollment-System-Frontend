import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* MUI */
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton,
  ActionButton
} from "../../../../ComponentIndex";
import styles from "./CourseEdit.module.scss";
import {
  useCourse,
  useTrainingYears,
} from "../../../../../assets/utilities/swr";

import { putCourse } from "../../../../../assets/utilities/axiosUtility";

// VALIDATION FOR START DATE AND END DATE
const CourseEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const COURSE_STATUS_OPTIONS = ["Active", "Inactive"];

  /* STATE */
  const [courseID] = useState(location.state.courseID);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [units, setUnits] = useState("");
  const [hoursRequired, setHoursRequired] = useState("");
  const [trainingYear, setTrainingYear] = useState("");
  const [courseStatus, setCourseStatus] = useState("Active");
  const [errorCurrentlyActiveBatches, setErrorCurrentlyActiveBatches] = useState([]);

  const [availableTrainingYears, setAvailableTrainingYears] = useState([]);

  // MAPS
  const [trainingYearNameID, setTrainingYearNameID] = useState({}); //KEY: TRAINING YEAR NAME, VALUE=TRAINING YEAR ID

  // FETCH TRAINING YEAR HERE
  const { trainingYears, isTrainingYearsLoading, isTrainingYearsError } =
    useTrainingYears();

  useEffect(() => {
    if (isTrainingYearsError)
      alert("Error fetching training years! Please check internet connection.");

    let flatten = [];
    let trainingYearMap = {};

    if (!isTrainingYearsLoading) {
      for (let trainingYear of trainingYears) {
        flatten.push(trainingYear.trainingYearSpan);
        trainingYearMap[trainingYear.trainingYearSpan] =
          trainingYear.trainingYearId;
      }
      setAvailableTrainingYears(flatten);
      setTrainingYearNameID(trainingYearMap);
    }
  }, [trainingYears, isTrainingYearsLoading, isTrainingYearsError]);

  // FETCH COURSE DETAILS HERE
  const { course, isCourseLoading, isCourseError } = useCourse(courseID);

  useEffect(
    () => {
      if (isCourseError) alert("ERROR fetching course details. Check internet connection!");

      if (!isCourseLoading) {
        setCourseName(course?.courseName);
        setTrainingYear(course?.trainingYears?.trainingYearSpan);
        setCourseDescription(course?.courseDescription);
        setUnits(course?.units);
        setHoursRequired(course?.requiredHours);
        setCourseStatus(course?.courseStatus)
      }
    }
  , [ course, isCourseLoading, isCourseError ])

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      courseName: courseName,
      courseDescription: courseDescription,
      requiredHours: Number(hoursRequired),
      units: Number(units),
      trainingYearId: trainingYearNameID[trainingYear],
      courseStatus: courseStatus
    };

    console.log(data);

    putCourse(courseID, data)
    .then(
      (response) => {
        if (response.status === 200) {
          navigate('/administrative/courses');
        }
        else if (response.status === 409) {
          setErrorCurrentlyActiveBatches(response.data?.activeBatches)
          handleOpen();
        } 
        else alert(`BAD REQUEST: ${response.status}`);
      }
    )
  }

  // MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <SideBar />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 className={styles["modal__error-title"]}>Error!</h1>
            <p className={styles["modal__error-description"]}>Setting a course with active batches is not allowed. Here are the currently active batches under the course.</p>
            <p className={styles["modal__error-description2"]}>Currently Active Batches under {courseName}:</p>
            {errorCurrentlyActiveBatches.map((batch, index) => {
              return (<p key={index}>
                <span className={styles["modal__batchID"]}>{batch.batchId}</span> - <span className={styles["modal__batchName"]}>{batch.batchName}</span>
              </p>)
            })}

            <div className={styles["modal__action-buttons"]}>
              <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
              <ActionButton variant="view" label="BATCHES" onClick={() => {
                navigate('/batches')
                handleClose();
              }}/>
            </div>
          </Box>
        </Fade>
      </Modal>
      <BubblePage>
        <h1 className={styles["title"]}>Edit Course</h1>
        <form className={styles["CourseEdit"]} onSubmit={handleSubmit}>
          <div className={styles["IDs"]}>
            <InputField
              label="Course ID"
              value={courseID}
              disabled={true}
              variant={"traineeID"}
              style={{ marginLeft: "auto" }}
            />
          </div>

          <div className={styles["row-2"]}>
            <TextField
              value={courseName ?? ""}
              onChange={(e) => setCourseName(e.target.value)}
              label="Course Name"
              name="courseName"
              id="courseName-input"
              required
              fullWidth
            />

            <FormControl fullWidth required>
              <InputLabel id="training-year-select-label">
                Training Year
              </InputLabel>
              <Select
                labelId="training-year-select-label"
                id="training-year-select"
                name="training-year"
                value={trainingYear ?? ""}
                label="Training Year"
                onChange={(e) => setTrainingYear(e.target.value)}
              >
                {availableTrainingYears.map((option, index) => {
                  return (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className={styles["row-3"]}>
            <TextField
              value={courseDescription ?? ""}
              onChange={(e) => setCourseDescription(e.target.value)}
              label="Course Description"
              name="courseDescription"
              id="courseDescription-input"
              required
              multiline
              rows={4}
              fullWidth
            />
          </div>

          <div className={styles["row-4"]}>
            <TextField
              value={units ?? ""}
              onChange={(e) => setUnits(e.target.value)}
              label="Units"
              name="units"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              required
            />
            <TextField
              value={hoursRequired ?? ""}
              onChange={(e) => setHoursRequired(e.target.value)}
              label="Hours Required"
              name="hoursRequired"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              fullWidth
              required
            />
          </div>

          <div className={styles["row-5"]}>
            <FormControl required>
              <FormLabel id="courseStatus-radio-buttons-group">Course Status</FormLabel>
              <RadioGroup
                row
                aria-labelledby="courseStatus-radio-buttons-group"
                name="courseStatus-radio-buttons-group"
                value={courseStatus}
                onChange={e => setCourseStatus(e.target.value)}
              >
                {COURSE_STATUS_OPTIONS.map((option, index) => {
                  return (
                    <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                  )
                })}
              </RadioGroup>
            </FormControl>
          </div>

          <div className={styles["form_buttons"]}>
            <FormButton label="Update" type="submit" />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton
              label="Cancel"
              variant="cancel"
              type="button"
              onClick={() => window.history.go(-1)}
            />
          </div>
        </form>
      </BubblePage>
    </>
  );
};

export default CourseEdit;
