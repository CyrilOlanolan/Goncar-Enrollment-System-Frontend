import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useNavigate } from 'react-router-dom';

import { ActionButton } from '../../../../ComponentIndex';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../../styles/ag-theme-user.css'; // Optional theme CSS

const TraineeRegistrationTabContent = () => {
  // const navigate = useNavigate();

  function RenderActionButtons(params) {
    console.log(params.data)
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", columnGap: "0.5rem"}}>
        <ActionButton variant="view" onClick={() => onClick(params.data.registrationNumber)} />
        <ActionButton variant="edit" onClick={() => onClick(params.data.registrationNumber)} />
      </div>
    )
  }

  function onClick(id) {
    // navigate(`/trainees/registration/${id}`);
    // MODAL HERE
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

  useEffect(
    /* FETCH HERE */
    () => {
      setRowData([{
          registrationNumber: 1,
          batchID: 2,
          dateEnrolled: "January, 07, 2021",
          course: "In-Service Enhancement",
          trainingYear: "2021-2022",
          batchName: "Agila",
          status: "active"
      }])
    }
  , [])

  console.log(rowData);

  return (
    <div className={["ag-theme-alpine"].join(" ")} style={{position: "relative", height: "100%"}}>
      <AgGridReact
        {...gridOptions}
      />
    </div>
  )
}

export default TraineeRegistrationTabContent