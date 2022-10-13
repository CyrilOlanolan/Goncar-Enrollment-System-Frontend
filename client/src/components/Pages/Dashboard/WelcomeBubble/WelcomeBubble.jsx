import React from 'react'

import styles from './WelcomeBubble.module.scss'
import { DateTime } from "../../../ComponentIndex"
const WelcomeBubble = ({ name }) => {
  return (
    <div className={styles["WelcomeBubble"]}>
      <div className={styles["WelcomeBubble__name"]}>
        {
          name ?
          <>
            <h4>Welcome to Goncar,</h4>
            <h1>{name}!</h1>
          </>
          :
          <h1>Welcome to Goncar!</h1>
        }
      </div>
      <DateTime />
    </div>
  )
}

export default WelcomeBubble