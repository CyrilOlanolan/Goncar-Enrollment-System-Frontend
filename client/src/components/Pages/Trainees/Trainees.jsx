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
  Spinner,
  NewButton
} from '../../ComponentIndex'
import styles from './Trainees.module.scss';
import { useNavigate } from 'react-router-dom';

/* SWR */
import { useTrainees } from '../../../assets/utilities/swr';

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
        <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeId)} />
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
      field: "traineeId",
      headerName: "ID",
      lockPosition: "left",
      width: 75,
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
      field: "currentCourse",
      headerName: "Current Course",
      lockPosition: "left",
      width: 150,
      sortable: true
    },
    {
      field: "currentStatus",
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

  /* FETCH DATA ON COMPONENT MOUNT */
  /* TODO: Implement API fetching here */
  const { trainees, isTraineesLoading, isTraineesError } = useTrainees();

  useEffect(
    () => {
      if (isTraineesError) alert("Error fetching trainees data! Please refresh or check your internet connection.");

      let traineesRowData = [];

      // FLATTEN OUT QUERY RESULT
      if (!isTraineesLoading) {
        for (let trainee of trainees) {
          traineesRowData.push({
            "traineeId": trainee.traineeId,
            "lastName": trainee.lastName, 
            "firstName": trainee.firstName,
            "middleName": trainee.middleName,
            "currentCourse": (() => {
              if (trainee.registrations[0] === undefined) {
                return "N/A";
              }
            
              return trainee.registrations[0].batch.courses.courseName;
            })(),
            "currentStatus": (() => {
              if (trainee.registrations[0] === undefined) {
                return "Inactive";
              }
            
              return trainee.registrations[0].registrationStatus;
            })()
          })
        }
      }

      setRowData(traineesRowData)
    }
  , [trainees, isTraineesError, isTraineesLoading])

  function getFullName(params) {
    return `${params.data.lastName}, ${params.data.firstName} ${getMiddleInitial(params)}.`
  }

  function getMiddleInitial(params) {
    return params.data.middleName[0];
  }

  function handleNewTraineeProfile() {
    navigate('/trainees/new');
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
          <div className={styles["new-button"]}>
            <NewButton label="NEW TRAINEE PROFILE" onClick={handleNewTraineeProfile}/>
          </div>
          {
            isTraineesLoading ?
            <Spinner /> :
            <div className={[styles["Trainees__table"], "ag-theme-alpine"].join(" ")}>
              <AgGridReact
                {...gridOptions}
              />
            </div>
          }
        </div>
      </BubblePage>
    </>
  )
}

export default Trainees