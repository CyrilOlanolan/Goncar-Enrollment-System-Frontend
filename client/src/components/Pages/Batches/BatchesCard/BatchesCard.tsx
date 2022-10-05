import React, { FC, MouseEventHandler } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom';

import styles from './BatchesCard.module.scss';

type props = {
    batchID: number,
    batchName: string,
    laNumber: string,
    batchTeacher: string,
    batchPopulation: number,
    maxStudents: number,
    onClick: MouseEventHandler<HTMLDivElement>,
    variant: String
}

const BatchesCard : FC<props> = (props) => {
  const navigate : NavigateFunction = useNavigate();

  function handleEditClick(batchID: number) {
    navigate('/batch/edit', {
      state: {
        batchID: batchID
      }
    })
  }

  return (
    <div className={[styles["BatchesCard"], styles[`BatchesCard__${props.variant}`]].join(' ')} onClick={props.onClick}>
      <div className={styles["BatchesCard__header"]}>
        <div className={styles["name-population-div"]}>
          <p className={styles["batchName"]}>{props.batchName}</p>
          <p className={styles["batchPopulation"]}>
            <span
              className={styles[`${props.batchPopulation > props.maxStudents - 5 ? "warning" : ""}`]}
            >{`${props.batchPopulation}`}</span>
            {` / ${props.maxStudents}`}
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
          handleEditClick(props.batchID)
        }}
      >EDIT</button>
    </div>
  )
}

export default BatchesCard