import React from 'react';
import Modal from 'react-bootstrap/Modal';

import './CustomModal.css'

const CustomModal = ({children, errorMsg, footer, title, form, subtitle, ...otherProps}) => {
    console.log({children})
    return(
        <Modal className="custom-modal" {...otherProps} >
            <Modal.Header  className="modal-header" closeButton>
                <div className="title">{title}</div>
                {subtitle ? <div className="subtitle">{subtitle}</div> : null}
                {errorMsg ? <div className="errorMsg">{errorMsg}</div> : null}
            </Modal.Header>
            <Modal.Body className="modal-body">
                <div className="form">{form}</div>
                {children ? <div className="children-container">{children}</div> : null}
            </Modal.Body>
            <Modal.Footer className="footer">
                <div className="footer-div">{footer}</div>
            </Modal.Footer>  
        </Modal>
    )
}


export default CustomModal;