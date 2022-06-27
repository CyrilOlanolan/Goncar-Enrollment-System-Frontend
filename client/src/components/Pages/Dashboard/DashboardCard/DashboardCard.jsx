import React from 'react'
import styles from './DashboardCard.module.scss'

import { Icon } from '@iconify/react';
import filePersonFill from '@iconify/icons-bi/file-person-fill';
import roundGroups from '@iconify/icons-ic/round-groups';
import personBadgeFill from '@iconify/icons-bi/person-badge-fill';
import baselinePayments from '@iconify/icons-ic/baseline-payments';
import roundAdminPanelSettings from '@iconify/icons-ic/round-admin-panel-settings';

const DashboardCard = ({ icon, label }) => {
  function RenderIcon(icon) {
    if (icon === "filePersonFill")
      return <Icon icon={filePersonFill} color="white" height="52" />
    else if (icon === "roundGroups")
      return <Icon icon={roundGroups} color="white" height="52" />
    else if (icon === "personBadgeFill")
      return <Icon icon={personBadgeFill} color="white" height="52" />
    else if (icon === "baselinePayments")
      return <Icon icon={baselinePayments} color="white" height="52" />
    else if (icon === "roundAdminPanelSettings")
      return <Icon icon={roundAdminPanelSettings} color="white" height="52" />
    else
      console.log("ERROR finding icon for DashboardCard: " + icon)
  }

  return (
    <div className={styles["DashboardCard"]}>
      {RenderIcon(icon)}
      <p>{label}</p>
    </div>
  )
}

export default DashboardCard