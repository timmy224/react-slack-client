import React from 'react';
import styles from './FormInput.module.css'

import { useField } from 'formik';


const Checkbox = ({label, fieldType, ...props}) => {
    const [field] = useField(props);

    return(
        <div className="custom-control custom-switch">
            <input className="custom-control-input custom-switch-label"  {...field} {...props} type="checkbox" id="customSwitch" />
            <label className={`${styles.customControlLabel} custom-control-label`}  htmlFor="customSwitch">{label}</label>  
        </div>
    )
}

export default Checkbox;