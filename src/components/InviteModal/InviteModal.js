import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInviteModal: state.invitation.showInviteModal,
        invitations: state.invitation.invitations,
    }
}
const mapActionsToProps = {
    handleInviteShow: actions.invitation.showInviteModal,
}

class InviteModal extends Component {

    handleSubmit = () => {
        }

    resetModal = () => {
    }

    handleUserChange = () => {
    }

    handleHide = () => {
        const { handleInviteShow } = this.props
        handleInviteShow(false);
    }

    handleAccept = () => {
        //TODO
    }

    handleDecline = () => {
        //TODO
    }

    render() {
        const { showInviteModal, invitations} = this.props;
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
                <Modal show={showInviteModal} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Invitations Pending</Modal.Title>
                </Modal.Header>
                <form>
                {invitationsDisplay}
                </form>
                <Modal.Footer>
                    <button type="submit">Submit</button>
                </Modal.Footer>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InviteModal);

