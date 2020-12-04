import React from 'react';
import './FormInput.css'

const FormInput = ({children, onChange, label, isSwitch, ...otherProps}) => {
    return(
        <div className={`${isSwitch ? "custom-control custom-switch" : "form-group"}`}>
            <label className={`${isSwitch ? "custom-control-input" :"form-input-label"}`}>{children}</label>
            <input className={`${isSwitch ? "custom-control-label" :"form-input"}`} onChange={onChange} {...otherProps}></input>
        </div>
    )
}

export default FormInput;