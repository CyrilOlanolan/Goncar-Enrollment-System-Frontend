import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../styles/ag-theme-user.css'; // Optional theme CSS

import {
  BubblePage,
  SideBar,
  BreadcrumbsComponent,
  ActionButton,
  Spinner,
  NewButton
} from '../../../ComponentIndex'
import styles from './PayableBreakdownView.module.scss';

import { useCoursePayables } from '../../../../assets/utilities/swr';

const PayableBreakdownView = () => {
  const navigate = useNavigate();
  const params = useParams();

  const courseID = params.courseID;

  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Finance",
      href: "/finance",
    },
    {
      label: "Payables List",
    },
  ]

  // STATES
  const [coursePayablesData, setCoursePayablesData] = useState({});

    /* FOR TABLE */
    function RenderActionButtons(params) {
      return (
        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", columnGap: "0.5rem"}}>
          <ActionButton label="Edit" variant={"edit"} onClick={() => onClickEdit(params.data.courseID)} />
          <ActionButton label="Delete" variant={"delete"} onClick={() => onClickDelete(params.data.courseID)} />
        </div>
      )
    }
  
    function onClickEdit(courseID) {
      console.log('EDIT ', courseID)
    }

    function onClickDelete(courseID) {
      console.log('DELETE ', courseID)
    }
  
    /* INITIALIZE rowData VARIABLE */
    const [rowData, setRowData] = useState([]);
  
    /* SET COLUMN DEFINITIONS */
    const [columnDefs] = useState([
      {
        field: "payableId",
        headerName: "ID",
        lockPosition: "left",
        width: 75,
        sortable: true
      },
      {
        field: "payableName",
        headerName: "Payable Name",
        lockPosition: "left",
        minWidth: 200,
        flex: 1,
        sortable: true
      },
      {
        field: "payableCost",
        headerName: "Cost",
        lockPosition: "left",
        width: 150,
        sortable: true,
        cellRenderer: (params) => `₱ ${params.data.payableCost}`
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

  // FETCH DATE HERE
  const { coursePayables, isCoursePayablesLoading, isCoursePayablesError } = useCoursePayables(courseID);

  useEffect(() => {
    if (isCoursePayablesError) alert("ERROR fetching course payables data. Check internet connection!");

    let flattenData = {};

    if (!isCoursePayablesLoading) {
      // console.log(coursePayables)
      flattenData["courseID"] = coursePayables.courseId;
      flattenData["courseName"] = coursePayables.courseName;
      flattenData["payables"] = coursePayables?.payables;
      flattenData["trainingYearID"] = coursePayables?.trainingYears?.trainingYearId;
      flattenData["trainingYearSpan"] = coursePayables?.trainingYears?.trainingYearSpan;
      flattenData["tuition"] = coursePayables?.tuition;
    }
    // console.log(flattenData);
    setCoursePayablesData(flattenData)
    setRowData(flattenData.payables)
  }, [coursePayables, isCoursePayablesLoading, isCoursePayablesError]);

  function handleNewPayable() {
    navigate(`/finance/new-payable`, {
      state: {
        courseName: `${coursePayablesData?.courseName} (${coursePayablesData?.trainingYearSpan})`
      }
    });
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["PayableBreakdownView"]}>
        <div className={styles["PayableBreakdownView__header-actions"]}>
          <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
        </div>
        <h1 className={styles["PayableBreakdownView__title"]}>{coursePayablesData?.courseName}</h1>
        {
          isCoursePayablesLoading ?
          <Spinner /> :
          <>
          <div className={styles["new-button"]}>
            <NewButton label="NEW PAYABLE" onClick={() => handleNewPayable()} />
          </div>
            <div className={[styles["PayableBreakdownView__table"], "ag-theme-alpine"].join(" ")}>
              <AgGridReact
                {...gridOptions}
              />
            </div>
          </>
        }

        <div className={styles["PayableBreakdownView__tuition-view"]}>
          <h3>TUITION FEE: &#8369;{isCoursePayablesLoading ? '...' : coursePayablesData?.tuition ?? "ERROR"}</h3>
        </div>
      </div>
    </BubblePage>
    </>
  )
}

export default PayableBreakdownView