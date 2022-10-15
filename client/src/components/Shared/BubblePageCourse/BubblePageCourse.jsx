import React from 'react'

import styles from './BubblePageCourse.module.scss'

const BubblePageCourse = ({children}) => {
    return (
        <div className={[styles["container"], "container"].join(' ')}>
            <div className={styles["BubblePageCourse"]}>
                <div className={styles["image"]}>
                </div>
                
                <div className={styles["bubble-container"]}>
                    {children}
                </div>
            </div>

        </div>
    )
}

export default BubblePageCourse