import React, { useEffect, useState, useRef } from 'react';

import {
  SideBar,
  BubblePage,
  InputField,
  InputSelect,
  InputTextField,
  InputRadio,
  InputDatePicker,
  FormButton
} from '../../../../ComponentIndex';
import { COURSES, ENROLLMENT_STATUS } from '../../../../../assets/utilities/constants';
import styles from './TraineeRegistrationCreation.module.scss';

// TODO: VALIDATION
const TraineeRegistrationCreation = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const today = new Date();
  const courseRef = useRef();
  const batchRef = useRef();
  const sssNumberRef = useRef();
  const sbrNumberRef = useRef();
  const tinNumberRef = useRef();
  const sgLicenseNumberRef = useRef();
  const dateEnrolledRef = useRef();
  var enrollmentStatus = "";

  // CHANGE COURSE NAME HERE
  const COURSE_NAME_OPTIONS = [
    COURSES.PLTC,
    COURSES.RTC,
    COURSES.BSSC,
    COURSES.ISESTC
  ]

  const ENROLLMENT_STATUS_OPTIONS = [
    ENROLLMENT_STATUS.ACTIVE,
    ENROLLMENT_STATUS.DROPPED,
    ENROLLMENT_STATUS.FINISHED
  ]

  function getEnrollmentStatus(enrollmentStatusValue) {
    enrollmentStatus = enrollmentStatusValue;
  }

  useEffect (
    () => {
      // FETCH COURSE NAME OPTIONS
      setBatchOptions([
        "Agila",
        "Cobra",
        "Maliksi"
      ]);
    }
  , [])

  function submitForm(event) {
    event.preventDefault();
    console.log("Course Name: ", courseRef.current.value);
    console.log("Batch Name: ", batchRef.current.value);
    console.log("SSS Number: ", sssNumberRef.current.value);
    console.log("SBR Number: ", sbrNumberRef.current.value);
    console.log("TIN Number: ", tinNumberRef.current.value);
    console.log("SG License Number: ", sgLicenseNumberRef.current.value);
    console.log("Enrollment Status: ", enrollmentStatus);
    console.log("Date Enrolled: ", dateEnrolledRef.current.value);
    // event.target.reset();
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
              value={1}
              disabled={true}
              variant={"traineeID"}
            />

            <InputField
              label="Trainee ID"
              value={1}
              disabled={true}
              variant={"traineeID"}
            />
          </div>

          <div className={styles["row-2"]}>
            <InputSelect
              label="Course"
              options={COURSE_NAME_OPTIONS}
              required={true}
              name="course"
              ref={courseRef}
              fullWidth={true}
            />

            <InputSelect 
              label="Batch Name"
              options={batchOptions}
              required={true}
              name="batch"
              ref={batchRef}
              fullWidth={true}
            />
          </div>

          <div className={styles["row-3"]}>
            <InputTextField
              ref={sssNumberRef}
              label="SSS Number"
              required={true}
              name="SSSNumber"
              fullWidth={true} />

            <InputTextField
              ref={sbrNumberRef}
              label="SBR Number"
              required={true}
              name="SBRNumber"
              fullWidth={true} />
          </div>

          <div className={styles["row-4"]}>
            <InputTextField
              ref={tinNumberRef}
              label="TIN Number"
              required={true}
              name="TINNumber"
              fullWidth={true} />

            <InputTextField
              ref={sgLicenseNumberRef}
              label="SG License Number"
              required={true}
              name="sgLicenseNumber"
              fullWidth={true} />
          </div>

          <div className={styles["row-5"]}>
            <InputRadio
              label="Enrollment Status"
              required={true}
              options={ENROLLMENT_STATUS_OPTIONS}
              name="enrollmentStatus"
              onChange={getEnrollmentStatus}
            />

            <div className={styles["date-enrolled-wrapper"]}>
              <InputDatePicker
                label="Date Enrolled" 
                required={true}
                initialValue={today}
                maxDate={today}
                ref={dateEnrolledRef}
                fullWidth={true} />
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