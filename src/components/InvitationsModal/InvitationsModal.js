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
    respondToInvitation: actions.invitation.respondToInvitation,
}

class InvitationsModal extends Component {
    handleHide = () => {
        const { handleInvitationsShow } = this.props
        handleInvitationsShow(false);
    }

    handleResponse = (event, invitation, isAccepted) => {
        event.preventDefault();
        const { respondToInvitation } = this.props;
        respondToInvitation(invitation, isAccepted);
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
                                className="mt-2 btn btn-primary custom-button"
                                type='submit'
                                onClick={event => this.handleResponse(event, invitation, true)}
                                >Accept
                            </button>
                            <button
                                className="mt-2 btn btn-primary custom-button"
                                type='submit' 
                                onClick={event => this.handleResponse(event, invitation, false)}
                                >Decline
                            </button>
                        </div>
                        )
                });
        return (
            <div>
                <Modal show={showInvitationsModal && invitations.length > 0} onHide={this.handleHide} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Invitations Pending</Modal.Title>
                    </Modal.Header>
                    <form className="custom-form">
                        {invitationsDisplay}
                    </form>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InvitationsModal);

