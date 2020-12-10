import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../context";
import CustomButton from '../CustomButton/CustomButton';
import CustomFormInput from '../CustomFormInput/CustomFormInput';
import CustomModal from '../CustomModal/CustomModal';
import CustomForm from '../CustomForm/CustomForm'

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

class NewInvitationsModal extends Component {
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
        const form = 
                <CustomForm onClick={this.handleSubmit}>
                    <CustomFormInput type="email" placeholder="react.slack2020@gmail.com" onChange={this.handleInputChange} label="email">Enter Email adress</CustomFormInput>
                    <CustomButton type='submit' onClick={this.handleSubmit}>Submit</CustomButton>
                </CustomForm>
        return (
            <CustomModal 
                show={showInviteModal} 
                onHide={this.handleHide} 
                title="Invite users to your org"
                form={form}
                />      
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(NewInvitationsModal);






