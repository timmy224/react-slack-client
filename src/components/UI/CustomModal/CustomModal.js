import React from 'react';
import Modal from 'react-bootstrap/Modal';

import  styles from './CustomModal.module.css'

const CustomModal = ({children, errorMsg, footer, title, form, subtitle, ...otherProps}) => {
    const { customModal, modalHeader, modalBody, childrenContainer, footerDiv } = styles
    return(
        <Modal className={customModal} {...otherProps} >
            <Modal.Header  className={modalHeader} closeButton>
                <div className={styles.title}>{title}</div>
                {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
                {errorMsg ? <div className={styles.errorMsg}>{errorMsg}</div> : null}
            </Modal.Header>
            <Modal.Body className={modalBody}>
                <div className={styles.form}>{form}</div>
                {children ? <div className={childrenContainer}>{children}</div> : null}
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <div className={footerDiv}>{footer}</div>
            </Modal.Footer>  
        </Modal>
    )
}


export default CustomModal;