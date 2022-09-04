import React from 'react'

import { SideBar, BubblePage, BreadcrumbsComponent, } from '../../../ComponentIndex';

const RTC = () => {

    var breadcrumbsRoutes = [
        {
          label: "Dashboard",
          href: '/dashboard',
          onclick: () => console.log("Hi")
        },
        {
          label: "Course",
          href: "/Course",
        },
        {
            label: "Administrative",
            href: "/Administrative"
        },
        {
            label: "Refresher Training Course (RTC)",
            href: "/RTC",
        }
      ];


    return (
        <>
        <SideBar />
        <div className="RTC_Course"> 
            <BubblePage>
                <BreadcrumbsComponent routes={breadcrumbsRoutes} />
                    <h1>REFRESHER TRAINING COURSE</h1><br></br>
                    <h3>OFFERED COURSE</h3>
                    <br></br>
                    <br></br>
                    <h5>The Refresher Training Course is the second part of the overall re-training 
                        course that provides basic awareness of security related issues that can potentially 
                        affect responsibilities within the purview of their employment. It will improve 
                        observation, detection and reporting capabilities while enhancing coordination 
                        capability with other emergency response professionals.
                        </h5>
            </BubblePage>
        </div>
        </>
    )
}

export default RTC;