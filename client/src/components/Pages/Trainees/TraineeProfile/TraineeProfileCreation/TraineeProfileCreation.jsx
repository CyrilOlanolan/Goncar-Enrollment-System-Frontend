import React from 'react'

import { 
  SideBar, 
  BubblePage, 
  InputField, 
  InputRadio,
  InputDatePicker,
  InputTextArea,
  InputSelect,
  InputYearPicker
} from '../../../../ComponentIndex';
import styles from './TraineeProfileCreation.module.scss';

const TraineeProfileCreation = () => {

  const EDUCATIONAL_ATTAINMENT_OPTIONS = [
    "High School Graduate",
    "College Graduate",
    "Undergraduate",
  ]

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["TraineeProfileCreation"]}>
        <form className={styles["TraineeProfileCreation__form"]}>
          <div className={styles["row-1"]}>
            <InputField label={"First Name"} type={"text"} />
            <InputField label={"Middle Name"} type={"text"} />
            <InputField label={"Last Name"} type={"text"} />
          </div>

          <div className={styles["row-2"]}>
            <div className={styles["sex"]}>
              <p className={styles["sex__title"]}>Sex</p>
              <div className={styles["sex__radio-group"]}>
                <InputRadio label={"Male"} name={"sex"}/>
                <InputRadio label={"Female"} name={"sex"}/>
              </div>
            </div>
            <div className={styles["bday"]}>
              <InputDatePicker label="Date of Birth"/>
            </div>
          </div>

          <div className={styles["row-3"]}>
            <InputTextArea 
              label="Address" 
              rows={4} 
              cols={1} 
              id="address" 
              name="address"/>

            <InputField
              label="Contact Number"
              name="contactNum"
              type="tel"
              pattern="[0-9]{11}"
              placeholder="09561234567"
            />
          </div>

          <div className={styles["row-4"]}>
            <div className={styles["email"]}>
              <InputField
                label="Email"
                name="email"
                placeholder="johndoe@mail.com"
                type="email"
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