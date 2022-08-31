import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useParams } from 'react-router-dom';
import { useTraineeRegistrations } from '../../../../../assets/utilities/swr';

import {
  ActionButton,
  TraineeRegistrationModal,
  Spinner
} from '../../../../ComponentIndex';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../../styles/ag-theme-user.css'; // Optional theme CSS

const TraineeRegistrationTabContent = (traineeName) => {
  //CONTROLLING MODAL
  const [ openModal, setOpenModal ] = useState(false);
  const [ regID, setRegID ] = useState(undefined);
  const { traineeID } = useParams();

  function RenderActionButtons(params) {
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", columnGap: "0.5rem"}}>
        <ActionButton variant="view" onClick={() => onClick(params.data.registrationNumber)} />
        <ActionButton variant="edit" onClick={() => onClick(params.data.registrationNumber)} />
      </div>
    )
  }

  function onClick(regId) {
    // MODAL HERE
    setRegID(regId)
    setOpenModal(true);
  }

  /* FOR TABLE */
  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "course",
      headerName: "Course",
      lockPosition: "left",
      minWidth: 200,
      flex: 1,
      sortable: true
    },
    {
      field: "trainingYear",
      headerName: "Training Year",
      lockPosition: "left",
      width: 150,
      sortable: true
    },
    {
      field: "batchName",
      headerName: "Batch",
      lockPosition: "left",
      width: 120,
      sortable: true
    },
    {
      field: "status",
      headerName: "Status",
      lockPosition: "left",
      width: 100,
      sortable: true
    },
    {
      field: "",
      headerName: "Action",
      lockPosition: "left",
      cellRenderer: (params) => RenderActionButtons(params),
      minWidth: 100,
      flex: 2,
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

  /* FETCH HERE */
  const { traineeRegistrations, isTraineeRegistrationsLoading, isTraineeRegistrationsError } = useTraineeRegistrations(traineeID);

  useEffect(
    () => {
      if (isTraineeRegistrationsError) alert("Error fetching trainee registrations data! Please refresh or check your internet connection.");
      
      var traineeRegistrationsRowData = [];
      
      // FLATTEN DATA
      if (!isTraineeRegistrationsLoading) {
        for (let registration of traineeRegistrations) {
          traineeRegistrationsRowData.push({
            course: registration.batch.courses.courseName,
            trainingYear: registration.batch.trainingYears.trainingYearSpan,
            batchName: registration.batch.batchName,
            status: registration.registrationStatus,
            registrationNumber: registration.registrationNumber
          })
        }
      }

      setRowData(traineeRegistrationsRowData);
    }
  , [traineeRegistrations, isTraineeRegistrationsLoading, isTraineeRegistrationsError])

  return (
    <>
      { 
        regID === undefined ? null :
        <TraineeRegistrationModal
          traineeName={traineeName.traineeName}
          openModal={openModal}
          setOpenModal={setOpenModal}
          traineeID={traineeID}
          regID={regID} />
      }

      {
        isTraineeRegistrationsLoading ? <Spinner /> :
        <div className={["ag-theme-alpine"].join(" ")} style={{position: "relative", height: "100%"}}>
          <AgGridReact
            {...gridOptions}
          />
        </div>
      }
    </>
  )
}

export default TraineeRegistrationTabContent