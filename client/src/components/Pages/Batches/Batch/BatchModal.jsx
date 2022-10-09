import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useNavigate } from "react-router-dom";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../styles/ag-theme-user.css'; // Optional theme CSS

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from './BatchModal.module.scss';

import { ActionButton } from "../../../ComponentIndex";

import { stringifyDate } from "../../../../assets/utilities/datetime";
import { useBatch } from "../../../../assets/utilities/swr";

const Batch = ({ openModal, setOpenModal, batch }) => {
  const navigate = useNavigate();
  const [ batchData ] = useState(batch);
  const handleClose = () => setOpenModal(false);

  // FETCH TRAINEES HERE
  const {
    batch: specificBatch,
    isBatchLoading: isSpecificBatchLoading,
    isBatchError: isSpecificBatchError
  } = useBatch(batch.batchID)

  useEffect(() => {

    if (isSpecificBatchError) alert("Error fetching batch data! Check internet connection.");

    let traineeFlatten = [];
    if (!isSpecificBatchLoading) {
      for (let trainee of specificBatch.registrations) {
        console.log(trainee)
        traineeFlatten.push({
          traineeID: trainee.trainees.traineeId,
          lastName: trainee.trainees.lastName,
          middleName: trainee.trainees.middleName,
          firstName: trainee.trainees.firstName,
        });
      }
      setRowData(traineeFlatten)
    }
    
  }, [specificBatch, isSpecificBatchLoading, isSpecificBatchError]);

  function getFullName(params) {
    return `${params.data.lastName}, ${params.data.firstName}${getMiddleInitial(params)}`
  }

  function getMiddleInitial(params) {
    if (params.data.middleName) {
      return " " + params.data?.middleName[0] + ".";
    }
    return "";
  }

  function RenderActionButtons(params) {
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeID)} />
      </div>
    )
  }

  function onClick(id) {
    navigate(`/trainees/${id}`);
  }

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "traineeID",
      headerName: "ID",
      lockPosition: "left",
      width: 75,
      sortable: true
    },
    {
      field: "fullName",
      headerName: "Full Name",
      lockPosition: "left",
      valueGetter: (params) => getFullName(params),
      minWidth: 230,
      flex: 1,
      sortable: true
    },
    {
      field: "",
      headerName: "Action",
      lockPosition: "left",
      cellRenderer: (params) => RenderActionButtons(params),
      minWidth: 100,
      flex: 2,
      filter: false
    },
  ])
  
  /* TABLE SETTINGS */
  const gridOptions = {
    defaultColDef: {
      filter: true
    },
    columnDefs: columnDefs,
    rowData: rowData,
    pagination: true,
    paginationAutoPageSize: true
  }

  // MODAL
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={styles["Batch"]}>
            <h1 className={styles["name"]}>{batchData.batchName}</h1>
            <div className={styles["Batch__details"]}>
              <div className={styles["col-1"]}>
                <p><span className={styles["field"]}>Batch ID</span>: {batchData.batchID}</p>
                <p><span className={styles["field"]}>Batch Status</span>: {batchData.batchStatus.toUpperCase()}</p>
                <p><span className={styles["field"]}>LA Number</span>: {batchData.laNumber}</p>
                <p><span className={styles["field"]}>Teacher</span>: {batchData.batchTeacher}</p>
              </div>
              <div className={styles["col-2"]}>
              <p><span className={styles["field"]}>Start Date</span>: {stringifyDate(batchData.startDate)}</p>
              <p><span className={styles["field"]}>End Date</span>: {stringifyDate(batchData.endDate)}</p>
              <p><span className={styles["field"]}>Current Population</span>: {batchData.batchPopulation}</p>
              <p><span className={styles["field"]}>Max Population</span>: {batchData.maxStudents}</p>
              </div>
            </div>
            {/* <p><span className={styles["field"]}>Training Year</span>: {batchData.trainingYearSpan}</p> */}
          </div>
          <div className={styles["Batch__trainees"]}>
            <h3>Trainee List</h3> 
            <div className={styles["trainees"]}>
              <div className={[styles["trainees__table"], "ag-theme-alpine"].join(" ")}>
                <AgGridReact
                  {...gridOptions}
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Batch;
