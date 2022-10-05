import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  BatchesCard,
  NewButton,
  Spinner,
  BatchModal
} from '../../ComponentIndex';
import styles from './Batches.module.scss';

import { useBatches } from '../../../assets/utilities/swr';

const Batches = () => {
  const navigate = useNavigate();
  const [ cardsData, setCardsData ] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState({});

  /* FETCH HERE */
  const { batches, isBatchesLoading, isBatchesError } = useBatches();

  useEffect(
    () => {
      if (isBatchesError) alert("Error fetching batches data! Please check internet connection.");
      
      let batchesFlatten = [];

      if (!isBatchesLoading) {
        for (let batch of batches) {
          let teacher =  `${batch?.employee?.lastName}, ${batch?.employee?.firstName}${batch?.employee.middleName ? ' ' + batch?.employee?.middleName : ""}`
          batchesFlatten.push({
            batchID: batch.batchId,
            laNumber: batch.laNumber,
            batchName: batch.batchName,
            course: batch.courses.courseName,
            endDate: batch.endDate,
            startDate: batch.startDate,
            maxStudents: batch.maxStudents,
            trainingYearSpan: batch?.trainingYears?.trainingYearSpan ?? "[NOT SET]",
            batchPopulation: batch.registrations.length,
            batchTeacher: teacher,
            batchStatus: batch.batchStatus
          })
        }
        setCardsData(batchesFlatten);
      }
    }
  , [batches, isBatchesLoading, isBatchesError])

  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Class Batches",
    },
  ]

  function handleNewBatch() {
    navigate('/batches/new');
  }

  return (
    <>
      <SideBar />
      {openModal ?
      <BatchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        batch={selectedBatch}
      /> : 
        null
      }
      <BubblePage>
        <div className={styles["Batches"]}>
          <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
          <h1 className={styles["Batches__title"]}>Class Batches</h1>
          {isBatchesLoading ? <Spinner /> : 
            <div className={styles["Batches__content"]}>
              <NewButton label="New Batch" onClick={handleNewBatch}/>
              {
                cardsData.length === 0 ? 
                <div className={styles["no-batches"]}><h3>No batches found. <Link to={'/batches/new'} style={{color: "#0c4982", textDecoration: "none"}}>Add one!</Link></h3></div>
                : null
              }
              <div className={styles["cards"]}>
                {cardsData.map((card, index) => {
                  return (
                    <BatchesCard
                      key={index}
                      {...card}
                      variant={card.batchStatus}
                      onClick={() => {
                      setSelectedBatch(card)
                      setOpenModal(true)
                    }}/>
                    )
                  })}
              </div>
            </div>
          }
        </div>
      </BubblePage>
    </>
  )
}

export default Batches;