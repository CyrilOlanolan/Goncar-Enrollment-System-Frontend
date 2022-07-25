import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import {
  SideBar,
  BubblePage,
} from '../../ComponentIndex'
import styles from './Trainees.module.scss';

import sampleTrainees from '../../sampleData/sampleTrainees.json';

const Trainees = () => {
  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "traineeID",
      headerName: "ID",
      lockPosition: "left",
      width: 50
    },
    {
      field: "id",
      headerName: "Full Name",
      lockPosition: "left",
      cellRenderer: getFullName,
      width: 233
    },
    {
      field: "",
      headerName: "Current Course",
      lockPosition: "left"
    },
    {
      field: "",
      headerName: "Status",
      lockPosition: "left"
    },
    {
      field: "",
      headerName: "Action",
      lockPosition: "left"
    },
  ])

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* FETCH DATA ON COMPONENT MOUNT */
  /* TODO: Implement API fetching here */
  useEffect(
    () => {
      setRowData(sampleTrainees);
    }
  , [rowData])

  console.log(rowData)

  function getFullName(params) {
    return `${params.data.lastName}, ${params.data.firstName} ${getMiddleInitial(params)}.`
  }

  function getMiddleInitial(params) {
    return params.data.middleName[0];
  }

  return (
    <>
      <SideBar />
      <div className={styles["Trainees"]}>
        <BubblePage>
          <h1>Trainee Masterlist</h1>
          <AgGridReact columnDefs={columnDefs} rowData={rowData} />
        </BubblePage>
      </div>
    </>
  )
}

export default Trainees