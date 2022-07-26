import React from 'react'

import styles from './BubblePage.module.scss'

const BubblePage = ({children}) => {
  return (
    <div className={[styles["container"], "container"].join(' ')}>
      <div className={styles["BubblePage"]}>
          {children}
      </div>
    </div>
  )
}

export default BubblePage