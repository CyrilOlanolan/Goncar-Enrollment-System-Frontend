import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

/* MUI */
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { SideBar, BubblePage, FormButton, Spinner } from "../../../../ComponentIndex";
import styles from "./TrainingYearsEdit.module.scss";

import { putTrainingYear } from "../../../../../assets/utilities/axiosUtility";
import { useTrainingYear } from "../../../../../assets/utilities/swr";

const TrainingYearsEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const trainingYearID = location.state.trainingYearID;

  /* STATES */
  const [ startYear, setStartYear ] = useState(null)
  const [ endYear, setEndYear ] = useState(null)
  const [status, setStatus] = useState("Active");

  const STATUS_OPTIONS = ["Active", "Inactive"];

  /* ERROR STATES */
  const [ dateErrorMessage, setDateErrorMessage ] = useState(null);

  /* VALIDATION */
  useEffect(
    () => {
      // IF END YEAR IS LESS THAN START OR EQUAL, ERROR
      if (!(dayjs(startYear) < dayjs(endYear) && (dayjs(startYear).year() !== dayjs(endYear).year()))) {
        setDateErrorMessage({
          title: "INVALID DATES",
          description: "End Year must be greater than Start Year."
        })
      }
      else {
        setDateErrorMessage(null);
      }
    }
  , [startYear, endYear])

  // FETCH HERE
  const { trainingYear, isTrainingYearLoading, isTrainingYearError } = useTrainingYear(trainingYearID);

  useEffect(
    () => {
      if (isTrainingYearError) alert("Error loading training year data! Please check internet connection.");

      if (!isTrainingYearLoading) {
        let pattern = /([0-9]{4})-([0-9]{4})/;
        let matcher = new RegExp(pattern, "g");
        let match = matcher.exec(trainingYear.trainingYearSpan)
        setStartYear(match[1]);
        setEndYear(match[2]);
      }
    }
  , [trainingYear, isTrainingYearLoading, isTrainingYearError])

  function submitForm(event) {
    event.preventDefault();
    
    let data = {
      trainingYearSpan: `${dayjs(startYear).year().toString()}-${dayjs(endYear).year().toString()}`,
      trainingYearStatus: status
    };

    putTrainingYear(trainingYearID, data)
    .then(
      (status) => {
        if (status === 200) {
          navigate(`/administrative/training-years`);
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <h1 className={styles["title"]}>Edit Training Year</h1>

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
          isTrainingYearLoading ? <Spinner /> :
          <form onSubmit={(e) => submitForm(e)} className={styles["TrainingYearsEdit"]}>
            <div className={styles["TrainingYearsEdit__form"]}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Start Year"
                  name="startYear"
                  value={startYear}
                  onChange={(value) => setStartYear(value)}
                  inputFormat="yyyy"
                  openTo="year"
                  views={["year"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                    />
                  )}
                />
              </LocalizationProvider>

              <p className={styles["to"]}>to</p>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="End Year"
                  name="endYear"
                  value={endYear}
                  onChange={(value) => setEndYear(value)}
                  inputFormat="yyyy"
                  openTo="year"
                  views={["year"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className={styles["row-2"]}>
              <FormControl required>
                <FormLabel id="status-radio-buttons-group">Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="status-radio-buttons-group"
                  name="status-radio-buttons-group"
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option, index) => {
                    return (
                      <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </div>

            <div className={styles["form_buttons"]}>
              <FormButton label="Update" type="submit" disabled={dateErrorMessage} />
              {/* GO BACK TO PREVIOUS PAGE */}
              <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
            </div>
          </form>
        }
      </BubblePage>
    </>
  );
};

export default TrainingYearsEdit;
