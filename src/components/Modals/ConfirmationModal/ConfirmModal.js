import React from "react";

import styles from "../OrgSettingsModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import CustomModal from "../../UI/CustomModal/CustomModal";

const ConfirmModal = props => {
	const {description, handleResponse, showConfirmationModal, handleConfirmationModal} = props
    const form = (
        <form className={styles.customForm}>
            <div class={styles.btns}>
                <CustomButton
                    type="button"
                    onClick={() => handleResponse(true)}
                >Yes
                </CustomButton>
                <CustomButton
                    type="button"
                    onClick={() => handleResponse(false)}
                >No
                </CustomButton>
            </div>
        </form>
    );
    return (
        <CustomModal
            show={showConfirmationModal}
            onHide={() => handleConfirmationModal(false)}
            title= {description}
        >
            {form}
        </CustomModal>
    );
}

export default ConfirmModal;
