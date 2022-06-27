import React from "react";
import styles from "./SignInCard.module.scss";

import { InputField, Button } from "../../../ComponentIndex";
import goncarLogo from "../../../../assets/images/goncar-logo.png";

const SignInArea = () => {
  return (
    <>
      <div className={styles["SignInArea"]}>
        <img
          src={goncarLogo}
          alt="Goncar Security Training Academy logo"
          className={styles["goncar-logo"]}
          draggable={false}
        />

        <div className={styles["SignInArea__div"]}>
          <h1>Sign In</h1>
          <p className={styles["invalid-prompt"]}>Invalid credentials</p>

          <form className={styles["SignInArea__form"]}>
            <InputField label="Email" type="email" name="email" />
            <InputField label="Password" type="password" name="password" />
            <Button label="Sign In" type="button" variant="SignIn" /> {/* TODO: CHANGE BUTTON TYPE TO SUBMIT */}
          </form>

          <a href="/" className={styles["SignInArea__forgot-credentials"]}>Forgot credentials?</a> {/* TODO: LINK FORGOT CREDENTIALS */}
        </div>
      </div>
    </>
  );
};

export default SignInArea;
