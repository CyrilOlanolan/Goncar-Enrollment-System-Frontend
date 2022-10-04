import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../styles/ag-theme-user.css'; // Optional theme CSS

// MUI
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

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
import { deletePayable } from '../../../../assets/utilities/axiosUtility';

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
  const [selectedPayableID, setSelectedPayableID] = useState(null);
  const [selectedPayableName, setSelectedPayableName] = useState(null);

    /* FOR TABLE */
    function RenderActionButtons(params) {
      return (
        <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", columnGap: "0.5rem"}}>
          <ActionButton label="Edit" variant={"edit"} onClick={() => onClickEdit(params.data.payableId)} />
          <ActionButton label="Delete" variant={"delete"} onClick={() => onClickDelete(params.data)} />
        </div>
      )
    }
  
    function onClickEdit(payableId) {
      navigate('/finance/payable/edit', {
        state: {
          courseID: courseID,
          payableID: payableId
        }
      })
    }

    function onClickDelete(data) {
      setSelectedPayableID(data.payableId);
      setSelectedPayableName(data.payableName)
      handleOpen();
    }

    function handleDelete(payableId) {
      deletePayable(payableId)
      .then(
        (status) => {
          if (status === 200) {
            navigate(0);
          }
          else alert(`BAD REQUEST: ${status}`);
        }
      )
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

  // MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  return (
    <>
    <SideBar />

    {/* MODAL FOR DELETE */}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className={styles["modal__title"]}>DELETE TRAINEE</p>
        <p className={styles["modal__description"]}>Are you sure you want to delete <em>PAYABLE #{selectedPayableID}: {selectedPayableName}</em>?</p>

        <div className={styles["modal-buttons"]}>
          <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
          <ActionButton variant="delete" label="DELETE" onClick={() => {
              handleDelete(selectedPayableID)
              handleClose()
          }}/>
        </div>
      </Box>
    </Modal>

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