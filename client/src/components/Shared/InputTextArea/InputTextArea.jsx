import React from 'react'

import styles from './InputTextArea.module.scss'
const InputTextArea = ({ label, id, name, rows, cols }) => {
  return (
    <div className={styles["InputTextArea"]}>
      <label for={id} className={styles["InputTextArea__label"]}>{label}</label>
      <textarea
        className={styles["InputTextArea__textarea"]}
        id={id}
        name={name}
        rows={rows}
        cols={cols}>
      </textarea>
    </div>
  )
}

export default InputTextArea