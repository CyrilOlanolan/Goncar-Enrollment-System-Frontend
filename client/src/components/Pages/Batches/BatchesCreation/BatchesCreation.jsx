import React, { useRef, useEffect, useState } from 'react'

import {
  SideBar,
  BubblePage,
  InputField,
  InputTextField,
  InputSelect,
  InputDatePicker,
  FormButton
} from '../../../ComponentIndex';
import InputNumberField from '../../../Shared/InputNumberField/InputNumberField';
import styles from './BatchesCreation.module.scss';

// VALIDATION FOR START DATE AND END DATE
const BatchesCreation = () => {
  const laNumberRef = useRef();
  const studentLimitRef = useRef();
  const instructorRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

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
    console.log("LA Number:", laNumberRef.current.value);
    console.log("Student Limit:", studentLimitRef.current.value);
    console.log("Instructor:", instructorRef.current.value);
    console.log("Start Date:", startDateRef.current.value);
    console.log("End Date:", endDateRef.current.value);
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
              value={1}
              disabled={true}
              variant={"traineeID"}
              style={{marginLeft: "auto"}} />
          </div>

          <div className={styles["row-2"]}>
            <InputTextField
              ref={laNumberRef}
              label="LA Number"
              name="laNumber"
              fullWidth={true}
            />
          </div>

          <div className={styles["row-3"]}>
            <InputNumberField
              ref={studentLimitRef}
              label="Student Limit"
              name="studentLimit"
            />

            <InputSelect
              ref={instructorRef}
              label="Instructor"
              options={instructorOptions}
              required={true}
              name="instructor"
              fullWidth={true}
            />
          </div>

          <div className={styles["row-4"]}>
            <InputDatePicker
              label="Start Date"
              required={true}
              name="startDate"
              ref={startDateRef}
              fullWidth={true}
            />

            <InputDatePicker
              label="End Date"
              required={true}
              name="endDate"
              ref={endDateRef}
              fullWidth={true}
            />
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