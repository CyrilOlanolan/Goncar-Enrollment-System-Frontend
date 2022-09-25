import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

/* MUI */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  ActionButton,

} from '../../../ComponentIndex'
import styles from './EmployeeProfile.module.scss';

import { stringifyDate } from '../../../../assets/utilities/datetime';
import { useEmployee } from '../../../../assets/utilities/swr';
import { deleteEmployee } from '../../../../assets/utilities/axiosUtility';

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
    deleteEmployee(employeeID)
    .then(
      (status) => {
        if (status === 200) {
          navigate(`/employees`);
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

    /* MUI MODAL*/
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: "45%",
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

  return (
    <>
      <SideBar />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className={styles["modal"]}
      >
        <Fade in={open}>
          <Box sx={style}>
            <p className={styles["modal__title"]}>DELETE EMPLOYEE</p>
            <p className={styles["modal__description"]}>Are you sure you want to delete <em>EMPLOYEE #{params.employeeID}</em>?</p>
            <p className={styles["modal__iterate"]}>Deleting: <em>{`${employeeData.lastName}, ${employeeData.firstName} ${employeeData.middleName ? employeeData.middleName : ""}`.toUpperCase()}</em></p>

            <div className={styles["modal-buttons"]}>
              <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
              <ActionButton variant="delete" label="DELETE" onClick={() => {
                  handleDelete(params.employeeID)
                  handleClose()
              }}/>
            </div>
          </Box>
        </Fade>
      </Modal>
      <BubblePage>
        <div className={styles["EmployeeProfile"]}>
          <div className={styles["EmployeeProfile__header-controls"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />

            <div className={styles["action-buttons"]}>
              <ActionButton variant="edit" onClick={() => handleEdit(params.employeeID)}/>
              {/* <ActionButton variant="delete" onClick={() => handleOpen()} /> */}
            </div>
          </div>

          {
            !isEmployeeLoading ? 
            <div className={styles["EmployeeProfile__content"]}>
              <h1 className={styles["name"]}>{`${employeeData.lastName}, ${employeeData.firstName}${employeeData.middleName ? ' ' + employeeData.middleName : ""}`.toUpperCase()}</h1>
              <h2 className={styles["position"]}>{employeeData?.role?.roleName}</h2>

              <div className={styles["information"]}>
                <div className={styles["personal-info"]}>
                  <h3>PERSONAL INFORMATION</h3>
                  {employeeData.emailAdd ? <p><span>Email Address:</span> {employeeData?.emailAdd}</p> : null}
                  {employeeData.cpNum ? <p><span>Phone Number:</span> {employeeData?.cpNum}</p> : null}
                  {employeeData.address ? <p><span>Address:</span> {employeeData?.address}</p> : null}
                  {employeeData.sex ? <p><span>Sex:</span> {employeeData?.sex}</p> : null}
                  {employeeData.birthDay ? <p><span>Date of Birth:</span> {stringifyDate(employeeData?.birthDay)}</p> : null}
                  {employeeData.maritalStatus ? <p><span>Marital Status:</span> {employeeData?.maritalStatus}</p> : null}
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