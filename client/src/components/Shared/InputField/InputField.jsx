import React from "react";
import styles from "./InputField.module.scss";

const InputField = ({ label, type, name, onChange, placeholder }) => {
  return (
    <>
      <div className={styles["InputField"]}>
        <label htmlFor={name} className={styles["InputField__label"]}>
          {label}
        </label>
        <input 
          type={type} 
          className={styles["InputField__input"]} 
          onChange={onChange} 
          placeholder={placeholder} />
      </div>
    </>
  );
};

export default InputField;
