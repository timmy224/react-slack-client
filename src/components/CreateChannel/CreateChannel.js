import React, { Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context";
import "./CreateChannel.css"
import CustomButton from '../CustomButton/CustomButton';
import FormInput from '../FormInput/FormInput';
import CustomModal from '../CustomModal/CustomModal';
import CustomForm from '../CustomForm/CustomForm';

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
        const userButton = privateChannelUsers.map(user => <button type="button" className="btn btn-light m-1"value={user} key={user}>{user}</button>)
        const privateSection =
                    <div id="private-section">
                        <h4>Make Private</h4>
                        <div id="private-label">
                            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                            <FormInput key="body" isSwitch type="switch" name="switch" onClick={() => createPrivate(!isPrivate)} label="makePrivate">Make private</FormInput>
                        </div>
                    </div>

        const formDisplay = !isPrivate ?
            <CustomForm onSubmit={this.handleSubmit} key="body">
                    <FormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name">Name</FormInput>
            </CustomForm>
            :
            <CustomForm onSubmit={this.handleSubmit} key="body">
                    <FormInput type="text" name="channelName" placeholder="#new channel name" onChange={this.handleChannelName} label="Name">Name</FormInput>
                    {userButton}
                    <FormInput type="text" name="users" placeholder="#enter users separated by a space" onChange={this.handleUserChange} label="Users">Users</FormInput>
            </CustomForm>
        return (
            <div id="create-channel-container">
                <CustomModal 
                    show={showCreateModal} 
                    onHide={this.handleHide} 
                    errorMsg={takenMessage}
                    header="Create a channel"
                    footer= {<CustomButton key="footer" type='submit' onClick={this.handleSubmit}>Create</CustomButton>}
                    >
                        <h1>Create a channel</h1>
                        <span className="create-channel-description">Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</span>
                        {formDisplay}
                        {privateSection}
                </CustomModal>
            </div>        
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);