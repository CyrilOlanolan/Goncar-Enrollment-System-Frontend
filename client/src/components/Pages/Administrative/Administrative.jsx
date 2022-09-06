import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'; //AG grid react component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed

import {SideBar, BubblePage, WelcomeBubble, DashboardCards, 
  BreadcrumbsComponent, ActionButton} from '../../ComponentIndex';
import styles from "./Administrative.module.scss"

import { COURSES } from '../../../assets/utilities/constants';

const Administrative = () => {

  // var breadcrumbsRoutes = [
  //   {
  //     label: "Dashboard",
  //     href: '/dashboard',
  //     onclick: () => console.log("Hi")
  //   },
  //   {
  //     label: "Administrative",
  //     href: "/Administrative",
  //   }
  // ];

  // function RenderActionButtons(params) {
  //   return (
  //     <div style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
  //       <ActionButton label="View" variant={"view"} onClick={() => onClick(params.data.traineeId)} />
  //     </div>
  //   )
  // }

  //  //TABLE
  //  const [rowData, setRowData] = useState([]);
  //  const [columnDefs] = useState ([
  //    {
  //      field: "courseName",
  //      headerName: "Course Name",
  //      lockPosition: "left",
  //      width: 230,
  //      sortable: true
  //    },
  //    {
  //      field: "yearSpan",
  //      headerName: "Year Span",
  //      lockPosition: "left",
  //      width: "150",
  //      sortable: true
  //    },
  //    {
  //      field: "courseUnits",
  //      headerName: "Units",
  //      lockPosition: "left",
  //      width:"75",
  //      sortable: true,
  //    },
  //    {
  //      field:"courseTuition",
  //      headerName:"Tuition",
  //      lockPosition:"left",
  //      width:"150",
  //      sortable: true
  //    },
  //    {
  //     field: "",
  //     headerName: "Action",
  //     lockPosition: "left",
  //     callRender: (params) => RenderActionButtons(params),
  //     minWidth: 100,
  //     flex: 2,
  //    },
  //  ])
 
 
 
  //  const gridOptions = {
  //    defaultColDef: {
  //      filter: true
  //    },
  //    columnDefs: columnDefs,
  //    rowData: rowData,
  //    pagination: true,
  //    paginationAutoPageSize: true
  //  }

 

  // return (
  //   <>
  //     <SideBar />
  //     <div classname="container">
  //       <BubblePage>
  //         <div className={styles["Course"]}>
  //           <div className={styles["Trainees__header-actions"]}>
  //             <BreadcrumbsComponent routes={breadcrumbsRoutes} />
  //           </div>
  //             <h1 className={styles["Course_Title"]}>Course</h1>

  //            <div className={[styles["Course_Table"], "ag-theme-alpine"].join(" ")}>
  //               <AgGridReact
  //                 {...gridOptions}
  //               />

  //            </div>
  //         </div>
  //       </BubblePage>


  //     </div>
  //   </>
  // )
}

export default Administrative