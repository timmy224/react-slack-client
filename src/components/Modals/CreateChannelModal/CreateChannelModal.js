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
        showCreateChannelModal: state.channel.showCreateChannelModal,
        username: state.user.username,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    handleCreateChannelModal: actions.channel.showCreateChannelModal,
}

class CreateChannelModal extends Component {
    constructor(){
        super();
        this.state={
            channelName: '',
            takenChannelName: false,
            isPrivate: false, 
            setPrivateUsers: '',
            privateUsers:[],
        }
    }

    handleChannelName = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    handleUserChange = event => {
        const { value, name } = event.target;
        let users = value.trim().split(/[\s,]+/)
        this.setState({
            [name]: value,
            privateUsers: users,
        })
    }

    handleIsPrivate = isPrivate => {
        this.setState({isPrivate: isPrivate})
    }

    handleSubmit = event => {
        event.preventDefault();
        const { channelName, isPrivate, privateUsers } = this.state;
        const { org, username } = this.props;
        const name = channelName;
        const members =  isPrivate ? [...privateUsers,username] : [];
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
            this.setState({takenChannelName:true})
        })
    }

    resetModal = () => {
        this.setState({
            channelName: '',
            takenChannelName: false,
            isPrivate: false,
            setPrivateUsers: [],
        })
    }

    handleHide = () => {
        const { handleCreateChannelModal } = this.props
        handleCreateChannelModal(false);
        this.resetModal();
    }

    render() {
        const { takenChannelName, isPrivate, setPrivateUsers, channelName, privateUsers } = this.state;
        const { customControlLabel, usernameDisplay, usernameDisplayWrapper } = styles
        const { showCreateChannelModal } = this.props;
        const takenMessage = takenChannelName ? <h3>Channel Name taken</h3> : null;
        const usernamesDisplay = privateUsers.map(user => (
                                        <span className={usernameDisplay}>{user}</span>))
        const privateForm = isPrivate ? (
                <div>
                    <div className={usernameDisplayWrapper}>
                        {usernamesDisplay}
                    </div>
                    <CustomFormInput 
                        type="text" 
                        name="setPrivateUsers" 
                        placeholder="#enter users separated by a space"
                        value={setPrivateUsers} 
                        onChange={this.handleUserChange} 
                        label="Users"
                        >Users
                    </CustomFormInput>
                </div>
            )
            : null;
        const form = (
                <CustomForm onSubmit={this.handleSubmit}>
                        <CustomFormInput 
                            type="text" 
                            name="channelName" 
                            placeholder="#new channel name" 
                            value={channelName}
                            onChange={this.handleChannelName} 
                            label="Name"
                            >Name
                        </CustomFormInput>
                        {privateForm}
                </CustomForm>
            );
        return (
                <CustomModal 
                    show={ showCreateChannelModal } 
                    onHide={this.handleHide} 
                    errorMsg={ takenMessage }
                    title="Create a channel"
                    subtitle="Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example."
                    form={form}
                    footer= {<CustomButton type='submit' onClick={this.handleSubmit}>Create</CustomButton>}
                    >
                    <div>
                        <h4>Make Private</h4>
                        <div>
                            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                        </div>
                    </div>
                    <div className="custom-control custom-switch">
                        <input 
                            type="checkbox" 
                            className="custom-control-input custom-switch-label" 
                            id="customSwitch" />
                        <label 
                            className={`${ customControlLabel } custom-control-label`} 
                            htmlFor="customSwitch" 
                            onClick={() => this.handleIsPrivate(!isPrivate)}>
                                <p>Make a private channel</p>
                        </label>
                    </div>
                </CustomModal>    
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannelModal);
