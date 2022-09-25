import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  ActionButton,

} from '../../../ComponentIndex'
import styles from './EmployeeProfile.module.scss';

import { stringifyDate } from '../../../../assets/utilities/datetime';
import { useEmployee } from '../../../../assets/utilities/swr';

const EmployeeProfile = () => {
  const params = useParams();
  const navigate = useNavigate();

  var breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      onClick: () => console.log("Hi")
    },
    {
      label: "Employees",
      href: "/employees",
    },
    {
      label: "View employee",
    }
  ];

  /* STATE */
  const [ employeeData, setEmployeeData ] = useState({});

  const { employee, isEmployeeLoading, isEmployeeError } = useEmployee(params.employeeID);

  useEffect(
    () => {
      if (isEmployeeError) alert("Error fetching employees data. Check internet conenction!")

      if (!isEmployeeLoading) {
        setEmployeeData(employee)
      }
    }
  , [ employee, isEmployeeLoading, isEmployeeError ])

  function handleEdit(employeeID) {
    navigate('/employees/edit', {
      state: {
        employeeID: employeeID
      }
    })
  }
  
  function handleDelete(employeeID) {
    console.log("DELETE ",  employeeID)
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["EmployeeProfile"]}>
          <div className={styles["EmployeeProfile__header-controls"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />

            <div className={styles["action-buttons"]}>
              <ActionButton variant="edit" onClick={() => handleEdit(params.employeeID)}/>
              <ActionButton variant="delete" onClick={() => handleDelete(params.employeeID)} />
            </div>
          </div>

          {
            !isEmployeeLoading ? 
            <div className={styles["EmployeeProfile__content"]}>
              <h1 className={styles["name"]}>{`${employeeData.lastName}, ${employeeData.firstName} ${employeeData.middleName ? employeeData.middleName : ""}`.toUpperCase()}</h1>
              <h2 className={styles["position"]}>{employeeData?.role?.roleName}</h2>

              <div className={styles["information"]}>
                <div className={styles["personal-info"]}>
                  <h3>PERSONAL INFORMATION</h3>
                  {employeeData.emailAdd ? <p><span>Email Address:</span> {employeeData?.emailAdd}</p> : null}
                  {employeeData.cpNum ? <p><span>Phone Number:</span> {employeeData?.cpNum}</p> : null}
                  {employeeData.address ? <p><span>Address:</span> {employeeData?.address}</p> : null}
                  {employeeData.sex ? <p><span>Sex:</span> {employeeData?.sex}</p> : null}
                  {employeeData.birthDay ? <p><span>Date of Birth:</span> {stringifyDate(employeeData?.birthDay)}</p> : null}
                  <p><span>Marital Status:</span></p>
                </div>

                <div className={styles["employee-info"]}>
                  <h3>EMPLOYEE INFORMATION</h3>
                  {employeeData.employeeId ? <p><span>Employee ID:</span> {employeeData?.employeeId}</p> : null}
                  {employeeData.dateHired ? <p><span>Date Hired:</span> {stringifyDate(employeeData?.dateHired)}</p> : null}
                  {employeeData.employeeStatus ? <p><span>Employee Status:</span> {employeeData?.employeeStatus}</p> : null}
                </div>
              </div>
            </div> :
            null
          }
        </div>
      </BubblePage>
    </>
  )
}

export default EmployeeProfile