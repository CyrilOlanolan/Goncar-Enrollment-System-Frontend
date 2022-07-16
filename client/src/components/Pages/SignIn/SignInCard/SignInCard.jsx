import React, {useState} from "react";
import styles from "./SignInCard.module.scss";
import { InputField, Button } from "../../../ComponentIndex";
import goncarLogo from "../../../../assets/images/goncar-logo.png";
import {auth} from "../../Firebase.js";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
}from "firebase/auth";

const SignInArea = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async (e) => {
    console.log("hello");
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      console.log(user); 
    } catch (error) {
      console.log(error.message);
    }
  };

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
            <InputField label="Email" type="email" name="email"  onChange={(event)=>{setLoginEmail(event.target.value)}}/>
            <InputField label="Password" type="password" name="password" onChange={(event)=>{setLoginPassword(event.target.value)}}/>
            <Button label="Sign In" type="button" variant="SignIn" onClick={login}/> {/* TODO: CHANGE BUTTON TYPE TO SUBMIT */}
          </form>

          <a href="/" className={styles["SignInArea__forgot-credentials"]}>Forgot credentials?</a> {/* TODO: LINK FORGOT CREDENTIALS */}
        </div>
      </div>
    </>
  );
};

export default SignInArea;
