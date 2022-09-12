import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

/* MUI */
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
      trainingYearSpan: `${dayjs(startYear).year().toString()}-${dayjs(endYear).year().toString()}`
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
        <h1 className={styles["title"]}>Add a New Training Year</h1>

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

            <div className={styles["form_buttons"]}>
              <FormButton label="Update" type="submit" />
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
