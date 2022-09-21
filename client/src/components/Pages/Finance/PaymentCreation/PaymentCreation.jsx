import React, { useRef } from 'react'

import styles from "./PaymentCreation.module.scss";
import {
  BubblePage,
  SideBar,
  InputField,
} from '../../../ComponentIndex';

const PaymentCreation = () => {
  const totalBalanceRef = useRef();

  return (
    <>
    <SideBar />
    <BubblePage>
      <h1>Add Payment</h1>
      <form>
        <div className={styles["header"]}>
        {/* CHANGE TRANSACTION NO HERE */}
          <InputField
            label="Transaction No."
            value={1}
            disabled={true}
            variant={"traineeID"}
            style={{marginLeft: "auto"}} />
          
          <InputField
            label="Trainee ID"
            disabled={true}
            value={231431}
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
        </div>
      </form>
    </BubblePage>
    </>
  )
}

export default PaymentCreation