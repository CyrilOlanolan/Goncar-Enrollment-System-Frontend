import React from "react";
import styles from "./InputField.module.scss";

const InputField = ({
  label,
  type,
  name,
  onChange,
  placeholder,
  value,
  disabled=false,
  variant,
  style
}) => {

  return (
    <>
      <div className={[styles["InputField"], styles[variant]].join(' ')} style={style}>
        <label htmlFor={name} className={styles["InputField__label"]}>
          {label}
        </label>
        <input 
          disabled={disabled}
          value={value}
          type={type} 
          className={styles["InputField__input"]} 
          onChange={onChange} 
          placeholder={placeholder} />
      </div>
    </>
  );
};

export default InputField;
