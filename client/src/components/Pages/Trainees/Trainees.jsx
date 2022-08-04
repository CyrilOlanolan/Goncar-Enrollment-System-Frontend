import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

import {
  SideBar,
  BubblePage,
  ActionButton,
  BreadcrumbsComponent,
} from '../../ComponentIndex'
import styles from './Trainees.module.scss';

import sampleTrainees from '../../sampleData/sampleTrainees.json';
import { useNavigate } from 'react-router-dom';

const Trainees = () => {
  const navigate = useNavigate();
  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      onClick: () => console.log("Hi")
    },
    {
      label: "Trainees",
    },
  ]

  function RenderActionButtons(params) {
    return <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeID)} />
  }

  function onClick(id) {
    navigate(`/trainees/${id}`);
  }

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
      lockPosition: "left",
      cellRenderer: (params) => RenderActionButtons(params)
    },
  ])

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);
  const rowHeight = 40;

  /* FETCH DATA ON COMPONENT MOUNT */
  /* TODO: Implement API fetching here */
  useEffect(
    () => {
      setRowData(sampleTrainees);
    }
  , [rowData])

  function getFullName(params) {
    return `${params.data.lastName}, ${params.data.firstName} ${getMiddleInitial(params)}.`
  }

  function getMiddleInitial(params) {
    return params.data.middleName[0];
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["Trainees"]}>
          <div className={styles["Trainees__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
          </div>
          <h1 className={styles["Trainees__title"]}>Trainee Masterlist</h1>
          <div className={styles["Trainees__table"]}>
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              rowHeight={rowHeight}
            />
          </div>
        </div>
      </BubblePage>
    </>
  )
}

export default Trainees