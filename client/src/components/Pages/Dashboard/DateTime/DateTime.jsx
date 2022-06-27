import React, { useState, useEffect } from "react";

import styles from "./DateTime.module.scss";
import {
  getDateString,
  getTimeString,
} from "../../../../assets/utilities/datetime";

const DateTime = () => {
  const [date, setDate] = useState(getDateString());
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDateString());
      setTime(getTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, [date, time]);

  return (
    <div className={styles["DateTime"]}>
      <p className={styles["date"]}>{date}</p>
      <p className={styles["time"]}>
        <span>{time.hours}</span>:<span>{time.minutes}</span>:<span>{time.seconds}</span>{" "}
        {time.ampm}
      </p>
    </div>
  );
};

export default DateTime;
