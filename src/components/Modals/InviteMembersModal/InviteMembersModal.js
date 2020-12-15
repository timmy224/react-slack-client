import React, { Component } from 'react';
import { connect } from "react-redux";
import { services, actions } from "../../../context";
import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/CustomFormInput';
import CustomModal from '../../UI/CustomModal/CustomModal';
import CustomForm from '../../UI/CustomForm/CustomForm'

const mapStateToProps = (state)=>{
    return { 
        showInviteMembersModal: state.invitation.showInviteMembersModal,
        username: state.user.username,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    handleInviteMembersModal: actions.invitation.showInviteMembersModal,
}

class InviteMembersModal extends Component {
    constructor(){
        super();
        this.state={
            invitedUserEmail: '',
        }
    }
    handleSubmit = (event) => {
        const { org } = this.props
        const { invitedUserEmail } = this.state
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
        this.setState({
            invitedUserEmail: '',
        })
    }

    handleInputChange = event => {
        const { value, name } = event.target
        this.setState({
            [name]: value,
        })
    }

    handleHide = () => {
        const { handleInviteMembersModal } = this.props;
        handleInviteMembersModal(false);
        this.resetModal();
    }

    render() {
        const { showInviteMembersModal } = this.props;
        const { invitedUserEmail } = this.state;
        const form = (
                <CustomForm onSubmit={this.handleSubmit}>
                    <CustomFormInput 
                        type="email" 
                        name="invitedUserEmail"
                        placeholder="react.slack2020@gmail.com" 
                        value={invitedUserEmail}
                        onChange={this.handleInputChange} 
                        label="email"
                        >Enter Email address
                    </CustomFormInput>
                    <CustomButton 
                        type='submit' 
                        onClick={this.handleSubmit}
                        >Submit
                    </CustomButton>
                </CustomForm>
        );
        return (
            <CustomModal 
                show={showInviteMembersModal} 
                onHide={this.handleHide} 
                title="Invite users to your org"
                >
                    {form}
            </CustomModal>      
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(InviteMembersModal);






