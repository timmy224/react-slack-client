import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions } from "../../../context";
import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomForm from '../../UI/CustomForm/CustomForm';
import CustomModal from '../../UI/CustomModal/CustomModal';

import styles from './PendingInvitationsModal.module.css'

const mapStateToProps = (state)=>{
    return { 
        showPendingInvitationsModal: state.invitation.showPendingInvitationsModal,
        invitations: state.invitation.pendingInvitations,
    }
}
const mapActionsToProps = {
    handlePendingInvitationsModal: actions.invitation.showPendingInvitationsModal,
    respondToInvitation: actions.invitation.respondToInvitation,
}

class PendingInvitationsModal extends Component {
    handleHide = () => {
        const { handlePendingInvitationsModal } = this.props
        handlePendingInvitationsModal(false);
    }

    handleResponse = (event, invitation, isAccepted) => {
        event.preventDefault();
        const { respondToInvitation } = this.props;
        respondToInvitation(invitation, isAccepted);
    }

    render() {
        const { showPendingInvitationsModal, invitations} = this.props;
        const { invitationDisplay } = styles
        let invitationsDisplay = !invitations.length ?
            <h2>Loading invitations...</h2>
            : invitations.map(invitation=>{
                    const {org_name, inviter} = invitation
                    return(
                        <div
                            className={invitationDisplay}
                            key={org_name + inviter}>
                            <div>
                                <p>Organization Name : {org_name}</p>
                                <p>User : {inviter}</p>
                            </div>
                            <CustomButton type='submit' onClick={event => this.handleResponse(event, invitation, true)}>Accept</CustomButton>
                            <CustomButton type='submit' onClick={event => this.handleResponse(event, invitation, false)}>Decline</CustomButton>
                        </div>
                        )
                });
        const form =
                <CustomForm >
                    {invitationsDisplay}
                </CustomForm>
        return (
            <CustomModal
                show={showPendingInvitationsModal && invitations.length > 0} 
                onHide={this.handleHide} 
                title="Invitations Pending"
                form={form}
            />     
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PendingInvitationsModal);

