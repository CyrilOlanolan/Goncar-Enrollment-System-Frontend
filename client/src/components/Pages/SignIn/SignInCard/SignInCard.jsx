import React, { useState, useEffect } from "react";
import styles from "./SignInCard.module.scss";
import { InputField, Button } from "../../../ComponentIndex";
import goncarLogo from "../../../../assets/images/goncar-logo.png";
import {auth} from "../../Firebase.js";

import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile
}from "firebase/auth";

const SignInArea = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from  = location.state?.from?.pathname || "/";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(
    () => {
      onAuthStateChanged(auth, (currentUser) => {
        setAuth(currentUser);
      });
    }
  , [setAuth])

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      setAuth(user);
      // updateProfile(user.user, {
      //   displayName: "Dong Gyu Kang"
      // }).then(() => {
      //   console.log("UPDATED DISPLAY NAME: ", user)
      // })
      // .catch((error) => {
      //   console.log(error)
      // })
      navigate(from, { replace: true })
    } catch (error) {
      console.log(error.message);
    }
  };

  function handleEmailChange(event) {
    setLoginEmail(event.target.value);
  }

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

          <form className={styles["SignInArea__form"]} onSubmit={login}>
            <InputField label="Email" type="email" name="email" onChange={(event) => handleEmailChange(event)}/>
            <InputField label="Password" type="password" name="password" onChange={(event)=>{setLoginPassword(event.target.value)}}/>
            <Button label="Sign In" type="submit" variant="SignIn" /> {/* TODO: CHANGE BUTTON TYPE TO SUBMIT */}
          </form>

          {/* <a href="/" className={styles["SignInArea__forgot-credentials"]}>Forgot credentials?</a> TODO: LINK FORGOT CREDENTIALS */}
        </div>
      </div>
    </>
  );
};

export default SignInArea;
