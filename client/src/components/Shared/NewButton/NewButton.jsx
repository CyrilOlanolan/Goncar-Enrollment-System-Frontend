import React from 'react'

import styles from './NewButton.module.scss';

const NewButton = ({ label, onClick }) => {
  return (
    <button className={styles["NewButton"]} onClick={onClick}>
    + {label}
    </button>
  )
}

export default NewButton