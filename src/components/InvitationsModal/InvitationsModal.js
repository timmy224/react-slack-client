import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInvitationsModal: state.invitation.showInvitationsModal,
        invitations: state.invitation.invitations,
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

    handleAccept = () => {
        //TODO
    }

    handleDecline = () => {
        //TODO
    }

    render() {
        const { showInvitationsModal, invitations} = this.props;
        let isInvitationsEmpty = services.utilityService.isEmpty(invitations);
        let invitationsDisplay = isInvitationsEmpty ?
            <h2>Loading invitations...</h2>
            : (Object.entries(invitations).map(([orgName, invitation]) => 
                <div 
                key={invitation.orgName}
                style={{display: 'flex', justifyContent: 'space-evenly',padding: '10px'}}>
                    <p>{invitation.orgName}</p>
                    <button
                        type="button" 
                        value={invitation.orgName}
                        onClick={this.handleAccept}
                        >Accept
                    </button>
                    <button
                        type="button" 
                        value={invitation.orgName}
                        onClick={this.handleDecline}
                        >Decline
                    </button>
                </div>
                ));
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

