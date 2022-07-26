import React from 'react'

import { 
  SideBar, 
  BubblePage, 
  InputField, 
  InputRadio,
  InputSelect
} from '../../../../ComponentIndex';
import styles from './TraineeProfileCreation.module.scss';

const TraineeProfileCreation = () => {
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
              <InputSelect label="Date of Birth"/>
            </div>
          </div>
        </form>
      </div>
    </BubblePage>
    </>
  )
}

export default TraineeProfileCreation