import React, { useState, useEffect } from 'react'

import {
  SideBar,
  BubblePage,
  BreadcrumbsComponent,
  BatchesCard
} from '../../ComponentIndex';
import styles from './Batches.module.scss';

import { useBatches } from '../../../assets/utilities/swr';

const Batches = () => {
  const [ cardsData, setCardsData ] = useState([]);

  /* FETCH HERE */
  const { batches, isBatchesLoading, isBatchesError } = useBatches();

  useEffect(
    () => {
      setCardsData(batches);
    }
  , [batches, isBatchesLoading, isBatchesError, setCardsData, cardsData])
  const breadcrumbsRoutes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Class Batches",
    },
  ]

  return (
    <>
    <SideBar />
    <BubblePage>
      <BreadcrumbsComponent routes={breadcrumbsRoutes}/>
      <div className={styles["Batches"]}>
        <h1 className={styles["Batches__title"]}>Class Batches</h1>
        <div className={styles["Batches__cards"]}>
          {cardsData.map((card, index) => {
            return (
              <BatchesCard key={index} {...card}/>
            )
          })}
        </div>
      </div>
    </BubblePage>
    </>
  )
}

export default Batches;