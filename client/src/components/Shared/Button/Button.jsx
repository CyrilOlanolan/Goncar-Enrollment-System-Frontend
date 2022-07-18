import React from "react";
import styles from "./Button.module.scss";

import { Icon } from "@iconify/react";
import logoutIcon from "@iconify/icons-mdi/logout";

const Button = ({ label, type = "button", variant, icon, iconSize, onClick }) => {
  function RenderIcon(icon, iconSize) {
    if (icon === "logoutIcon")
      return <Icon icon={logoutIcon} color="white" height={iconSize} />;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={styles[`Button--${variant}`] + " " + styles["Button"]}
    >
      {RenderIcon(icon, iconSize)}
      {label}
    </button>
  );
};

export default Button;
