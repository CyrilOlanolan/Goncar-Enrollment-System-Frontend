import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import styles from './TraineeRegistrationModal.module.scss';

import { useTraineeRegistration } from '../../../../../assets/utilities/swr';
import { stringifyDate } from '../../../../../assets/utilities/datetime';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TraineeRegistrationModal = ({ openModal, setOpenModal, regID, traineeID, traineeName }) => {
  const [ registrationData, setRegistrationData ] = useState({});
  const handleClose = () => setOpenModal(false);

  /* FETCH HERE */
  const { traineeRegistration, isTraineeRegistrationLoading, isTraineeRegistrationError } = useTraineeRegistration(traineeID, regID);

  useEffect(
    () => {
      if (isTraineeRegistrationError) alert("Error fetching trainee registration data! Please refresh or check your internet connection.");

      // FLATTEN
      if (!isTraineeRegistrationLoading) {
        setRegistrationData({
          courseTaken: traineeRegistration[0]?.batch?.courses?.courseName,
          registrationNumber: traineeRegistration[0]?.registrationNumber,
          batchID: traineeRegistration[0]?.batch?.batchId,
          batchName: traineeRegistration[0]?.batch?.batchName,
          trainingYear: traineeRegistration[0]?.batch?.trainingYears?.trainingYearSpan,
          dateEnrolled: traineeRegistration[0]?.dateEnrolled,
          enrollmentStatus: traineeRegistration[0]?.registrationStatus
        })
      }
    }
    , [traineeRegistration, isTraineeRegistrationLoading, isTraineeRegistrationError, setRegistrationData])

    return (
      <div className={styles["TraineeRegistrationModal"]}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <div className={styles["TraineeRegistrationModal__details"]}>
              <h1 className={styles["name"]}>{traineeName}</h1>
              <p><span className={styles["field"]}>Course Taken</span>: {registrationData.courseTaken}</p>
              <p><span className={styles["field"]}>Registration Number</span>: {registrationData.registrationNumber}</p>
              <p><span className={styles["field"]}>Batch ID</span>: {registrationData.batchID}</p>
              <p><span className={styles["field"]}>Batch Name</span>: {registrationData.batchName}</p>
              <p><span className={styles["field"]}>Training Year</span>: {registrationData.trainingYear}</p>
              <p><span className={styles["field"]}>Date Enrolled</span>: {stringifyDate(registrationData.dateEnrolled)}</p>
              <p><span className={styles["field"]}>Enrollment Status</span>: {registrationData.enrollmentStatus}</p>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default TraineeRegistrationModal