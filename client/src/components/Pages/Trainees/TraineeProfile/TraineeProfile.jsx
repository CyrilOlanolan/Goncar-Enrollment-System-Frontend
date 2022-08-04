import React from 'react'

import styles from "./TraineeProfile.module.scss"
import  {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  ActionButton
} from "../../../ComponentIndex";

/* SAMPLE DATA */
import sampleTrainees from "../../../sampleData/sampleTrainees.json";
import { useParams } from 'react-router-dom';

const TraineeProfile = () => {
  /* GET TRAINEE ID FROM URL */
  const { traineeID } = useParams();

  console.log("TraineeID: ", traineeID);

  /* TODO: Remove details based on course */
  /* TODO: FETCH here */
  const trainee = sampleTrainees[traineeID - 1];

  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      onClick: () => console.log("Hi")
    },
    {
      label: "Trainees",
      href: "/trainees",
    },
    {
      label: `${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`,
    }
  ]

  function handleEdit(id) {
    console.log(`You clicked edit for Trainee ID: ${id}!`);
  }

  function handleDelete(id) {
    console.log(`You clicked delete for Trainee ID: ${id}!`);
  }

  return (
    <>
      <SideBar />
      <BubblePage>
        <div className={styles["TraineeProfile"]}>
          <div className={styles["TraineeProfile__header-controls"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />

            <div className={styles["action-buttons"]}>
              <ActionButton variant="edit" onClick={() => handleEdit(traineeID)}/>
              <ActionButton variant="delete" onClick={() => handleDelete(traineeID)}/>
            </div>
          </div>

          <h1 className={styles["TraineeProfile__name"]}>{`${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`.toUpperCase()}</h1>
          
          <div className={styles["TraineeProfile__details"]}>
            <div className={styles["col-1"]}>
              <p><span>Trainee ID:</span> {trainee.traineeID}</p>
              <p><span>Date of Birth:</span> {trainee.birthDay}</p>
              <p><span>Sex:</span> {trainee.sex}</p>
              <p><span>Address:</span> {trainee.address}</p>
              <p><span>E-mail:</span> {trainee.emailAdd}</p>
              <p><span>Phone Number:</span> {trainee.cpNum}</p>
            </div>

            <div className={styles["col-2"]}>
              {/* CHECK IF PROP IS FALSY, IF IT IS: DONT RENDER */}
              {trainee.SSSNum ? <p><span>SSS No.:</span> {trainee.SSSNum}</p> : null}
              {trainee.SBRNum ? <p><span>SBR No.:</span> {trainee.SBRNum}</p> : null}
              {trainee.TINNum ? <p><span>TIN No.:</span> {trainee.TINNum}</p> : null}
              {trainee.SGLicense ? <p><span>SG License No.</span> {trainee.SGLicense}</p> : null}
              {trainee.expiryDate ? <p><span>SG License Expiry:</span> {trainee.expiryDate}</p> : null}
            </div>
          </div>
        </div>
      </BubblePage>
    </>
  )
}

export default TraineeProfile