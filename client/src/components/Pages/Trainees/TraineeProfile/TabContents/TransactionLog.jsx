import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../../styles/ag-theme-user.css'; // Optional theme CSS

import {
  InputField
} from '../../../../ComponentIndex'
import styles from './TransactionLog.module.scss';

const TransactionLog = () => {

  // STATES
  const [accountBalance, setAccountBalance] = useState("");

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "transactionID",
      headerName: "ID",
      lockPosition: "left",
      width: 75,
      sortable: true
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      lockPosition: "left",
      width: 200,
      sortable: true
    },
    {
      field: "amount",
      headerName: "Amount",
      lockPosition: "left",
      sortable: true,
      minWidth: 150,
      flex: 1
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

  return (
    <div className={styles["TransactionLog"]}>
      <div className={styles["account"]}>
        <table className={styles["account__table"]}>
          <tbody className={styles["account__table-body"]}>
            <tr>
              <th>Current Due</th>
              <td>10000</td>
            </tr>
            <tr>
              <th>10% Downpayment</th>
              <td>2500</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>500</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles["transactions"]}>
        <div className={[styles["transactions__table"], "ag-theme-alpine"].join(" ")}>
          <AgGridReact
            {...gridOptions}
          />
        </div>
      </div>
    </div>
  )
}

export default TransactionLog