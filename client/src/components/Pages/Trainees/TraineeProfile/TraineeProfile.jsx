import React, { useEffect, useState } from 'react'

import styles from "./TraineeProfile.module.scss"
import  {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  ActionButton,
  Tab,
  TraineeRegistrationTabContent,
  Spinner,
  NewButton
} from "../../../ComponentIndex";

/* SAMPLE DATA */
import { useNavigate, useParams } from 'react-router-dom';
import  { useTrainee } from '../../../../assets/utilities/swr';

const TraineeProfile = () => {
  const navigate = useNavigate();
  /* GET TRAINEE ID FROM URL */
  const { traineeID } = useParams();
  
  const [activeTab, setActiveTab] = useState(0);
  
  useEffect(
    () => {
      setActiveTab(activeTab)
    }
  , [activeTab])

  /* TODO: Remove details based on course */
  /* TODO: FETCH here */
  // const trainee = sampleTrainees[traineeID - 1];
  const { trainee, isTraineeLoading, isTraineeError } = useTrainee(traineeID);
  
  useEffect(
    () => {
      if (isTraineeError) alert("Error fetching trainee data! Please refresh or check your internet connection.");

      console.log(trainee);
    }
  , [trainee, isTraineeLoading, isTraineeError])
    
    
  var breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
      onClick: () => console.log("Hi")
    },
    {
      label: "Trainees",
      href: "/trainees",
    },
  ];

  if (!isTraineeLoading)  {
    breadcrumbsRoutes.push(
      {
        label: `${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`,
      }
    )
  }

  function handleNewRegistration(traineeId) {
    navigate('/trainee/new', {
      state: {
        traineeID: traineeId,
      }
    })
  }

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
          {
            isTraineeLoading ? <Spinner /> :
            <>
              <h1 className={styles["TraineeProfile__name"]}>{`${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`.toUpperCase()}</h1>
              
              <div className={styles["TraineeProfile__details"]}>
                <div className={styles["col-1"]}>
                  <p><span>Trainee ID:</span> {trainee.traineeId}</p>
                  <p><span>Date of Birth:</span> {trainee.birthDay}</p>
                  <p><span>Sex:</span> {trainee.sex}</p>
                  <p><span>Address:</span> {trainee.address}</p>
                  <p><span>E-mail:</span> {trainee.emailAdd}</p>
                  <p><span>Phone Number:</span> {trainee.cpNum}</p>
                </div>

                <div className={styles["col-2"]}>
                  {/* CHECK IF PROP IS FALSY, IF IT IS: DONT RENDER */}
                  {trainee.SSSNum ? <p><span>SSS No.:</span> {trainee.SSSNum}</p> : null}
                  {trainee.TINNum ? <p><span>TIN No.:</span> {trainee.TINNum}</p> : null}
                  {trainee.SGLicense ? <p><span>SG License No.</span> {trainee.SGLicense}</p> : null}
                  {trainee.expiryDate ? <p><span>SG License Expiry:</span> {trainee.expiryDate}</p> : null}
                </div>
              </div>

              <div className={styles["TraineeProfile__content"]}>
                <div className={styles["tabs"]}>
                  <Tab label={"TRAINEE REGISTRATION"}
                  onClick={() => setActiveTab(0)}
                  state={activeTab === 0 ? "active" : undefined} />
                  <Tab label={"TRANSACTION LOG"}
                  onClick={() => setActiveTab(1)}
                  state={activeTab === 1 ? "active" : undefined} />
                </div>

                <div className={styles["tab-content"]}>
                  <div className={styles["new-button"]}>
                    {activeTab === 0 ? <NewButton label="CREATE NEW REGISTRATION" onClick={() => handleNewRegistration(traineeID)} /> : <NewButton label="CREATE NEW PAYMENT" />}
                  </div>
                  {
                    activeTab === 0 ? <TraineeRegistrationTabContent traineeName={`${trainee.lastName}, ${trainee.firstName} ${trainee.middleName}`} /> : null
                  }
                </div>
              </div>
            </>
          }
        </div>
      </BubblePage>
    </>
  )
}

export default TraineeProfile