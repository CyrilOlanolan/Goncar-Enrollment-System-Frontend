import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

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

      if (!isBatchesLoading) {
        setCardsData(batches);
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
    navigate('/batches/new')
  }

  return (
    <>
      <SideBar />
      {openModal ?
      <BatchModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        batchID={selectedBatch}
      /> : 
        null
      }
      <BubblePage>
        <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
        <div className={styles["Batches"]}>
          <h1 className={styles["Batches__title"]}>Class Batches</h1>
          {isBatchesLoading ? <Spinner /> : 
            <div className={styles["Batches__content"]}>
              <NewButton label="New Batch" onClick={handleNewBatch}/>
              <div className={styles["cards"]}>
                {cardsData.map((card, index) => {
                  return (
                    <BatchesCard key={index} {...card} onClick={() => {
                      setSelectedBatch(card.batchId)
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