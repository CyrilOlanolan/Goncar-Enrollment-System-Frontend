import React from 'react'

import styles from './Tab.module.scss';

const Tab = ({
  label,
  state,
  onClick
}) => {
  return (
    <button
    className={[styles["Tab"], styles[`Tab--${state}`]].join(' ')}
    onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Tab