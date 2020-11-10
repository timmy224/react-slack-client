import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../context";
import Modal from 'react-bootstrap/Modal';

const mapStateToProps = (state)=>{
    return { 
        showInviteModal: state.invitation.showInviteModal,
        username: state.user.username,
        invitedUserEmail :state.invitation.invitedUserEmail,
    }
}
const mapActionsToProps = {
    handleInviteShow: actions.invitation.showInviteModal,
    setInvitedUserEmail: actions.invitation.setInvitedUserEmail,
}

class InviteModal extends Component {
    handleSubmit = (event) => {
        const { invitedUserEmail, } = this.props
        event.preventDefault();
        const inviteInfo = {
            orgName: "Source Coders",// this is hardcoded for now but will have to come from redux soon (currently selected org)
            email: invitedUserEmail,
            action: "STORE",
        }
        services.invitationService.sendInvite(inviteInfo)
        .then(response => {
            if(response.successful){
                this.handleHide();
            }else if(response.ERROR){
                alert('User already has an active invite to this org');
            }
    })
    }

    resetModal = () => {
        this.props.setInvitedUserEmail('')
    }

    handleInputChange = (event) => {
        let invitedUserEmail = event.target.value;
        return this.props.setInvitedUserEmail(invitedUserEmail)
    }

    handleHide = () => {
    	this.props.handleInviteShow(false);
        this.resetModal();
    }

    render() {
        const { showInviteModal } = this.props;
        return (
            <div>
                <Modal show={showInviteModal} onHide={this.handleHide} className="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Invite users to your org</Modal.Title>
                </Modal.Header>
                <form className="custom-form">
                    <label for='email'>Enter Email adress</label>
                    <input name="email" type="email" placeholder="joeschmoe@gmail.com" onChange={this.handleInputChange} className="form-control"/>
                        <button type='submit' onClick={this.handleSubmit} className="mt-2 btn btn-primary custom-button">Submit</button >
                </form>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InviteModal);






