import React from 'react';
import styles from './CustomFormInput.module.css'

const CustomFormInput = ({children, onClick, label, ...otherProps}) => {
    const { formGroup, formInputLabel, formInput } = styles
    return(
        <div className={formGroup}>
            <label className={formInputLabel}>{children}</label>
            <input className={formInput} {...otherProps} ></input>
        </div>
    )
}

export default CustomFormInput;