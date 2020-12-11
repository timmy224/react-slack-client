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
    handleInviteMembersModal: actions.invitation.showInviteMembersModal,
    handlePendingInvitationsModal: actions.invitation.showPendingInvitationsModal,
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

    handleCreateOrg = (show) => {
        const { handleOrgSettingsModalShow, showCreateOrgModal } = this.props
        handleOrgSettingsModalShow(false);
        showCreateOrgModal(show);
    }

    handleInviteMembers = (show) => {
        const { handleInviteMembersModal, handleOrgSettingsModalShow } = this.props;
        handleInviteMembersModal(show);
        handleOrgSettingsModalShow(false);
    }

    handlePendingInvitations = (show) => {
        const { handlePendingInvitationsModal, handleOrgSettingsModalShow } = this.props;
        handlePendingInvitationsModal(show);
        handleOrgSettingsModalShow(false);
    }

    render() {
        const { showOrgSettingsModal, currentOrg, invitations } = this.props;
        const showPendingInvitations = invitations.length ? <CustomButton type="button" onClick={()=>this.handlePendingInvitations(true)}>{`${invitations.length} pending invitations`}</CustomButton> : null;
        const form =
                <CustomForm>
                    <CustomButton type="button" onClick={()=>this.handleCreateOrg(true)}>Create a new Org</CustomButton>
                    <CustomButton type="button" onClick={()=>this.handleDeleteOrg(currentOrg.name)}>Delete current Org</CustomButton>
                    <CustomButton type="button" onClick={()=>this.handleInviteMembers(true)}>Invite new members to your Org</CustomButton>
                    {/* <CustomButton type="button" onClick={()=>this.handlePendingInvitations(true)}>{`${invitations.length} pending invitations`}</CustomButton> */}
                    {showPendingInvitations}
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


