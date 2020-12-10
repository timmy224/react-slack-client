import React from 'react';
import './CustomFormInput.css'

const CustomFormInput = ({children, onClick, label, ...otherProps}) => {
    return(
        <div className="form-group">
            <label className="form-input-label">{children}</label>
            <input className="form-input" {...otherProps} ></input>
        </div>
    )
}

export default CustomFormInput;