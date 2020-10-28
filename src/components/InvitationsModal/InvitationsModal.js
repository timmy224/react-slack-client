import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInvitationsModal: state.invitation.showInvitationsModal,
        invitations: state.invitation.pendingInvitations,
    }
}
const mapActionsToProps = {
    handleInvitationsShow: actions.invitation.showInvitationsModal,
    updateInvitations: actions.invitation.updateInvitations,
}

class InvitationsModal extends Component {

    handleHide = () => {
        const { handleInvitationsShow } = this.props
        handleInvitationsShow(false);
    }

    handleResponse = (orgName, isAccepted) => {
        const { invitations, updateInvitations} = this.props;
        const inviteIndex = invitations.findIndex(invitation=> invitation.org_name === orgName);
        const updatedInvitations = [...invitations.slice(0,inviteIndex),...invitations.slice(inviteIndex+1)];
        updateInvitations(updatedInvitations);
        const responseInfo = {
            orgName,
            isAccepted,
        }
        services.invitationService.respondToInvite(responseInfo)
        .then(response => {
            if(response.successful){
                this.handleHide();
            }
    })
    }

    render() {
        const { showInvitationsModal, invitations} = this.props;
        let isInvitationsEmpty = services.utilityService.isEmpty(invitations);
        let invitationsDisplay = isInvitationsEmpty ?
            <h2>Loading invitations...</h2>
            : invitations.map(invitation=>{
                    const {org_name, inviter} = invitation
                    return(
                        <div
                            key={org_name + inviter}
                            style={{display: 'flex', justifyContent: 'space-evenly',padding: '10px'}}>
                            <div class='content'>
                                <p>Organization Name : {org_name}</p>
                                <p>User : {inviter}</p>
                            </div>
                            <button
                                type='submit'
                                onClick={()=>this.handleResponse(org_name, true)}
                                >Accept
                            </button>
                            <button
                                type='submit' 
                                onClick={()=>this.handleResponse(org_name, false)}
                                >Decline
                            </button>
                        </div>
                        )
                });
        return (
            <div>
                <Modal show={showInvitationsModal} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Invitations Pending</Modal.Title>
                </Modal.Header>
                <form>
                {invitationsDisplay}
                </form>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InvitationsModal);

