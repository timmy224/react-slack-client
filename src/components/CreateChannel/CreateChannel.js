import React, { Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context"; 
import CustomButton from '../CustomButton/CustomButton';
import FormInput from '../FormInput/FormInput';
import CustomModal from '../CustomModal/CustomModal';
import CustomForm from '../CustomForm/CustomForm';
import './CreateChannel.css'

const mapStateToProps = (state)=>{
    return { 
        create_channel_name: state.channel.create_channel_name,
        show_taken_msg: state.channel.show_taken_msg,
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

class CreateChannel extends Component {
    handleSubmit = (event) => {
        const { create_channel_name, org, takenChannelName, username, isPrivate, privateChannelUsers } = this.props
        event.preventDefault();
        const name = create_channel_name;
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
        const { show_taken_msg, showCreateModal, isPrivate, createPrivate, privateChannelUsers } = this.props;
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
        const usernamesDisplay = privateChannelUsers.map(user => <span className="username-display">{user}</span>)
        const checkbox = 
            <div class="custom-control custom-switch">
                <input type="checkbox" className="custom-control-input custom-switch-label" id="customSwitch" />
                <label className="custom-control-label" htmlFor="customSwitch" onClick={() => createPrivate(!isPrivate)}><p>Make a private channel</p></label>
            </div>
        const privateSection =
                    <div id="private-section">
                        <h4>Make Private</h4>
                        <div id="private-label">
                            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                        </div>
                    </div>
        const form = !isPrivate ?
            <CustomForm onSubmit={this.handleSubmit} key="body">
                    <FormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name" required="required">Name</FormInput>
            </CustomForm>
            :
            <CustomForm onSubmit={this.handleSubmit} key="body">
                    <FormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name" required="required" min="1" >Name</FormInput>
                    {usernamesDisplay}
                    <FormInput type="text" name="users" placeholder="#enter users separated by a space" onChange={this.handleUserChange} label="Users">Users</FormInput>
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

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);
