import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCourse } from '../../../../../assets/utilities/swr';
import { useNavigate } from 'react-router-dom';
import { deleteCourse } from '../../../../../assets/utilities/axiosUtility';

/* MUI */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import {
  SideBar,
  BubblePageCourse,
  BreadcrumbsComponent,
  Spinner,
  ActionButton
} from '../../../../ComponentIndex';
import styles from './Course.module.scss';

const Course = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseID = params.courseID;

  const { course, isCourseLoading, isCourseError } = useCourse(courseID);

  /* STATES */
  const [ courseData, setCourseData ] = useState({});

  useEffect( 
    () => {
      if (isCourseError) alert("ERROR fetching course details. Check internet connection.")

      if (!isCourseLoading) {
        setCourseData(course)
      }
    }
  , [course, isCourseLoading, isCourseError])

  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Administrative",
      href: "/administrative",
    },
    {
      label: "Courses",
      href: "/administrative/courses",
    },
    {
      label: "View",
    },
  ];

  function handleEdit(courseID) {
    navigate('/administrative/course/edit', {
      state: {
        courseID: courseID
      }
    })
  }

  function handleDelete(courseID) {
    // deleteCourse(courseID)
    // .then(
    //   (status) => {
    //     if (status === 200) {
    //       navigate('/administrative/courses');
    //     }
    //     else alert(`BAD REQUEST: ${status}`);
    //   }
    // )
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
          <p className={styles["modal__title"]}>DELETE TRAINEE</p>
          <p className={styles["modal__description"]}>Are you sure you want to delete <em>COURSE #{courseID}: {courseData.courseName}</em>?</p>

          <div className={styles["modal-buttons"]}>
            <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
            <ActionButton variant="delete" label="DELETE" onClick={() => {
                handleDelete(courseID)
                handleClose()
            }}/>
          </div>
        </Box>
      </Fade>
    </Modal>
    <BubblePageCourse>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div className={styles["course"]}>
        <div className={styles["course__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />
            {
              isCourseLoading ? null : 
              <div className={styles["action-buttons"]}>
                <ActionButton variant="edit" onClick={() => handleEdit(courseID)}/>
                <ActionButton variant="delete" onClick={handleOpen} />
            </div>
            }
        </div>
        { isCourseLoading ? <Spinner /> :
        <>
        <div className={styles["course__header"]}>
          <h1 className={styles["course-name"]}>{courseData.courseName}</h1>
          <p className={styles["offered-course"]}>OFFERED COURSE</p>
        </div>
        <br></br>
        <br></br>
          <div className={styles["course__content"]}>
            <div className={styles["description-block"]}>
              <h5 className={styles["course-description-title"]}>COURSE DESCRIPTION</h5>
              <p className={styles["description"]}>
                {courseData.courseDescription}
              </p>
            </div>
            <br></br>


            <div className={styles["course-details-block2"]}>
              <h5 className={styles["course-description-title"]}>COURSE DETAILS</h5>
              <p><span className={styles["details-field"]}>Course ID:</span> {courseID}</p>
              <p><span className={styles["details-field"]}>Units:</span> {courseData.units}</p>
              <p><span className={styles["details-field"]}>Required Hours:</span> {courseData.requiredHours}</p>
            </div>
          </div>
        </>
        }
      </div>

    </BubblePageCourse>
    </>
  )
}

export default Course