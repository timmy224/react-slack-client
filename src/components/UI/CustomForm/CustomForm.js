import React from 'react';

import styles from './CustomForm.module.css'

const CustomForm = ({children, ...otherProps}) =>{
    return(
        <form className={styles.customForm} {...otherProps}>
            {children}
        </form>
    )
}


export default CustomForm;