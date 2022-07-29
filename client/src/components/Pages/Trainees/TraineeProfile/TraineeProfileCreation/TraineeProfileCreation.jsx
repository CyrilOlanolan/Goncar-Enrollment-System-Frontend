import React from 'react'

import { 
  SideBar, 
  BubblePage, 
  InputField, 
  InputRadio,
  InputDatePicker,
  InputTextArea,
  InputSelect,
  InputYearPicker,
  InputTextField
} from '../../../../ComponentIndex';
import InputNumberField from '../../../../Shared/InputNumberField/InputNumberField';
import styles from './TraineeProfileCreation.module.scss';

const TraineeProfileCreation = () => {

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

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["TraineeProfileCreation"]}>
        <form className={styles["TraineeProfileCreation__form"]}>
          <div className={styles["row-1"]}>
            <InputTextField label="First Name" />
            <InputTextField label="Middle Name" required={false}/>
            <InputTextField label="Last Name" />
          </div>

          <div className={styles["row-2"]}>
            <InputRadio label="Sex" options={SEX_OPTIONS} />
            <div className={styles["bday"]}>
              <InputDatePicker label="Date of Birth"/>
            </div>
          </div>

          <div className={styles["row-3"]}>
            <InputTextArea 
              label="Address" 
              rows={4} 
            />

            <InputNumberField defaultValue={"09561234567"} label="Contact"/>
          </div>

          <div className={styles["row-4"]}>
            <div className={styles["email"]}>
              <InputTextField
                label="Email"
                name="email"
                placeholder="johndoe@mail.com"
                type="email"
                fullWidth={true}
              />
            </div>

            <div className={styles["educationalAttainment"]}>
              <InputSelect
                id="educationalAttainment"
                label="Educational Attainment"
                name="educationalAttainment"
                options={EDUCATIONAL_ATTAINMENT_OPTIONS}
              />
            </div>

            <div className={styles["yearGraduated"]}>
              <InputYearPicker label="Year" maxDate={new Date()}/>
            </div>
          </div>
        </form>
      </div>
    </BubblePage>
    </>
  )
}

export default TraineeProfileCreation