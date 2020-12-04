import React from 'react';

import './CustomButton.css'

const CustomButton = ({children, ...otherProps}) => {
    return(
        <button className="custom-button-component" {...otherProps}>{children}</button>
    )
}


export default CustomButton



// eslint-disable-next-line no-lone-blocks
{/* 
    <button
        id="create-button"
        type="button"
        className="mt-2 btn btn-primary custom-button"
        type='submit'
        onClick={this.handleSubmit}
    >Create
</button>
*/}