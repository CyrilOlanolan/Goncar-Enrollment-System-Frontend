import React from "react";
import Navigation from "../../../assets/data/Navigation.json"
import { SideBar, WelcomeBubble, DashboardCards } from "../../ComponentIndex";
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <>
      <SideBar navigation={Navigation.navigation}/>
      <div className="container">
        <div className={styles["Dashboard"]}>
          <WelcomeBubble name="Lorem Ipsum"/>
          <div className={styles["Dashboard__cards"]}>
            <h3 className={styles["title"]}>DASHBOARD</h3>
            <DashboardCards navigation={Navigation.navigation}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
