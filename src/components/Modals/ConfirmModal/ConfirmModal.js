import React from "react";
import { services } from "../../../context";

import styles from "../OrgSettingsModal/OrgSettingsModal.module.css";
import CustomButton from "../../UI/CustomButton/CustomButton";
import CustomModal from "../../UI/CustomModal/CustomModal";

const ConfirmModal = props => {
    const { type, handleResponse, showConfirmationModal, handleConfirmationModal, info } = props
    const titleFunction = services.modalOptionsService[type]
    const title = titleFunction(info)
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
            title= {title}
        >
            {form}
        </CustomModal>
    );
}

export default ConfirmModal;
