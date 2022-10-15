import React, { useState } from "react";
import styles from "./SignInCard.module.scss";
import { InputField, Button } from "../../../ComponentIndex";
import goncarLogo from "../../../../assets/images/goncar-logo.png";
import {auth} from "../../Firebase.js";

import useAuth from "../../../../hooks/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';

import {
  signInWithEmailAndPassword,
  // updateProfile,
  setPersistence,
  browserLocalPersistence
}from "firebase/auth";

const SignInArea = () => {
  const { setAuth, setLoading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from  = location.state?.from?.pathname || "/";

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signInError, setSignInError] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await setPersistence(auth, browserLocalPersistence).then(
        () => {
          signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
          ).then((user) => {
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
          }).catch((error) => {
            setSignInError(true);
            console.log(error)
          }).finally(() => {
            setLoading(false);
          })
        }
      )
      
    } catch (error) {
      console.log(error);
    }
  };

  function handleEmailChange(event) {
    setSignInError(false);
    setLoginEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setSignInError(false);
    setLoginPassword(event.target.value)
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
          { signInError ? <p className={styles["invalid-prompt"]}>Invalid credentials</p> : null}

          <form className={styles["SignInArea__form"]} onSubmit={login}>
            <InputField label="Email" type="email" name="email" onChange={(event) => handleEmailChange(event)}/>
            <InputField label="Password" type="password" name="password" onChange={(event)=>{handlePasswordChange(event)}}/>
            <Button label="Sign In" type="submit" variant="SignIn" /> {/* TODO: CHANGE BUTTON TYPE TO SUBMIT */}
          </form>

          {/* <a href="/" className={styles["SignInArea__forgot-credentials"]}>Forgot credentials?</a> TODO: LINK FORGOT CREDENTIALS */}
        </div>
      </div>
    </>
  );
};

export default SignInArea;
