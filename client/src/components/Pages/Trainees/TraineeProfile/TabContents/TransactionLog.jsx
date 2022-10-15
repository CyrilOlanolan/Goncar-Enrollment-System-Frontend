import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import '../../../../../styles/ag-theme-user.css'; // Optional theme CSS

import styles from './TransactionLog.module.scss';
import { useTransactionLog } from '../../../../../assets/utilities/swr';
import { stringifyDate } from '../../../../../assets/utilities/datetime';

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
      field: "transactionDate",
      headerName: "Date",
      lockPosition: "left",
      cellRenderer: (params) => stringifyDate(params.data?.transactionDate),
      width: 120,
      sortable: true
    },
    {
      field: "paymentAmount",
      headerName: "Amount",
      cellRenderer: (params) => `₱ ${params.data.paymentAmount}`,
      lockPosition: "left",
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: "paymentMethod",
      headerName: "Mode",
      lockPosition: "left",
      width: 130,
      sortable: true
    },
    {
      field: "batchName",
      headerName: "Batch",
      lockPosition: "left",
      width: 130,
      sortable: true
    },
    {
      field: "employee",
      headerName: "Employee In-Charge",
      lockPosition: "left",
      width: 180,
      sortable: true
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

    let transactionFlatten = [];

    if (!isTransactionLogLoading) {
      for (let transact of transactionLog.transact) {
        let employee = `${transact?.employees?.lastName}, ${transact?.employees?.firstName}${getMiddleInitial(transact?.employees?.middleName)}`
        transactionFlatten.push({
          transactionId: transact?.transactionId,
          paymentAmount: transact?.paymentAmount,
          paymentMethod: transact?.paymentMethod,
          employee: employee,
          batchName: transact?.batchName,
          transactionDate: transact?.transactionDate
        })
      }
      setRowData(transactionFlatten)
      setAccountBalance(transactionLog?.trybalance);
      setAccountDue(transactionLog?.trytuition);
      setAccountPayment(transactionLog?.trypayamount);

      console.log(transactionLog)
    }
  }, [transactionLog, isTransactionLogLoading, isTransactionLogError]);

  function getMiddleInitial(name) {
    if (name) {
      return " " + name[0] + ".";
    }
    return "";
  }

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
              <th>Downpayment</th>
              <td>3500</td>
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