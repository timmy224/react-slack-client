import React from 'react';

import styles from './CustomButton.module.css'

const CustomButton = ({children, btnType, ...otherProps }) => {
    return(
        <button className={`${styles.customButton} ${styles[btnType]}`} {...otherProps}>{children}</button>
    )
}


export default CustomButton