import React from 'react';

import './CustomButton.css'

const CustomButton = ({children, ...otherProps }) => {
    return(
        <button className= "custom-button-component" {...otherProps}>{children}</button>
    )
}


export default CustomButton