import React, { FC } from 'react'
import styles from './BatchesCard.module.scss';

type props = {
    batchID: number,
    batchName: string,
    batchIdentifier: string,
    batchTeacher: string,
    batchPopulation: number,
    batchMaxPopulation: number,
}

const BatchesCard : FC<props> = (props) => {
  function handleEditClick(id: number) {
    console.log(id);
  }
  return (
    <div className={styles["BatchesCard"]}>
      <div className={styles["BatchesCard__header"]}>
        <div className={styles["name-population-div"]}>
          <p className={styles["batchName"]}>{props.batchName}</p>
          <p className={styles["batchPopulation"]}>
            {`${props.batchPopulation} / ${props.batchMaxPopulation}`}
          </p>
        </div>
        <p className={styles["batchIdentifier"]}>#{props.batchIdentifier}</p>
      </div>
      <div className={styles["BatchesCard__details"]}>
        <p className={styles["batchTeacherTitle"]}>Teacher:</p>
        <p className={styles["batchTeacher"]}>{props.batchTeacher}</p>
      </div>

      <button
        className={styles["BatchesCard__edit-button"]}
        onClick={() => handleEditClick(props.batchID)}
      >EDIT</button>
    </div>
  )
}

export default BatchesCard