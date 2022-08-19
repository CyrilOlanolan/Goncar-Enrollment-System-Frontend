import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../styles/ag-theme-user.css'; // Optional theme CSS

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
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeID)} />
      </div>
    )
  }

  function onClick(id) {
    navigate(`/trainees/${id}`);
  }

  /* FOR TABLE */
  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "traineeID",
      headerName: "ID",
      lockPosition: "left",
      width: 90,
      sortable: true
    },
    {
      field: "id",
      headerName: "Full Name",
      lockPosition: "left",
      cellRenderer: getFullName,
      minWidth: 230,
      flex: 1,
      sortable: true
    },
    {
      field: "",
      headerName: "Current Course",
      lockPosition: "left",
      width: 150,
      sortable: true
    },
    {
      field: "",
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
          <div className={[styles["Trainees__table"], "ag-theme-alpine"].join(" ")}>
            <AgGridReact
              {...gridOptions}
            />
          </div>
        </div>
      </BubblePage>
    </>
  )
}

export default Trainees