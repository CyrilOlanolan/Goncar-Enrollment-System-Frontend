import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
/* MUI */
import TextField from '@mui/material/TextField';

import {
  BubblePage,
  SideBar,
  InputField,
  FormButton,
  Spinner
} from '../../../ComponentIndex';
import styles from './PayableEdit.module.scss';

import { usePayable } from '../../../../assets/utilities/swr';
import { putPayable } from '../../../../assets/utilities/axiosUtility';
const PayableEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPayableID = location?.state?.payableID;

  const [course, setCourse] = useState("");
  const [payableName, setPayableName] = useState("");
  const [payableCost, setPayableCost] = useState("");
  const [payableID, setPayableID] = useState('...');

  // FETCH PAYABLE DATA HERE
  const { payable, isPayableLoading, isPayableError } = usePayable(currentPayableID)

  useEffect(() => {
    setPayableID(currentPayableID);

    if (isPayableError) alert("ERROR fetching specific payable data! Check internet connection.");

    if (!isPayableLoading) {
      setCourse(`${payable?.course?.courseName} (${payable?.course?.trainingYears?.trainingYearSpan})`)
      setPayableName(payable.payableName);
      setPayableCost(payable.payableCost);
    }

  }, [currentPayableID, payable, isPayableLoading, isPayableError]);

  function handleSubmit(event) {
    event.preventDefault();

    let data = {
      payableName: payableName,
      payableCost: payableCost
    }

    // console.log(data);

    putPayable(currentPayableID, data)
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
      <div className={styles["PayableEdit"]}>
        <h1>Edit Payable</h1>
        {
          isPayableLoading ? <Spinner /> :
          <form className={styles["PayableEdit__form"]} onSubmit={(event) => handleSubmit(event)}>
            <div className={styles["header"]}>
            {/* CHANGE TRANSACTION NO HERE */}
              <InputField
                label="Payable ID"
                value={payableID}
                disabled={true}
                variant={"traineeID"}
                style={{marginLeft: "auto"}} />
            </div>

            <div className={styles["row-2"]}>
              <div className={styles["course"]}>
                <TextField
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  label="Course"
                  name="courseName"
                  fullWidth
                  disabled
                  required />
              </div>
            </div>

            <div className={styles["row-3"]}>
              <TextField
                value={payableName}
                onChange={e => setPayableName(e.target.value)}
                label="Payable Name"
                name="payableName"
                fullWidth
                required />

              <TextField
                value={payableCost}
                onChange={e => setPayableCost(e.target.value)}
                label="Payable Cost"
                placeholder={"10000"}
                name="payableCost"
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
        }
      </div>
    </BubblePage>
    </>
  )
}

export default PayableEdit