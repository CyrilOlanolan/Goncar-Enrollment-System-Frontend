import React from "react";
import { Link } from "react-router-dom";

import { SideBar } from "../../ComponentIndex";
import styles from "./Administrative.module.scss";

export const GearIcon = () => {
  return (
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.107 1.575c-.619-2.1-3.595-2.1-4.214 0l-.15.51a2.196 2.196 0 0 1-3.158 1.308l-.465-.255c-1.925-1.047-4.029 1.058-2.98 2.98l.253.467a2.196 2.196 0 0 1-1.308 3.157l-.51.15c-2.1.62-2.1 3.596 0 4.216l.51.15a2.196 2.196 0 0 1 1.308 3.157l-.255.465c-1.047 1.925 1.058 4.029 2.98 2.98l.467-.253a2.196 2.196 0 0 1 3.157 1.308l.15.51c.62 2.1 3.596 2.1 4.216 0l.15-.51a2.196 2.196 0 0 1 3.157-1.308l.465.255c1.925 1.047 4.029-1.057 2.98-2.98l-.253-.467a2.197 2.197 0 0 1 1.308-3.157l.51-.15c2.1-.62 2.1-3.596 0-4.216l-.51-.15a2.196 2.196 0 0 1-1.308-3.157l.255-.465c1.047-1.925-1.057-4.029-2.98-2.98l-.467.253a2.196 2.196 0 0 1-3.157-1.308l-.15-.51ZM12 16.395a4.395 4.395 0 1 1 3.107-1.29A4.394 4.394 0 0 1 12 16.392v.003Z"
        fill="#272727"
      />
    </svg>
  );
};

const items = [
  {
    title: "Courses",
    description: "View all courses offered",
    route: "/administrative/courses",
  },
  {
    title: "Training Years",
    description: "View all training year spans",
    route: "/administrative/training-years",
  },
  {
    title: "Add Payables",
    description: "Add a payable per course and training year",
    route: "/administrative/payables/general",
  },
];

const Administrative = () => {
  return (
    <>
      <SideBar />
      <div className={styles["Administrative"]}>
        <h1 className={styles["Administrative__heading"]}>ADMINISTRATIVE</h1>
        <div className={styles["Administrative__items"]}>
          {items.map((item, index) => {
            return (
              <Link to={item.route} key={index}>
                <div className={styles["item"]}>
                  <div className={styles["title"]}>
                    <GearIcon />
                    <h3>{item.title}</h3>
                  </div>
                  <div className={styles["description"]}>
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Administrative;
