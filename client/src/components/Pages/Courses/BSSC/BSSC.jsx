import React from 'react'

import { SideBar, BubblePage, BreadcrumbsComponent } from '../../../ComponentIndex';

const BSSC = () => {

    var breadcrumbsRoutes = [
        {
          label: "Dashboard",
          href: '/dashboard',
          onclick: () => console.log("Hi")
        },
        {
          label: "Administrative",
          href: "/Administrative",
        },
        {
            label: "Course",
            href: "/Course"
        },
        {
            label: "Basic Security Supervisory Course",
            href: "/BSSC",
        }
      ];


    return(
        <>
        <SideBar />
        <div className='BSSC_Course'>
            <BubblePage>
                <BreadcrumbsComponent routes={breadcrumbsRoutes} />
                <h1>BASIC SECURITY SUPERVISORY COURSE</h1><br></br>
                <h3>OFFERED COURSE</h3>
                <br></br>
                <br></br>
                <h5>The Basic Security Supervisory Course is designed for 
                    security professionals aspiring to become a security 
                    officer (SO). This course concentrates on training 
                    security professionals into being a leader with
                     modules designed to improve their skills in management, 
                     plan-making, decision-making, and organization.
                    </h5>

            </BubblePage>
        </div>
        </>
    )
}

export default BSSC;