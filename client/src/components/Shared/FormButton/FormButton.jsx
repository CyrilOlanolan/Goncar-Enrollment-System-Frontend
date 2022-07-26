import React from 'react'

import styles from "./FormButton.module.scss";

const FormButton = ({ label, onClick, variant="submit" }) => {
  return (
    <div className={[styles["FormButton"], styles[variant]].join(' ')} onClick={onClick}>
      {label}
    </div>
  )
}

export default FormButton