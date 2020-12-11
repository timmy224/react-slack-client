import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../context";
import CustomButton from '../CustomButton/CustomButton';
import CustomForm from '../CustomForm/CustomForm';
import CustomModal from '../CustomModal/CustomModal';
import CreateOrgModal from "../CreateOrgModal/CreateOrgModal";
import InviteMembersModal from "../InviteMembersModal/InviteMembersModal"

const mapStateToProps = (state)=>{
    return { 
        showOrgSettingsModal: state.org.showOrgSettingsModal,
        currentOrg: state.org.org
    }
}
const mapActionsToProps = {
    handleOrgSettingsModalShow: actions.org.showOrgSettingsModal,
    showCreateOrgModal: actions.org.showCreateOrgModal,
    handleDeleteOrg: actions.org.deleteOrg,
    showSendInviteModal: actions.invitation.showInviteModal,
}

class OrgSettingsModal extends Component {
    handleHide = () => {
        const { handleOrgSettingsModalShow } = this.props
        handleOrgSettingsModalShow(false);
    }

    handleDeleteOrg = (orgName) => {
        const { handleDeleteOrg, handleOrgSettingsModalShow } = this.props;
        handleDeleteOrg(orgName);
        handleOrgSettingsModalShow(false);
    }

    render() {
        const { showOrgSettingsModal, showCreateOrgModal, currentOrg, showSendInviteModal } = this.props;
        const content =
                <CustomForm>
                    <CustomButton type="button" onClick={() => showCreateOrgModal(true)}>Create a new Org</CustomButton>
                    <CreateOrgModal />
                    <CustomButton type="button" onClick={() => this.handleDeleteOrg(currentOrg.name)}>Delete current org</CustomButton>
                    <CustomButton type="button" onClick={() =>  showSendInviteModal(true)}>Invite new org members</CustomButton>
                    <InviteMembersModal />
                </CustomForm>   
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

