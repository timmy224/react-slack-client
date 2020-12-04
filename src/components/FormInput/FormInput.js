import React from 'react';
import './FormInput.css'

const FormInput = ({children, onChange, label, ...otherProps}) => {
    console.log({onChange})
    console.log({label})
    console.log({...otherProps})
    return(
        <div className="form-group">
            <label className="Form-input-label">{children}</label>
            <input className="form-input" onChange={onChange} {...otherProps}></input>
        </div>
    )
}

export default FormInput;