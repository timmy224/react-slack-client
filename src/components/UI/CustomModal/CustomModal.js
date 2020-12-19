import React from 'react';
import Modal from 'react-bootstrap/Modal';

import  styles from './CustomModal.module.css'

const CustomModal = ({children,  title, ...otherProps}) => {
    const { customModal, modalHeader, modalBody, childrenContainer } = styles
    return(
        <Modal className={customModal} {...otherProps} >
            <Modal.Header  className={modalHeader} closeButton>
                <div className={styles.title}>{title}</div>
            </Modal.Header>
            <Modal.Body className={modalBody}>
                <div className={childrenContainer}>{children}</div>
            </Modal.Body>
        </Modal>
    )
}


export default CustomModal;