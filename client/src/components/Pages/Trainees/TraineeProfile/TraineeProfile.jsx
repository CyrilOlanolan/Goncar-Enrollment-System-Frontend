import React from 'react'

import styles from "./TraineeProfile.module.scss"

/* SAMPLE DATA */
import sampleTrainees from "../../../sampleData/sampleTrainees.json";

const TraineeProfile = ({ traineeID }) => {
  /* TODO: Remove details based on course */
  /* TODO: FETCH here */
  const trainee = sampleTrainees[traineeID - 1];

  return (
    <div className={styles["TraineeProfile"]}>
      <h1 className={styles["TraineeProfile__name"]}>{`${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`.toUpperCase()}</h1>
      <div className={styles["TraineeProfile__details"]}>
        <div className={styles["col-1"]}>
          <p><span>Trainee ID:</span> {trainee.traineeID}</p>
          <p><span>Date of Birth:</span> {trainee.birthDay}</p>
          <p><span>Sex:</span> {trainee.sex}</p>
          <p><span>Address:</span> {trainee.address}</p>
          <p><span>E-mail:</span> {trainee.emailAdd}</p>
          <p><span>Phone Number:</span> {trainee.cpNum}</p>
        </div>
        <div className={styles["col-2"]}>
          <p><span>SSS Number:</span> {trainee.SSSNum}</p>
          <p><span>SBR Number:</span> {trainee.SBRNum}</p>
          <p><span>TIN Number:</span> {trainee.TINNum}</p>
          <p><span>SG License Number:</span> {trainee.SGLicense}</p>
          <p><span>SG License Expiry:</span> {trainee.expiryDate}</p>
        </div>
      </div>
    </div>
  )
}

export default TraineeProfile