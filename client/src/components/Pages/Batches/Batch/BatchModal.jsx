import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from './BatchModal.module.scss';

import { useBatch } from "../../../../assets/utilities/swr";

import { stringifyDate } from "../../../../assets/utilities/datetime";
const Batch = ({ openModal, setOpenModal, batch }) => {
  const [ batchData, setBatchData ] = useState(batch);
  const handleClose = () => setOpenModal(false);

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

  console.log(batchData)


  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles["Batch__details"]}>
            <h1 className={styles["name"]}>{batchData.batchName}</h1>
            <p><span className={styles["field"]}>Batch ID</span>: {batchData.batchID}</p>
            <p><span className={styles["field"]}>Batch Status</span>: {batchData.batchStatus.toUpperCase()}</p>
            <p><span className={styles["field"]}>LA Number</span>: {batchData.laNumber}</p>
            <p><span className={styles["field"]}>Start Date</span>: {stringifyDate(batchData.startDate)}</p>
            <p><span className={styles["field"]}>End Date</span>: {stringifyDate(batchData.endDate)}</p>
            <p><span className={styles["field"]}>Teacher</span>: {batchData.batchTeacher}</p>
            <p><span className={styles["field"]}>Current Population</span>: {batchData.batchPopulation}</p>
            <p><span className={styles["field"]}>Max Population</span>: {batchData.maxStudents}</p>
            {/* <p><span className={styles["field"]}>Training Year</span>: {batchData.trainingYearSpan}</p> */}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Batch;
