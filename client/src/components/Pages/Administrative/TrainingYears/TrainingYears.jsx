import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "../../../../styles/ag-theme-user.css"; // Optional theme CSS

/* MUI */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import {
  SideBar,
  BubblePage,
  ActionButton,
  BreadcrumbsComponent,
  NewButton,
  Spinner
} from "../../../ComponentIndex";
import styles from "./TrainingYears.module.scss";
import { useTrainingYears } from "../../../../assets/utilities/swr";
import { deleteTrainingYear } from "../../../../assets/utilities/axiosUtility";
const TrainingYears = () => {
  const navigate = useNavigate();
  const [ selectedTrainingYear, setSelectedTrainingYear ] = useState({});

  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Administrative",
      href: "/administrative",
    },
    {
      label: "Training Years",
    },
  ];

  /* FOR TABLE */

  function RenderActionButtons(params) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "0.5rem",
        }}
      >
        <ActionButton
          variant="edit"
          label="Edit"
          onClick={() => onClickEdit(params.data.trainingYearId)}
        />
        <ActionButton
          variant="delete"
          label="Delete"
          onClick={() => onClickDelete(params.data)}
        />
      </div>
    );
  }

  function handleNew() {
    navigate("/administrative/training-years/new");
  }

  function onClickEdit(trainingYearID) {
    navigate("/administrative/training-years/edit", {
      state: {
        trainingYearID: trainingYearID
      }
    })
  }

  function onClickDelete(data) {
    setSelectedTrainingYear(data);
    handleOpen();
  }

  function handleDelete(trainingYearID) {
    // deleteTrainingYear(trainingYearID)
    // .then(
    //   (status) => {
    //     if (status === 200) {
    //       navigate(`/administrative/training-years`);
    //       setSelectedTrainingYear(null);
    //     }
    //     else alert(`BAD REQUEST: ${status}`);
    //   }
    // )
  }

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "trainingYearSpan",
      headerName: "Year Span",
      lockPosition: "left",
      minWidth: 250,
      flex: 1,
      sortable: true,
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
  ]);

  /* TABLE SETTINGS */
  const gridOptions = {
    defaultColDef: {
      filter: true,
    },
    columnDefs: columnDefs,
    rowData: rowData,
    pagination: true,
    paginationAutoPageSize: true,
  };

  // FETCH HERE
  const { trainingYears, isTrainingYearsLoading, isTrainingYearsError } =
    useTrainingYears();

  useEffect(() => {
    console.log("HI")
    if (isTrainingYearsError)
      alert("Error fetching training years! Check internet connection.");

    if (!isTrainingYearsLoading) {
      setRowData(trainingYears);
    }
  }, [trainingYears, isTrainingYearsLoading, isTrainingYearsError, selectedTrainingYear]);

  /* MUI MODAL*/
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "45%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <SideBar />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={styles["modal"]}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p className={styles["modal__title"]}>DELETE TRAINEE</p>
            <p className={styles["modal__description"]}>Are you sure you want to delete <em>TRAINING YEAR {selectedTrainingYear?.trainingYearSpan}</em>?</p>

            <div className={styles["modal-buttons"]}>
              <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
              <ActionButton variant="delete" label="DELETE" onClick={() => {
                  handleDelete(selectedTrainingYear.trainingYearId);
                  handleClose();
              }}/>
            </div>
          </Box>
        </Fade>
      </Modal>
      <BubblePage>
        <div className={styles["training-years"]}>
          <div className={styles["training-years__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />
          </div>
          <h1 className={styles["training-years__title"]}>Training Years</h1>

          {
            isTrainingYearsLoading ? <Spinner /> :
            <>
              <div className={styles["new-button"]}>
                <NewButton label="NEW TRAINING YEAR" onClick={handleNew} />
              </div>
              <div
                className={[
                  styles["training-years__table"],
                  "ag-theme-alpine",
                ].join(" ")}
              >
                <AgGridReact {...gridOptions} />
              </div>
            </>
          }
        </div>
      </BubblePage>
    </>
  );
};

export default TrainingYears;
