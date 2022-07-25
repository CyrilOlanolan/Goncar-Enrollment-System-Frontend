import React from 'react'

import {
  SideBar,
  BubblePage,
} from '../../ComponentIndex'
import styles from './Trainees.module.scss';

const Trainees = () => {

  return (
    <>
      <SideBar />
      <div className={styles["Trainees"]}>
        <BubblePage>
          <h1>Trainee Masterlist</h1>
          <div className={styles["Trainees__table"]}>

          </div>
        </BubblePage>
      </div>
    </>
  )
}

export default Trainees