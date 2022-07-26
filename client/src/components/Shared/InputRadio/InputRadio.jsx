import React from 'react'

import styles from './InputRadio.module.scss';

const InputRadio = ({ label, name }) => {
  return (
    <div className={styles["InputRadio"]}>
      <input type="radio" id={label} name={name} value={label} />
      <label for={label}>{label}</label>
    </div>
    )
}

export default InputRadio