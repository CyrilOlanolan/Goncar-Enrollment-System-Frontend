import React from 'react'
import { Link } from 'react-router-dom';

import styles from './DashboardCards.module.scss'
import { DashboardCard } from "../../../ComponentIndex";

const DashboardCards = ({ navigation }) => {
  return (
    <div className={styles["DashboardCards"]}>
      {navigation.map((nav) => {
        if (nav.label === "Dashboard" || nav.label === "Settings")
          return null;
        
        return (
          <Link to={nav.route} draggable="false" key={nav.label}>
            <DashboardCard icon={nav.icon} label={nav.label} />
          </Link>
        )
      })}
    </div>
  )
}

export default DashboardCards