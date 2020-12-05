import React from 'react';
import './FormInput.css'

const FormInput = ({children, onClick, label, isSwitch, ...otherProps}) => {
    return(
        <div className="form-group">
            <label className="label">{children}</label>
            <input className="input" {...otherProps}></input>
        </div>
    )
}

export default FormInput;