import React, { FC, MouseEventHandler } from 'react'
import styles from './BatchesCard.module.scss';

type props = {
    batchId: number,
    batchName: string,
    laNumber: string,
    batchTeacher: string,
    batchPopulation: number,
    maxStudents: number,
    onClick: MouseEventHandler<HTMLDivElement>
}

const BatchesCard : FC<props> = (props) => {
  function handleEditClick(id: number) {
    console.log(id);
  }
  return (
    <div className={styles["BatchesCard"]} onClick={props.onClick}>
      <div className={styles["BatchesCard__header"]}>
        <div className={styles["name-population-div"]}>
          <p className={styles["batchName"]}>{props.batchName}</p>
          <p className={styles["batchPopulation"]}>
            {`${props.batchPopulation} / ${props.maxStudents}`}
          </p>
        </div>
        <p className={styles["batchIdentifier"]}>#{props.laNumber}</p>
      </div>
      <div className={styles["BatchesCard__details"]}>
        <p className={styles["batchTeacherTitle"]}>Teacher:</p>
        <p className={styles["batchTeacher"]}>{props.batchTeacher}</p>
      </div>

      <button
        className={styles["BatchesCard__edit-button"]}
        onClick={(event) => {
          event.stopPropagation()
          handleEditClick(props.batchId)
        }}
      >EDIT</button>
    </div>
  )
}

export default BatchesCard