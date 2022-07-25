import React from "react";
import { SideBar, WelcomeBubble, DashboardCards } from "../../ComponentIndex";
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <>
      <SideBar />
      <div className="container">
        <div className={styles["Dashboard"]}>
          <WelcomeBubble name="Lorem Ipsum"/>
          <div className={styles["Dashboard__cards"]}>
            <h3 className={styles["title"]}>DASHBOARD</h3>
            <DashboardCards />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
