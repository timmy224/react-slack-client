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
        showCreateModal: state.channel.showCreateModal,
        username: state.user.username,
        org: state.org.org,
    }
}
const mapActionsToProps = {
    handleShowCreateModal: actions.channel.showCreateModal,
}

class CreateChannelModal extends Component {
    constructor(){
        super();
        this.state={
            channelName: '',
            takenChannelName: false,
            isPrivate: false, 
            setPrivateUsers: [],
        }
    }

    handleChannelName = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    handleUserChange = event => {
        const { value, name } = event.target;
        let users = value.trim().split(/[\s,]+/)
        this.setState({[name]: users})
    }

    handleIsPrivate = (isPrivate) => {
        this.setState({isPrivate: isPrivate})
    }

    handleSubmit = (event) => {
        const { channelName, isPrivate, setPrivateUsers } = this.state;
        const { org, username } = this.props;
        event.preventDefault();
        const name = channelName;
        const members =  isPrivate ? [...setPrivateUsers,username] : [];
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
    })}

    resetModal = () => {
        this.setState({
            channelName: '',
            takenChannelName: false,
            isPrivate: false,
            setPrivateUsers: [],
        })
    }
    handleHide = () => {
        const { handleShowCreateModal } = this.props
        handleShowCreateModal(false);
        this.resetModal();
    }

    render() {
        const { takenChannelName, isPrivate, setPrivateUsers, channelName } = this.state;
        const { showCreateModal } = this.props;
        const { customControlLabel, usernameDisplay } = styles
        const takenMessage = takenChannelName ? <h3>Channel Name taken</h3> : null;
        const usernamesDisplay = setPrivateUsers ? 
                                    setPrivateUsers.map(user => (
                                        <span className={ usernameDisplay }>{user}</span>))
                                    : null;
        const checkbox = 
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
        const privateSection =
                    <div>
                        <h4>Make Private</h4>
                        <div>
                            <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                        </div>
                    </div>
        const form = !isPrivate ?
            <CustomForm onSubmit={this.handleSubmit}>
                    <CustomFormInput 
                        type="text" 
                        name="channelName" 
                        placeholder="#new channel name" 
                        value={ channelName }
                        onChange={this.handleChannelName} 
                        label="Name">
                            Name
                    </CustomFormInput>
            </CustomForm>
            :
            <CustomForm onSubmit={this.handleSubmit}>
                    <CustomFormInput 
                        type="text" 
                        name="channelName" 
                        placeholder="#new channel name" 
                        value={ channelName }
                        onChange={this.handleChannelName} 
                        label="Name">
                            Name
                    </CustomFormInput>
                    {usernamesDisplay}
                    <CustomFormInput 
                        type="text" 
                        name="setPrivateUsers" 
                        placeholder="#enter users separated by a space"
                        value={ setPrivateUsers } 
                        onChange={ this.handleUserChange } 
                        label="Users">
                            Users
                    </CustomFormInput>
            </CustomForm>
        return (
                <CustomModal 
                    show={ showCreateModal } 
                    onHide={this.handleHide} 
                    errorMsg={ takenMessage }
                    title="Create a channel"
                    subtitle="Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example."
                    form={form}
                    footer= {<CustomButton type='submit' onClick={this.handleSubmit}>Create</CustomButton>}
                    >
                        { privateSection }
                        { checkbox }
                </CustomModal>    
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannelModal);
