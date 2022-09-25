import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "../../../../styles/ag-theme-user.css"; // Optional theme CSS

import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  NewButton,
  ActionButton,
  Spinner
} from "../../../ComponentIndex";

import styles from "./Courses.module.scss";
import { useCourses } from "../../../../assets/utilities/swr";

const Courses = () => {
  const navigate = useNavigate();

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
      label: "Courses",
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
          variant="view"
          onClick={() => onClickView(params.data.courseID)}
        />
      </div>
    );
  }

  function onClickView(courseID) {
    navigate(`/administrative/course/view/${courseID}`);
  }

  function handleNewCourse() {
    navigate('/administrative/courses/new');
  }

  // FETCH HERE
  const { courses, isCoursesLoading, isCoursesError } = useCourses();

  useEffect(() => {
    if (isCoursesError)
      alert("Error fetching courses! Check internet connection!");

    let coursesFlatten = []; 

    if (!isCoursesLoading) {
      console.log(courses)
      for (let course of courses) {
        coursesFlatten.push({
          courseID: course?.courseId,
          courseName: course?.courseName,
          units: course?.units,
          trainingYearSpan: course?.trainingYears?.trainingYearSpan
        })
      }
      setRowData(coursesFlatten);
    }
  }, [courses, isCoursesLoading, isCoursesError]);

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "courseName",
      headerName: "Course Name",
      lockPosition: "left",
      minWidth: 200,
      flex: 1,
      sortable: true,
    },
    {
      field: "trainingYearSpan",
      headerName: "Year",
      lockPosition: "left",
      width: 100,
      sortable: true,
    },
    {
      field: "units",
      headerName: "Units",
      lockPosition: "left",
      width: 100,
      sortable: true,
    },
    {
      field: "tuition",
      headerName: "Tuition",
      lockPosition: "left",
      minWidth: 180,
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

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["courses"]}>
          <div className={styles["courses__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />
          </div>
          <h1 className={styles["courses__title"]}>Courses</h1>
          {isCoursesLoading ? (
            <Spinner />
          ) : (
            <>
              <div className={styles["new-button"]}>
                <NewButton label="NEW COURSE" onClick={handleNewCourse}/>
              </div>
              <div
                className={[styles["courses__table"], "ag-theme-alpine"].join(
                  " "
                )}
              >
                <AgGridReact {...gridOptions} />
              </div>
            </>
          )}
        </div>
      </BubblePage>
    </>
  );
};

export default Courses;
