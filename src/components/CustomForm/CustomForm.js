import React from 'react';

const CustomForm = ({children, ...otherProps}) =>{
    return(
        <form className="custom-form" {...otherProps}>
            {children}
        </form>
    )
}


export default CustomForm;