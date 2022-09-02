import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react'; //AG grid react component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed

import {SideBar, BubblePage, WelcomeBubble, DashboardCards, 
  BreadcrumbsComponent} from '../../ComponentIndex';
import styles from "./Administrative.module.scss"

const Administrative = () => {

  var breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: '/dashboard',
      onclick: () => console.log("Hi")
    },
    {
      label: "Administrative",
      href: "/Administrative",
    }
  ];

   //TABLE
   const [rowData, setRowData] = useState([]);
   const [columnDefs] = useState ([
     {
       field: "courseName",
       headerName: "Course Name",
       lockPosition: "left",
       width: 230,
       sortable: true
     },
     {
       field: "yearSpan",
       headerName: "Year Span",
       lockPosition: "left",
       width: "150",
       sortable: true
     },
     {
       field: "courseUnits",
       headerName: "Units",
       lockPosition: "left",
       width:"75",
       sortable: true,
     },
     {
       field:"courseTuition",
       headerName:"Tuition",
       lockPosition:"left",
       width:"150",
       sortable: true
     }
   ])
 
 
 
   const gridOptions = {
     defaultColDef: {
       filter: true
     },
     columnDefs: columnDefs,
     rowData: rowData,
     pagination: true,
     paginationAutoPageSize: true
   }

 

  return (
    <>
      <SideBar />
      <div classname="container">
        <BubblePage>
          <BreadcrumbsComponent routes={breadcrumbsRoutes} />
          <h3>Courses</h3>

          


        </BubblePage>


      </div>
    </>
  )
}

export default Administrative