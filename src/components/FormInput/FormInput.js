import React from 'react';
import './FormInput.css'

const FormInput = ({children, onClick, label, ...otherProps}) => {
    return(
        <div className="form-group">
            <label className="form-input-label">{children}</label>
            <input className="form-input" {...otherProps} ></input>
        </div>
    )
}

export default FormInput;