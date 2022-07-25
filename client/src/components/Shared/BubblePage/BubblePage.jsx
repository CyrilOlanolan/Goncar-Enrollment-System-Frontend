import React from 'react'

import styles from './BubblePage.module.scss'

const BubblePage = ({children}) => {
  return (
    <div className={styles["BubblePage"]}>
        {children}
    </div>
  )
}

export default BubblePage