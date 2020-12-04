import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './CustomModal.css'

const CustomModal = ({children, errorMsg, footer, title, form, subtitle, ...otherProps}) => {
    console.log({children})
    return(
        <Modal className="custom-modal" {...otherProps} >
            <Modal.Header  className="modal-header" closeButton>
                {title}
                {subtitle}
                {errorMsg}
            </Modal.Header>
            <Modal.Body>
                {form}
                {children}
            </Modal.Body>
            <Modal.Footer className="footer">
                {footer}
            </Modal.Footer>  
        </Modal>
    )
}


export default CustomModal;