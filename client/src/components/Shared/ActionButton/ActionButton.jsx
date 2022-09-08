import React from "react";

import styles from "./ActionButton.module.scss";

const ActionButton = ({ label, variant, onClick, id }) => {
  function RenderIcon(variant) {
    if (variant === "view") {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.5.375C4.75.375 1.548 2.708.25 6c1.298 3.293 4.5 5.625 8.25 5.625S15.453 9.293 16.75 6C15.453 2.708 12.25.375 8.5.375Zm0 9.375C6.43 9.75 4.75 8.07 4.75 6c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75 0 2.07-1.68 3.75-3.75 3.75Zm0-6A2.247 2.247 0 0 0 6.25 6 2.247 2.247 0 0 0 8.5 8.25 2.247 2.247 0 0 0 10.75 6 2.247 2.247 0 0 0 8.5 3.75Z"
            fill="#272727"
          />
        </svg>
      );
    } else if (variant === "edit") {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.44 2.182a.563.563 0 0 1 0 .795L15.266 4.15l-2.25-2.25L14.19.727a.563.563 0 0 1 .795 0L16.44 2.18v.001ZM14.47 4.945l-2.25-2.25-7.665 7.666a.562.562 0 0 0-.136.22l-.905 2.716a.281.281 0 0 0 .355.356l2.716-.906a.562.562 0 0 0 .22-.135l7.665-7.665v-.002Z"
            fill="#272727"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.125 15.188a1.687 1.687 0 0 0 1.688 1.687h12.374a1.687 1.687 0 0 0 1.688-1.688v-6.75a.563.563 0 0 0-1.125 0v6.75a.562.562 0 0 1-.563.563H1.813a.563.563 0 0 1-.563-.563V2.813a.563.563 0 0 1 .563-.563h7.312a.563.563 0 1 0 0-1.125H1.812A1.687 1.687 0 0 0 .125 2.813v12.374Z"
            fill="#272727"
          />
        </svg>
      );
    } else if (variant === "delete") {
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 12 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 12.25c0 .825.675 1.5 1.5 1.5h6c.825 0 1.5-.675 1.5-1.5v-9h-9v9Zm1.845-5.34 1.057-1.058L6 7.442l1.59-1.59L8.648 6.91 7.058 8.5l1.59 1.59-1.058 1.058L6 9.558l-1.59 1.59-1.058-1.058 1.59-1.59-1.597-1.59ZM8.625 1l-.75-.75h-3.75l-.75.75H.75v1.5h10.5V1H8.625Z"
            fill="#272727"
          />
        </svg>
      );
    }
    else if (variant === "close") {
      return (
        <p style={{width: 18, height: 18}}>X</p>
      );
    }
  }

  return (
    <button
      className={[styles["ActionButton"], styles[variant]].join(" ")}
      onClick={onClick}
    >
      {RenderIcon(variant)}
      {label}
    </button>
  );
};

export default ActionButton;
