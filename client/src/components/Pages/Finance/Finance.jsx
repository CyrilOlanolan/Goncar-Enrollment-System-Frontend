import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../styles/ag-theme-user.css'; // Optional theme CSS

import {
  SideBar,
  BubblePage,
  Spinner,
  BreadcrumbsComponent,
  ActionButton
} from '../../ComponentIndex'
import styles from './Finance.module.scss';

import { useFinance } from '../../../assets/utilities/swr';

const Finance = () => {
  const navigate = useNavigate();
  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Finance",
    },
  ]

  /* FOR TABLE */
  function RenderActionButtons(params) {
    return (
      <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.courseID)} />
      </div>
    )
  }

  function onClick(courseID) {
    navigate(`/finance/course/${courseID}`);
  }

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "courseID",
      headerName: "ID",
      lockPosition: "left",
      width: 75,
      sortable: true
    },
    {
      field: "courseName",
      headerName: "Course",
      lockPosition: "left",
      minWidth: 200,
      flex: 1,
      sortable: true
    },
    {
      field: "trainingYearSpan",
      headerName: "Training Year",
      lockPosition: "left",
      width: 150,
      sortable: true
    },
    {
      field: "tuition",
      headerName: "Tuition",
      lockPosition: "left",
      cellRenderer: (params) => `₱ ${params.data.tuition}`,
      width: 150,
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

  // FETCH DATA HERE
  const { finance, isFinanceLoading, isFinanceError } = useFinance();

  useEffect(() => {
    if (isFinanceError) alert("ERROR loading payables data. Check internet connection!");

    let rows = [];

    if (!isFinanceLoading) {

      for (let course of finance) {
        let flattenPayables = {};
        flattenPayables['courseID'] = course.courseId;
        flattenPayables['courseName'] = course.courseName;
        flattenPayables['trainingYearID'] = course?.trainingYears?.trainingYearId;
        flattenPayables['trainingYearSpan'] = course?.trainingYears?.trainingYearSpan;
        flattenPayables['tuition'] = parseFloat(course?.tuition);

        // PUSH AFTER FLATTING
        rows.push(flattenPayables);
      }

      setRowData(rows)
    }
  }, [ finance, isFinanceLoading, isFinanceError ]);

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["Finance"]}>
          <div className={styles["Finance__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
          </div>
          <h1 className={styles["Finance__title"]}>Finance</h1>
          {
            isFinanceLoading ?
            <Spinner /> :
            <>
              <div className={[styles["Finance__table"], "ag-theme-alpine"].join(" ")}>
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

export default Finance