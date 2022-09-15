import React from 'react'

import styles from './BubblePageCourse.module.scss'

const BubblePageCourse = ({children}) => {
    return (
        <div className={[styles["container"], "container"].join(' ')}>
            <div className={styles["BubblePageCourse"]}>
                {children}
            </div>

        </div>
    )
}

export default BubblePageCourse