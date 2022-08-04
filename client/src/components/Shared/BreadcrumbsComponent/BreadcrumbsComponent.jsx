import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import styles from "./BreadcrumbsComponent.module.scss";

const BreadcrumbsComponent = ({ routes }) => {
  return (
    <div className={styles["BreadcrumbsComponent"]}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
          {routes.map((route, index) => {
            return (
              route.href ?
              (<Typography key={index} color="#0C4982">
                <Link
                to={route.href}
                onClick={route.onClick}
                >
                  {route.label}
                </Link>
              </Typography>)
              :
              (<Typography key={index} color="#747474">
                {route.label}
              </Typography>)
            )
          })}
      </Breadcrumbs>
    </div>
  )
}

export default BreadcrumbsComponent;