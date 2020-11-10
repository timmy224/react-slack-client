import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions, store } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInvitationsModal: state.invitation.showInvitationsModal,
        invitations: state.invitation.pendingInvitations,
    }
}
const mapActionsToProps = {
    handleInvitationsShow: actions.invitation.showInvitationsModal,
    removeInvitation: actions.invitation.removeInvitation,
}

class InvitationsModal extends Component {

    handleHide = () => {
        const { handleInvitationsShow } = this.props
        handleInvitationsShow(false);
    }

    handleResponse = (invitation, isAccepted) => {
        const { invitations, removeInvitation } = this.props;
        const orgName = invitation.org_name;
        const responseInfo = {
            orgName,
            isAccepted,
        }
        services.invitationService.respondToInvite(responseInfo)
        .then(response => {
            if(response.successful){
                removeInvitation(invitation)
                if(!invitations.length){
                    this.handleHide();
                }
            }
    })
    }

    render() {
        const { showInvitationsModal, invitations} = this.props;
        let invitationsDisplay = !invitations.length ?
            <h2>Loading invitations...</h2>
            : invitations.map(invitation=>{
                    const {org_name, inviter} = invitation
                    return(
                        <div
                            key={org_name + inviter}
                            style={{display: 'flex', justifyContent: 'space-evenly',padding: '10px'}}>
                            <div className='content'>
                                <p>Organization Name : {org_name}</p>
                                <p>User : {inviter}</p>
                            </div>
                            <button
                                type='submit'
                                onClick={()=>this.handleResponse(invitation, true)}
                                >Accept
                            </button>
                            <button
                                type='submit' 
                                onClick={()=>this.handleResponse(invitation, false)}
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

