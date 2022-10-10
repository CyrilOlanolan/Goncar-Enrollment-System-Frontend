import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../../styles/ag-theme-user.css'; // Optional theme CSS

import {
  InputField
} from '../../../../ComponentIndex'
import styles from './TransactionLog.module.scss';
import { useTransactionLog } from '../../../../../assets/utilities/swr';

const TransactionLog = ({ traineeID }) => {

  // STATES
  const [accountBalance, setAccountBalance] = useState("");
  const [accountDue, setAccountDue] = useState("");
  const [accountPayment, setAccountPayment] = useState("");

  /* INITIALIZE rowData VARIABLE */
  const [rowData, setRowData] = useState([]);

  /* SET COLUMN DEFINITIONS */
  const [columnDefs] = useState([
    {
      field: "transactionId",
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
      field: "paymentAmount",
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

  // FETCH HERE
  const { transactionLog, isTransactionLogLoading, isTransactionLogError } = useTransactionLog(traineeID);

  useEffect(() => {
    if (isTransactionLogError) alert("Error fetching transaction log data! Check internet connection.");

    if (!isTransactionLogLoading) {
      // console.log(transactionLog)
      setRowData(transactionLog.transact)
      setAccountBalance(transactionLog?.trybalance);
      setAccountDue(transactionLog?.trytuition);
      setAccountPayment(transactionLog?.trypayamount);
    }
  }, [transactionLog, isTransactionLogLoading, isTransactionLogError]);

  return (
    <div className={styles["TransactionLog"]}>
      <div className={styles["account"]}>
        <table className={styles["account__table"]}>
          <tbody className={styles["account__table-body"]}>
            <tr>
              <th>Current Due</th>
              <td>{accountDue ?? "ERROR"}</td>
            </tr>
            <tr>
              <th>10% Downpayment</th>
              <td>2500</td>
            </tr>
            <tr>
              <th>Total Payment</th>
              <td>{accountPayment ?? "ERROR"}</td>
            </tr>
            <tr>
              <th>Balance</th>
              <td>{accountBalance ?? "ERROR"}</td>
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