import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCourse } from '../../../../../assets/utilities/swr';
import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  Spinner
} from '../../../../ComponentIndex';
import styles from './Course.module.scss';

const Course = () => {
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

  return (
    <>
    <SideBar />
    <BubblePage>
      <div className={styles["course"]}>
        <div className={styles["course__header-actions"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />
        </div>
        { isCourseLoading ? <Spinner /> :
        <>
        <div className={styles["course__header"]}>
          <h1 className={styles["course-name"]}>{courseData.courseName}</h1>
          <p className={styles["offered-course"]}>OFFERED COURSE</p>
        </div>
          <div className={styles["course__content"]}>
            <div className={styles["description-block"]}>
              <h5 className={styles["course-description-title"]}>COURSE DESCRIPTION</h5>
              <p className={styles["description"]}>
                {courseData.courseDescription}
              </p>
            </div>

            <div className={styles["course-details-block"]}>
              <h5 className={styles["course-description-title"]}>COURSE DETAILS</h5>
              <p><span className={styles["details-field"]}>Course ID:</span> {courseID}</p>
              <p><span className={styles["details-field"]}>Units:</span> {courseData.units}</p>
              <p><span className={styles["details-field"]}>Required Hours:</span> {courseData.requiredHours}</p>
            </div>
          </div>
        </>
        }
      </div>

    </BubblePage>
    </>
  )
}

export default Course