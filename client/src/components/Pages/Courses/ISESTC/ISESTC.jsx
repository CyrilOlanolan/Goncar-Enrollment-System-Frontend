import React from 'react'

import { SideBar, BubblePage, BreadcrumbsComponent } from '../../../ComponentIndex';



const ISESTC = () => {

    var breadcrumbsRoutes =[
        {
            label: "Dashboard",
            hraf: '/dashboard',
        },
        {
            label: "Administrative",
            href: '/Administrative',
        },
        {
            label: "Course",
            href: '/Course',
        },
        {
            label: "In-Service Enhancement Security Training Course",
            href: '/ISESTC',
        }
    ];


    return (
        <>
        <SideBar />
        <div className="ISESTC_Course">
            <BubblePage>
                <BreadcrumbsComponent routes={breadcrumbsRoutes} />
                <h1>IN-SERVICE ENHANCEMENT SECURITY TRAINING COURSE</h1><br></br>
                <h3>OFFERED COURSE</h3>
                <br></br>
                <br></br>
                <h5>The In-Service Enhancement Security Training Course is the 
                    first part of the overall re-training course designed for 
                    security guards and security officers whose License to 
                    Exercise Security Profession (LESP) is up for renewal. 
                    This course enhances and updates the security professional’s 
                    knowledge of his profession.
                    </h5>
                    
            </BubblePage>

        </div>
        </>
    )
}

export default ISESTC;