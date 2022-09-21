import React, { useRef } from 'react'

import {
  SideBar,
  BubblePage,
  InputField,
  FormButton,
} from '../../../../ComponentIndex';
import styles from './EmployeeProfileCreation.module.scss';
import { SEX, MARITAL_STATUS, EMPLOYEE_ROLE, EMPLOYMENT_STATUS } from "../../../../../assets/utilities/constants";

const EmployeeProfileCreation = () => {
  const today = new Date();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const birthdayRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef();
  const maritalStatusRef = useRef();
  const employeeRoleRef = useRef();
  var sex = "";
  var employmentStatus = "";

  const SEX_OPTIONS  = [
    SEX.MALE,
    SEX.FEMALE
  ]

  const MARITAL_STATUS_OPTIONS = [
    MARITAL_STATUS.SINGLE,
    MARITAL_STATUS.MARRIED,
    MARITAL_STATUS.WIDOWED,
    MARITAL_STATUS.ANULLED
  ]

  const EMPLOYEE_ROLE_OPTIONS = [
    EMPLOYEE_ROLE.TEACHER,
    EMPLOYEE_ROLE.CASHIER,
    EMPLOYEE_ROLE.REGISTRAR
  ]

  const EMPLOYMENT_STATUS_OPTIONS = [
    EMPLOYMENT_STATUS.ACTIVE,
    EMPLOYMENT_STATUS.INACTIVE
  ]

  function getSex(sexValue) {
    sex = sexValue;
  }

  function getEmploymentStatus(employmentStatusValue) {
    employmentStatus = employmentStatusValue;
  }

  function submitForm(event) {
    event.preventDefault();
    console.log("First Name: ", firstNameRef.current.value);
    console.log("Middle Name: ", middleNameRef.current.value);
    console.log("Last Name: ", lastNameRef.current.value);
    console.log("Sex: ", sex);
    console.log("Birthday: ", birthdayRef.current.value);
    console.log("Address: ", addressRef.current.value);
    console.log("Marital Status: ", maritalStatusRef.current.value);
    console.log("Contact number: ", contactRef.current.value);
    console.log("Email: ", emailRef.current.value);
    console.log("Employee Role: ", employeeRoleRef.current.value);
    console.log("Employment Status: ", employmentStatus);
    // event.target.reset();
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <h1 className={styles["title"]}>Employee Profile Creation</h1>

      <form className={styles["EmployeeProfileCreation"]} onSubmit={submitForm}>
        <div className="disabled-fields">
          {/* EDIT EMPLOYEE ID HERE */}
          <InputField
            label="Employee ID"
            value={1}
            disabled={true}
            variant={"traineeID"}
            style={{marginLeft: "auto"}} />
        </div>

        <div className={styles["row-1"]}>
          {/* <InputTextField
            ref={firstNameRef}
            label="First Name"
            required={true}
            name="firstName"
            fullWidth={true} />

          <InputTextField
            ref={middleNameRef}
            label="Middle Name"
            name="middleName"
            fullWidth={true} />

          <InputTextField label="Last Name"
            ref={lastNameRef}
            required={true}
            name="lastName"
            fullWidth={true} /> */}
        </div>

        <div className={styles["row-2"]}>
            <div className={styles["sex"]}>
              {/* <InputRadio
                label="Sex"
                options={SEX_OPTIONS}
                required={true}
                name="sex"
                onChange={getSex} /> */}
            </div>

            <div className={styles["bday"]}>
              {/* <InputDatePicker
              label="Date of Birth" 
              required={true}
              maxDate={today}
              ref={birthdayRef}
              fullWidth={true} /> */}
            </div>
        </div>

        <div className={styles["row-3"]}>
          {/* <InputTextArea 
            label="Address" 
            rows={4}
            ref={addressRef}
            name="address" */}
          {/* /> */}

          <div className={styles["marital-status-wrapper"]}>
            {/* <InputSelect 
              label="Marital Status"
              options={MARITAL_STATUS_OPTIONS}
              ref={maritalStatusRef}
            /> */}
          </div>
        </div>

        <div className={styles["row-4"]}>
          {/* <InputTextField
            label="Email"
            name="email"
            placeholder="johndoe@mail.com"
            type="email"
            fullWidth={true}
            ref={emailRef}
            required={true}
          /> */}

          <div className={styles["contact_wrapper"]}>
            {/* <InputNumberField
              label="Contact"
              placeholder={"09561234567"}
              name="contact"
              ref={contactRef}
              fullWidth={true}
              /> */}
          </div>
        </div>

        <div className={styles["row-5"]}>
          <div className={styles["employee-role-wrapper"]}>
            {/* <InputSelect 
              label="Employee Role"
              options={EMPLOYEE_ROLE_OPTIONS}
              required={true}
              name="employeeRole"
              ref={employeeRoleRef}
            /> */}
          </div>

          <div className={styles["employee-status-wrapper"]}>
            {/* <InputRadio
              label="Employment Status"
              options={EMPLOYMENT_STATUS_OPTIONS}
              required={true}
              name="employmentStatus"
              onChange={getEmploymentStatus} /> */}
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

export default EmployeeProfileCreation