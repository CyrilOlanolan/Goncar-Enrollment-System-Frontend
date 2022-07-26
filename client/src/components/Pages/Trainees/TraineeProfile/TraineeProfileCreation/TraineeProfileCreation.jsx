import React from 'react'

import { SideBar, BubblePage, InputField } from '../../../../ComponentIndex';
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
        </form>
      </div>
    </BubblePage>
    </>
  )
}

export default TraineeProfileCreation