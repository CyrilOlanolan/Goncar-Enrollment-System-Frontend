import React from 'react'

import styles from "./FormButton.module.scss";

const FormButton = ({ label, onClick, variant="submit", type }) => {
  return (
    <button 
      type={type}
      className={[styles["FormButton"], styles[variant]].join(' ')} onClick={onClick}>
      {label}
    </button>
  )
}

export default FormButton