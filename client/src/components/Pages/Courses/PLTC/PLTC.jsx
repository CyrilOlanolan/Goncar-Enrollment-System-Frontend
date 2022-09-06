import React from 'react'

import { SideBar, BubblePage, BreadcrumbsComponent } from '../../../ComponentIndex';



const PLTC = () => {

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
            label: "Pre-Licensing Training Course (PLTC)",
            href: "/PLTC",
        }
      ];


    return (
        <>
       <SideBar />
       <div className='PLTC_Course'>
            <BubblePage>
                <BreadcrumbsComponent routes={breadcrumbsRoutes} />

                <h1>PRE-LICENSING TRAINING COURSE</h1><br></br>
                <h3>OFFERED COURSE</h3>
                <br></br>
                <br></br>
                <h5>The Pre-Licensing Training Course is designed for individuals 
                    who had no previous formal security training or License to 
                    Exercise Security Profession (LESP) and aspire to be a
                     security guard. This course introduces the trainee to 
                     the security services industry, its basic laws and 
                     regulations, as well as, what it takes to be a security 
                     professional.</h5>

            
            </BubblePage>
       </div>
        </>
    )
}

export default PLTC;