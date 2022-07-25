import React from 'react'
import { Link } from 'react-router-dom';

import styles from './DashboardCards.module.scss'
import { DashboardCard } from "../../../ComponentIndex";

const DashboardCards = () => {

  const navigation = [
    {
        "label": "Dashboard",
        "shortLabel": "Dashboard",
        "icon": "roundDashboard",
        "route": "/dashboard"
    },
    {
        "label": "Trainees",
        "shortLabel": "Trainees",
        "icon": "filePersonFill",
        "route": "/trainees"
    },
    {
        "label": "Class Batches",
        "shortLabel": "Batches",
        "icon": "roundGroups",
        "route": "/batches"
    },
    {
        "label": "Employees",
        "shortLabel": "Employees",
        "icon": "personBadgeFill",
        "route": "/employees"
    },
    {
        "label": "Finance",
        "shortLabel": "Finance",
        "icon": "baselinePayments",
        "route": "/finance"
    },
    {
        "label": "Administrative",
        "shortLabel": "Admin",
        "icon": "roundAdminPanelSettings",
        "route": "/employees"
    },
    {
        "label": "Settings",
        "shortLabel": "Settings",
        "icon": "roundSettings",
        "route": "/settings"
    }
  ]

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