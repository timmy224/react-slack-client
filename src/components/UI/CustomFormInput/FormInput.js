import React from 'react';
import styles from './FormInput.module.css'

import { useField } from 'formik';


const CustomFormInput = ({label, fieldType, ...props}) => {
    const { formInputLabel, formInput, error } = styles
    const [field, meta] = useField(props);
    return(
        <>
            <label className={formInputLabel} htmlFor={props.id || props.name}>{label}</label>
            <input className={`${formInput} ${styles[fieldType]}`} {...field} {...props} />
            {meta.touched && meta.error ? <div className={error}>{meta.error}</div> : null}
        </>
    )
}

export default CustomFormInput;