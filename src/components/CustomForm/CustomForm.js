import React from 'react';

import './CustomForm.css'

const CustomForm = ({children, ...otherProps}) =>{
    return(
        <form className="custom-form" {...otherProps}>
            {children}
        </form>
    )
}


export default CustomForm;