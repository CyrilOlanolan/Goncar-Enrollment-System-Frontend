import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Typography from '@mui/material/Typography';

const BreadcrumbsComponent = ({ routes }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
        {routes.map((route, index) => {
          return (
            route.href ?
            (<Typography key={index} color="#0C4982">
              <Link
              underline="hover"
              color="inherit"
              href={route.href}
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
  )
}

export default BreadcrumbsComponent;