import React from 'react';
import styles from './CustomFormInput.module.css'

import { useField } from 'formik';


// const CustomFormInput = ({children, onClick, label, ...otherProps}) => {
//     const { formGroup, formInputLabel, formInput } = styles
//     return(
//         <div className={formGroup}>
//             <label className={formInputLabel}>{children}</label>
//             <input className={formInput} {...otherProps} ></input>
//         </div>
//     )
// }

// export default CustomFormInput;

const CustomFormInput = (props) => {
    const { formGroup, formInputLabel, formInput } = styles
    return(
        <div className={formGroup}>
            <label className={`${formInputLabel} ${styles[props.fieldtype]}`}>{props.children}</label>
            <input className={formInput}></input>
        </div>
    )
}

export default CustomFormInput;