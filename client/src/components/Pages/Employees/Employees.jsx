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
import styles from './Employees.module.scss';
import { useNavigate } from 'react-router-dom';

import { postEmployee } from '../../../assets/utilities/axiosUtility';
import { useEmployees } from '../../../assets/utilities/swr';

const Employees = () => {
  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Employees",
    },
  ]

  function getFullName(params) {
    return `${params.data.lastName}, ${params.data.firstName}${getMiddleInitial(params)}`
  }

  function getMiddleInitial(params) {
    if (params.data.middleName[0]) {
      return " " + params.data?.middleName[0] + ".";
    }
    return "";
  }
  
  /* FOR TABLE */
  function RenderActionButtons(params) {
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeId)} />
      </div>
    )
  }

  function onClick(id) {
    // navigate(`/trainees/${id}`);
  }

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
      // cellRenderer: getFullName,
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

  // FETCH HERE
  // const { employees, isEmployeesLoading, isEmployeesError } = useEmployees();

  // useEffect(
  //   () => {
  //     if (isEmployeesError) alert("Error fetching employees data. Check internet conenction!")

  //     if (!isEmployeesLoading) {
  //       console.log(employees)
  //     }
  //   }
  // , [employees, isEmployeesLoading, isEmployeesError])

  function postEmployees() {
    console.log("hello")
    let data = {
      firstName: "Cyril",
      middleName: "Malinao",
      lastName: "Olanolan",
      birthday: new Date(),
      sex: "Male",
      emailAdd: "olanolancyrilm@gmail.com",
      cpNum: "09566925939",
      employeeStatus: "Active",
      dateHired: new Date(),
      roleId: 1
    }

    postEmployee(data)
    .then(
      (status) => {
        if (status === 201) {
          console.log("hooray")
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["Employees"]}>
          <div className={styles["Employees__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
          </div>
          <h1 className={styles["Employees__title"]}>Employee Masterlist</h1>
          {
            false ?
            <Spinner /> :
            <>
              <div className={styles["new-button"]}>
                <NewButton label="NEW EMPLOYEE" onClick={() => postEmployees()}/>
              </div>
              <div className={[styles["Employees__table"], "ag-theme-alpine"].join(" ")}>
                <AgGridReact
                  {...gridOptions}
                />
              </div>
            </>
          }
        </div>
      </BubblePage>
    </>
  )
}

export default Employees