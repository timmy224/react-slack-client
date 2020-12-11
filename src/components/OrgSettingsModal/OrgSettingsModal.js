import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../context";
import CustomButton from '../CustomButton/CustomButton';
import CustomForm from '../CustomForm/CustomForm';
import CustomModal from '../CustomModal/CustomModal';
import CreateOrgModal from "../CreateOrgModal/CreateOrgModal";
import InviteMembersModal from "../InviteMembersModal/InviteMembersModal";
import PendingInvitationsModal from "../PendingInvitationsModal/PendingInvitationsModal";

const mapStateToProps = (state)=>{
    return { 
        showOrgSettingsModal: state.org.showOrgSettingsModal,
        currentOrg: state.org.org,
        invitations: state.invitation.pendingInvitations,
    }
}
const mapActionsToProps = {
    handleOrgSettingsModalShow: actions.org.showOrgSettingsModal,
    showCreateOrgModal: actions.org.showCreateOrgModal,
    handleDeleteOrg: actions.org.deleteOrg,
    showInviteMembersModal: actions.invitation.showInviteMembersModal,
    showPendingInvitationsModal: actions.invitation.showPendingInvitationsModal,
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
        const { showOrgSettingsModal, showCreateOrgModal, currentOrg, showInviteMembersModal, invitations, showPendingInvitationsModal, } = this.props;
        const showPendingInvitations = invitations.length ? <CustomButton type="button" onClick={() => showPendingInvitationsModal(true)}>{invitations.length} invitation pending</CustomButton> : null;
        const form =
                <CustomForm>
                    <CustomButton type="button" onClick={() => showCreateOrgModal(true)}>Create a new Org</CustomButton>    
                    <CustomButton type="button" onClick={() => this.handleDeleteOrg(currentOrg.name)}>Delete current org</CustomButton>
                    <CustomButton type="button" onClick={() =>  showInviteMembersModal(true)}>Invite new org members</CustomButton>
                    {/* {showPendingInvitations} */}
                    <CustomButton type="button" onClick={() => showPendingInvitationsModal(true)}>{invitations.length} invitation pending</CustomButton> 
                    <CreateOrgModal />
                    <InviteMembersModal />
                    <PendingInvitationsModal />
                </CustomForm>   
        return (
            <CustomModal
                show={ showOrgSettingsModal } 
                onHide={this.handleHide} 
                title="Org Settings"
                form={form}
            />     
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(OrgSettingsModal);


