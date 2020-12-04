import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../context";
import Modal from 'react-bootstrap/Modal';
import CustomButton from '../CustomButton/CustomButton'
import FormInput from '../FormInput/FormInput'

const mapStateToProps = (state)=>{
    return { 
        showInviteModal: state.invitation.showInviteModal,
        username: state.user.username,
        invitedUserEmail: state.invitation.invitedUserEmail,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    handleInviteShow: actions.invitation.showInviteModal,
    setInvitedUserEmail: actions.invitation.setInvitedUserEmail,
}

class InviteModal extends Component {
    handleSubmit = (event) => {
        const { invitedUserEmail, org } = this.props
        event.preventDefault();
        const inviteInfo = {
            orgName: org.name,
            email: invitedUserEmail,
            action: "STORE",
        }
        services.invitationService.sendInvite(inviteInfo)
            .then(response => {
                if (response.successful) {
                    this.handleHide();
                } else if (response.ERROR) {
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
                    <FormInput type="email" placeholder="react.slack2020@gmail.com" onChange={this.handleInputChange} label="email">Enter Email adress</FormInput>
                    <CustomButton type='submit' onClick={this.handleSubmit}>Submit</CustomButton>
                </form>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InviteModal);






