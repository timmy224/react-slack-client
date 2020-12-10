import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../context";
import CustomButton from '../CustomButton/CustomButton';
import CustomForm from '../CustomForm/CustomForm';
import CustomModal from '../CustomModal/CustomModal';
import CreateOrgModal from "../CreateOrgModal/CreateOrgModal";

const mapStateToProps = (state)=>{
    return { 
        showOrgSettingsModal: state.org.showOrgSettingsModal,
    }
}
const mapActionsToProps = {
    handleOrgSettingsModalShow: actions.org.showOrgSettingsModal,
    showCreateOrgModal: actions.org.showCreateOrgModal,
}

class OrgSettingsModal extends Component {
    handleHide = () => {
        const { handleOrgSettingsModalShow } = this.props
        handleOrgSettingsModalShow (false);
    }

    render() {
        const { showOrgSettingsModal, showCreateOrgModal } = this.props;
        const content =
                <div>
                    <CustomButton type="button" onClick={() => showCreateOrgModal(true)}>Create a new Org</CustomButton>
                        <CreateOrgModal />
                    <CustomButton type="button">Delete current org</CustomButton>
                    <CustomButton type="button">Add org members</CustomButton>
                </div>   
        return (
            <CustomModal
                show={ showOrgSettingsModal } 
                onHide={this.handleHide} 
                title="Org Settings"
                form={content}
            />     
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgSettingsModal);

/*
    handle delete an org
    handle add an org
    handle invite org members
*/

