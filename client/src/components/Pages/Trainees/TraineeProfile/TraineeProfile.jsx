import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import download from 'downloadjs';

/* MUI */
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import  {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  ActionButton,
  Tab,
  TraineeRegistrationTabContent,
  Spinner,
  NewButton,
  TransactionLog
} from "../../../ComponentIndex";
import styles from "./TraineeProfile.module.scss"

import  { useTrainee } from '../../../../assets/utilities/swr';
import { stringifyDate } from '../../../../assets/utilities/datetime';
import { deleteTrainee } from '../../../../assets/utilities/axiosUtility';
import { printTraineeData } from '../../../../assets/utilities/print'

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
        label: `${trainee.lastName}, ${trainee.firstName}${trainee.middleName ? ' ' + trainee.middleName : ""}`,
      }
    )
  }

  function handleNewRegistration(traineeId) {
    navigate('/trainee/registrations/new', {
      state: {
        traineeID: traineeId,
      }
    })
  }

  function handleEdit(traineeId) {
    navigate(`/trainee/edit`, {
      state: {
        traineeID: traineeId
      }
    })
  }
  
  function handleDelete(id) {
    deleteTrainee(id)
    .then(
      (status) => {
        if (status === 200) {
          navigate(`/trainees`);
        }
        else alert(`BAD REQUEST: ${status}`);
      }
    )
  }

  let deployedURI = 'https://goncar-system-backend.herokuapp.com';

  function handlePrint() {
    printTraineeData(trainee);
  }

  function handleNewPayment() {
    navigate('/finance/new-payment', {
      state: {
        traineeID: traineeID
      }
    })
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
            <p className={styles["modal__description"]}>Are you sure you want to delete <em>TRAINEE #{traineeID}</em>?</p>

            <div className={styles["modal-buttons"]}>
              <ActionButton variant="close" label="CLOSE" onClick={handleClose} />
              <ActionButton variant="delete" label="DELETE" onClick={() => {
                  handleDelete(traineeID)
                  handleClose()
              }}/>
            </div>
          </Box>
        </Fade>
      </Modal>
      <BubblePage>
        <div className={styles["TraineeProfile"]}>
          <div className={styles["TraineeProfile__header-controls"]}>
            <BreadcrumbsComponent routes={breadcrumbsRoutes} />

            <div className={styles["action-buttons"]}>
              <ActionButton variant="print" onClick={() => handlePrint()}/>
              <ActionButton variant="edit" onClick={() => handleEdit(traineeID)}/>
              <ActionButton variant="delete" onClick={handleOpen} />
            </div>
          </div>
          {
            isTraineeLoading ? <Spinner /> :
            <>
              <h1 className={styles["TraineeProfile__name"]}>{`${trainee.lastName}, ${trainee.firstName} ${trainee.middleName ? trainee.middleName : ""}`.toUpperCase()}</h1>
              
              <div className={styles["TraineeProfile__details"]}>
                <div className={styles["col-1"]}>
                  <p><span>Trainee ID:</span> {trainee?.traineeId}</p>
                  <p><span>Date of Birth:</span> {stringifyDate(trainee?.birthDay)}</p>
                  <p><span>Sex:</span> {trainee?.sex}</p>
                  <p><span>Address:</span> {trainee?.address}</p>
                  <p><span>E-mail:</span> {trainee?.emailAdd}</p>
                  <p><span>Phone Number:</span> {trainee?.cpNum}</p>
                  <p><span>Educational Attainment:</span> {trainee?.educationalAttainment}</p>
                  <p><span>Year Graduated:</span> {trainee?.yearGrad}</p>
                </div>

                <div className={styles["col-2"]}>
                  {/* CHECK IF PROP IS FALSY, IF IT IS: DONT RENDER */}
                  {trainee.SSSNum ? <p><span>SSS No.:</span> {trainee?.SSSNum}</p> : null}
                  {trainee.TINNum ? <p><span>TIN No.:</span> {trainee?.TINNum}</p> : null}
                  {trainee.SGLicense ? <p><span>SG License No.</span> {trainee?.SGLicense}</p> : null}
                  {trainee.expiryDate ? <p><span>SG License Expiry:</span> {stringifyDate(trainee?.expiryDate)}</p> : null}
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
                    {activeTab === 0 ? <NewButton label="CREATE NEW REGISTRATION" onClick={() => handleNewRegistration(traineeID)} /> : <NewButton label="CREATE NEW PAYMENT" onClick={() => handleNewPayment()} />}
                  </div>
                  {
                    activeTab === 0 ? <TraineeRegistrationTabContent traineeName={`${trainee.lastName}, ${trainee.firstName}${trainee.middleName ? ' ' + trainee.middleName : ""}`} /> : <TransactionLog traineeID={traineeID}/>
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