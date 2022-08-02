import React, { useRef } from 'react'

import { 
  SideBar, 
  BubblePage, 
  InputField,
  InputRadio,
  InputDatePicker,
  InputTextArea,
  InputSelect,
  InputYearPicker,
  InputTextField,
  FormButton,
} from '../../../../ComponentIndex';
import InputNumberField from '../../../../Shared/InputNumberField/InputNumberField';
import styles from './TraineeProfileCreation.module.scss';

const TraineeProfileCreation = () => {
  const today = new Date();
  const firstNameRef = useRef();
  const middleNameRef = useRef();
  const lastNameRef = useRef();
  const birthdayRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const emailRef = useRef();
  const educationalAttainmentRef = useRef();
  const yearGraduatedRef = useRef();

  var sex = "";


  const EDUCATIONAL_ATTAINMENT_OPTIONS = [
    "High School Graduate",
    "College Graduate",
    "Undergraduate",
  ]

  const SEX_OPTIONS  = [
    "Male",
    "Female",
    "Prefer not to say"
  ]

  function getSex(sexValue) {
    sex = sexValue;
  }

  function submitForm(event) {
    event.preventDefault();
    console.log("First Name: ", firstNameRef.current.value);
    console.log("Middle Name: ", middleNameRef.current.value);
    console.log("Last Name: ", lastNameRef.current.value);
    console.log("Sex: ", sex);
    console.log("Birthday: ", birthdayRef.current.value);
    console.log("Address: ", addressRef.current.value);
    console.log("Contact number: ", contactRef.current.value);
    console.log("Email: ", emailRef.current.value);
    console.log("Educational Attainment: ", educationalAttainmentRef.current.value);
    console.log("Year: ", yearGraduatedRef.current.value);
    // event.target.reset();
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["TraineeProfileCreation"]}>
        <h1>Trainee Profile Creation</h1>


        <form
          className={styles["TraineeProfileCreation__form"]}
          onSubmit={submitForm}>
          {/* CHANGE TRAINEE ID HERE */}
          <InputField
            label="Trainee ID"
            value={1}
            disabled={true}
            variant={"traineeID"}
            style={{marginLeft: "auto"}} />

          <div className={styles["row-1"]}>
            <InputTextField
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
              fullWidth={true} />
          </div>

          <div className={styles["row-2"]}>
            <div className={styles["sex"]}>
              <InputRadio
                label="Sex"
                options={SEX_OPTIONS}
                required={true}
                name="sex"
                onChange={getSex} />
            </div>

            <div className={styles["bday"]}>
              <InputDatePicker
              label="Date of Birth" 
              required={true}
              maxDate={today}
              ref={birthdayRef}
              fullWidth={true} />
            </div>
          </div>

          <div className={styles["row-3"]}>
            <InputTextArea 
              label="Address" 
              rows={4}
              ref={addressRef}
            />

            <div className={styles["contact_wrapper"]}>
              <InputNumberField
                label="Contact"
                placeholder={"09561234567"}
                ref={contactRef}
                fullWidth={true} />
            </div>
          </div>

          <div className={styles["row-4"]}>
            <div className={styles["email"]}>
              <InputTextField
                label="Email"
                name="email"
                placeholder="johndoe@mail.com"
                type="email"
                fullWidth={true}
                ref={emailRef}
              />
            </div>

            <div className={styles["education"]}>
              <div className={styles["educationalAttainment"]}>
                <InputSelect
                  ref={educationalAttainmentRef}
                  id="educationalAttainment"
                  label="Educational Attainment"
                  name="educationalAttainment"
                  options={EDUCATIONAL_ATTAINMENT_OPTIONS}
                  required={true}
                  fullWidth = {true}
                />
              </div>

              <div className={styles["yearGraduated"]}>
                <InputYearPicker
                  label="Year"
                  maxDate={new Date()}
                  required={true}
                  ref={yearGraduatedRef}
                  fullWidth={true}
                />
              </div>
            </div>

          </div>

          <div className={styles["form_buttons"]}>
            <FormButton label="Submit" type="submit" />
            {/* GO BACK TO PREVIOUS PAGE */}
            <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
          </div>
        </form>
      </div>
    </BubblePage>
    </>
  )
}

export default TraineeProfileCreation