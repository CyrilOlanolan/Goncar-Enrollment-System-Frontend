import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./PaymentCreation.module.scss";

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {
  BubblePage,
  SideBar,
  InputField,
  FormButton
} from '../../../ComponentIndex';

import { useCashiers, useTransactionLog } from '../../../../assets/utilities/swr'; 
import { postTransaction } from '../../../../assets/utilities/axiosUtility';

const PaymentCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const traineeID = location.state.traineeID;

  /* STATES */
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [cashier, setCashier] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [regID, setRegID] = useState(-1);

  const [cashierMapID, setCashierMapID] = useState({});
  const [availableCashiers, setAvailableCashiers] = useState([]);

  const PAYMENT_METHOD_OPTIONS  = [
    "Cash",
    "Bank",
    "GCash",
    "Card"
  ]

  // FETCH CASHIERS HERE
  const { cashiers, isCashiersLoading, isCashiersError } = useCashiers();

  useEffect(() => {
    if (isCashiersError) alert("ERROR fetching cashiers. Check internet connection.")

    let cashierMapId = {}
    let available = [];
    if (!isCashiersLoading) {
      for (let cashier of cashiers) {
        let name = `${cashier.lastName}, ${cashier.firstName}${getMiddleInitial(cashier?.middleName)}`
        cashierMapId[name] = cashier.employeeId;

        available.push(name);
      }

      setCashierMapID(cashierMapId);
      setAvailableCashiers(available);
    }
  }, [cashiers, isCashiersLoading, isCashiersError]);

  // FETCH HERE
  const { transactionLog, isTransactionLogLoading, isTransactionLogError } = useTransactionLog(traineeID);

  useEffect(() => {
    if (isTransactionLogError) alert("Error fetching transaction log data! Check internet connection.");

    if (!isTransactionLogLoading) {
      setAccountBalance(transactionLog?.trybalance);
      setRegID(transactionLog?.tempReg)
    }
  }, [transactionLog, isTransactionLogLoading, isTransactionLogError]);

  function getMiddleInitial(name) {
    if (name) {
      return " " + name[0] + ".";
    }
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      paymentAmount: parseFloat(paymentAmount),
      paymentMethod: paymentMethod,
      employeeId: cashierMapID[cashier]
    }

    console.log(data)

    postTransaction(traineeID, data)
    .then(
      (status) => {
        if (status === 200) {
          navigate(-1);
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["PaymentCreation"]}>
        <h1>Add Payment</h1>
        <form className={styles["PaymentCreation__form"]} onSubmit={(event) => handleSubmit(event)}>
          <div className={styles["header"]}>
          {/* CHANGE TRANSACTION NO HERE */}
            <InputField
              label="Transaction No."
              value={-1}
              disabled={true}
              variant={"traineeID"}
              style={{marginLeft: "auto"}} />
            
            <InputField
              label="Trainee ID"
              disabled={true}
              value={traineeID}
              variant={"traineeID"}
            />

            <InputField
              label="Registration No."
              disabled={true}
              value={regID ?? -1}
              variant={"traineeID"}
            />
          </div>

          <div className={styles["row-4"]}>
          <table className={styles["account__table"]}>
            <tbody className={styles["account__table-body"]}>
              <tr>
                <th>Balance</th>
                <td>{accountBalance ?? "ERROR"}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className={styles["row-5"]}>
            <div className={styles["paymentMethod"]}>
              <FormControl fullWidth required>
                <InputLabel id="paymentMethod-select-label">Payment Method</InputLabel>
                <Select
                  labelId="paymentMethod-select-label"
                  id="paymentMethod-select"
                  name="paymentMethod"
                  value={paymentMethod ?? ''}
                  label="Payment Method"
                  onChange={e => setPaymentMethod(e.target.value)}
                >
                  {PAYMENT_METHOD_OPTIONS.map((option, index) => {
                    return <MenuItem key={index} value={option}>{option}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>
            
            <TextField
              value={paymentAmount}
              onChange={e => setPaymentAmount(e.target.value)}
              label="Payment Amount"
              placeholder={"10000"}
              name="paymentAmount"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*.[0-9]*'}}
              fullWidth 
              required />
          </div>

          <div className={styles["cashier"]}>
              <FormControl fullWidth required>
                <InputLabel id="cashier-select-label">Cashier</InputLabel>
                <Select
                  labelId="cashier-select-label"
                  id="cashier-select"
                  name="cashier"
                  value={cashier ?? ''}
                  label="cashier"
                  onChange={e => setCashier(e.target.value)}
                >
                  {availableCashiers.map((option, index) => {
                    return <MenuItem key={index} value={option}>{option}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </div>

          <div className={styles["form_buttons"]}>
              <FormButton label="Submit" type="submit" />
              {/* GO BACK TO PREVIOUS PAGE */}
              <FormButton label="Cancel" variant="cancel" type="button" onClick={() => window.history.go(-1)}/>
            </div>
        </form>
      </div>
    </BubblePage>
    </>
  )
}

export default PaymentCreation