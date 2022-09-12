import React from 'react'

import styles from "./FormButton.module.scss";

const FormButton = ({ label, onClick, variant="submit", type, disabled=false }) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      className={[styles["FormButton"], styles[variant]].join(' ')} onClick={onClick}>
      {label}
    </button>
  )
}

export default FormButton