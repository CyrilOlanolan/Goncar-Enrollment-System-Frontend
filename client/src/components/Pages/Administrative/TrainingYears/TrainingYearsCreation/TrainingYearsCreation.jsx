import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

/* MUI */
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { SideBar, BubblePage, FormButton } from "../../../../ComponentIndex";
import styles from "./TrainingYearsCreation.module.scss";

import { postTrainingYear } from "../../../../../assets/utilities/axiosUtility";

const TrainingYearsCreation = () => {
  const navigate = useNavigate();

  /* STATES */
  const [ startYear, setStartYear ] = useState(String(dayjs().year()))
  const [ endYear, setEndYear ] = useState(String(dayjs().add(1, 'year').year()))
  
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

  function submitForm(event) {
    event.preventDefault();

    let data = {
      trainingYearSpan: `${dayjs(startYear).year().toString()}-${dayjs(endYear).year().toString()}`
    };

    postTrainingYear(data)
    .then(
      (status) => {
        if (status === 201) {
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
        <h1 className={styles["title"]}>Add a New Training Year</h1>
        {
          dateErrorMessage ? 
          <Alert severity="error">
            <AlertTitle>{dateErrorMessage.title}</AlertTitle>
            {dateErrorMessage.description}
          </Alert>
          :
          null
        }
        <form onSubmit={(e) => submitForm(e)} className={styles["TrainingYearsCreation"]}>
          <div className={styles["TrainingYearsCreation__form"]}>
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

          <div className={styles["form_buttons"]}>
            <FormButton label="Submit" type="submit" disabled={dateErrorMessage}/>
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </BubblePage>
    </>
  );
};

export default TrainingYearsCreation;
