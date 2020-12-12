import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions, services } from "../../../context";
import CustomButton from '../../UI/CustomButton/CustomButton';
import CustomFormInput from '../../UI/CustomFormInput/CustomFormInput';
import CustomModal from '../../UI/CustomModal/CustomModal';
import CustomForm from '../../UI/CustomForm/CustomForm';

import styles from './CreateChannelModal.module.css'

const mapStateToProps = (state)=>{
    return { 
        createChannelName: state.channel.createChannelName,
        showTakenMsg: state.channel.showTakenMsg,
        showCreateModal: state.channel.showCreateModal,
        username: state.user.username,
        isPrivate: state.channel.isPrivate,
        privateChannelUsers: state.channel.privateChannelUsers,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    setCreateChannelName: actions.channel.setCreateChannelName,
    takenChannelName: actions.channel.takenChannelName,
    handleShowCreateModal: actions.channel.showCreateModal,
    createPrivate: actions.channel.createPrivate,
    setPrivateUsers: actions.channel.privateChannelUsers
}

class CreateChannelModal extends Component {
    handleSubmit = (event) => {
        const { createChannelName, org, takenChannelName, username, isPrivate, privateChannelUsers } = this.props
        event.preventDefault();
        const name = createChannelName;
        const members =  isPrivate ? [...privateChannelUsers,username] : [];
        const channelInfo ={
            name,
            members,
            isPrivate,
            orgName: org.name, 
        }
        services.channelService.createChannel(channelInfo)
        .then(response => {
            if(response.successful){
                this.handleHide()
            }else if(response.users_not_found){
                alert(`users_not_found: ${response.users_not_found}`)
            }
            takenChannelName(true)
    })}

    resetModal = () => {
        const { setPrivateUsers, createPrivate, takenChannelName, setCreateChannelName } = this.props
        setPrivateUsers([]);
        createPrivate(false);
        takenChannelName(false);
        setCreateChannelName('');
    }
    handleUserChange = (event) => {
        let users = event.target.value;
        return this.props.setPrivateUsers(users.trim().split(/[\s,]+/))
    }

    handleChannelName = (event) => {
        let channel_name = event.target.value
        return this.props.setCreateChannelName(channel_name)
    }
    handleHide = () => {
        const { handleShowCreateModal } = this.props
        handleShowCreateModal(false);
        this.resetModal();
    }

    render() {
        const { showTakenMsg, showCreateModal, isPrivate, createPrivate, privateChannelUsers } = this.props;
        const { customControlLabel, usernameDisplay } = styles
        const takenMessage = showTakenMsg ? <h3>Channel Name taken</h3> : null;
        const usernamesDisplay = privateChannelUsers.map(user => <span className={usernameDisplay}>{user}</span>)
        const checkbox = 
            <div class="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input custom-switch-label" id="customSwitch" />
                <label className={customControlLabel} htmlFor="customSwitch" onClick={() => createPrivate(!isPrivate)}><p>Make a private channel</p></label>
            </div>
        const privateSection =
                    <div>
                        <h4>Make Private</h4>
                        <div>
                            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                        </div>
                    </div>
        const form = !isPrivate ?
            <CustomForm onSubmit={this.handleSubmit}>
                    <CustomFormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name" required="required">Name</CustomFormInput>
            </CustomForm>
            :
            <CustomForm onSubmit={this.handleSubmit}>
                    <CustomFormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name" required="required" min="1" >Name</CustomFormInput>
                    {usernamesDisplay}
                    <CustomFormInput type="text" name="users" placeholder="#enter users separated by a space" onChange={this.handleUserChange} label="Users">Users</CustomFormInput>
            </CustomForm>
        return (
                <CustomModal 
                    show={showCreateModal} 
                    onHide={this.handleHide} 
                    errorMsg={takenMessage}
                    title="Create a channel"
                    subtitle="Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example."
                    form={form}
                    footer= {<CustomButton type='submit' onClick={this.handleSubmit}>Create</CustomButton>}
                    >
                        {privateSection}
                        {checkbox}
                </CustomModal>    
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannelModal);
