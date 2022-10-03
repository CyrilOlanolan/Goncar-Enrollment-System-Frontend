import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "./PaymentCreation.module.scss";

/* MUI */
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
  BubblePage,
  SideBar,
  InputField,
  FormButton
} from '../../../ComponentIndex';

const PaymentCreation = () => {
  const location = useLocation();
  const traineeID = location.state.traineeID;

  /* STATES */
  const [ totalBalance, setTotalBalance ] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payableCost, setPayableCost] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");

  const PAYMENT_METHOD_OPTIONS  = [
    1,2,3
  ]
  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["PaymentCreation"]}>
        <h1>Add Payment</h1>
        <form className={styles["PaymentCreation__form"]}>
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
              value={123123}
              variant={"traineeID"}
            />
          </div>

          <div className={styles["row-4"]}>
            <TextField
              value={totalBalance ?? ""}
              onChange={e => setTotalBalance(e.target.value)}
              disabled
              label="Total Balance"
              required={true}
              name="totalBalance"
              id="totalBalance-input"
              fullWidth={true} />
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