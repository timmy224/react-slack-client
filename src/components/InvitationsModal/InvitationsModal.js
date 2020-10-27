import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInvitationsModal: state.invitation.showInvitationsModal,
        invitations: state.invitation.pendingInvitations,
    }
}
const mapActionsToProps = {
    handleInvitationsShow: actions.invitation.showInvitationsModal,
}

class InvitationsModal extends Component {

    handleHide = () => {
        const { handleInvitationsShow } = this.props
        handleInvitationsShow(false);
    }

    handleResponse = (isAccepted) => {
        event.preventDefault();
        const invitateInfo = {
            orgName: "Source Coders",// this is hardcoded for now but will have to come from redux soon (currently selected org)
            isAccepted,
        }
        services.invitationService.responseToInvite(responseInfo)
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
                    return(
                        <div
                            key={invitation.org_name}
                            style={{display: 'flex', justifyContent: 'space-evenly',padding: '10px'}}>
                            <div class='content'>
                                <p>Organization Name : {invitation.org_name}</p>
                                <p>User : {invitation.inviter}</p>
                            </div>
                            <button
                                type="button" 
                                onClick={this.handleResponse(true)}
                                >Accept
                            </button>
                            <button
                                type="button" 
                                onClick={this.handleResponse(false)}
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

