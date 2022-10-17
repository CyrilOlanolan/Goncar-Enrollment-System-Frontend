import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "../../../../styles/ag-theme-user.css"; // Optional theme CSS

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
      field: "trainingYearStatus",
      headerName: "Status",
      lockPosition: "left",
      minWidth: 100,
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
    if (isTrainingYearsError)
      alert("Error fetching training years! Check internet connection.");

    if (!isTrainingYearsLoading) {
      setRowData(trainingYears);
    }
  }, [trainingYears, isTrainingYearsLoading, isTrainingYearsError, selectedTrainingYear]);

  return (
    <>
      <SideBar />
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
