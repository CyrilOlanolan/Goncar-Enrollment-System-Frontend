import React from 'react'


import { SignInCard } from '../../ComponentIndex'
import styles from "./SignIn.module.scss"
import signInBG from "../../../assets/images/signinpage-bg.png";
const SignIn = () => {
  return (
    <>
      <div className={styles["SignIn"]}>
        <img src={signInBG} alt="GSTA Sign In background" className={styles["SignIn__background"]}/>
        <div className={styles["SignIn__divide"] + " container"}>
          <SignInCard />
        </div>
      </div>
    </>
  )
}
export default SignIn