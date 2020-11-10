import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';
import "./CreateChannel.css"

const mapStateToProps = (state)=>{
    return { 
        create_channel_name: state.channel.create_channel_name,
        show_taken_msg: state.channel.show_taken_msg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
        showCreateModal: state.channel.showCreateModal,
        username: state.user.username,
        isPrivate: state.channel.isPrivate,
        privateChannelUsers: state.channel.privateChannelUsers
    }
}
const mapActionsToProps = {
    setCreateChannelName: actions.channel.setCreateChannelName,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
    handleCreateShow: actions.channel.showCreateModal,
    createPrivate: actions.channel.createPrivate,
    setPrivateUsers: actions.channel.privateChannelUsers
}

class CreateChannel extends Component {
    handleSubmit = (event) => {
        const { create_channel_name, takenChannelName, username, isPrivate, privateChannelUsers } = this.props
        event.preventDefault();
        const name = create_channel_name;
        const members =  isPrivate ? [...privateChannelUsers,username] : [];
        const channelInfo ={
            name,
            members,
            isPrivate,
            orgName: "Source Coders", // this is hardcoded for now but will have to come from redux soon (currently selected org)
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
        const { handleCreateShow } = this.props
        handleCreateShow(false);
        this.resetModal();
    }

    render() {
        const { show_taken_msg, handleCreateShow, showCreateModal, isPrivate, createPrivate, privateChannelUsers, setPrivateUsers} = this.props;
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
        const userButton = privateChannelUsers.map(user => <button type="button" class="btn btn-light m-1"value={user} key={user}>{user}</button>)
        const formDisplay = !isPrivate ?
                <form
                onSubmit={this.handleSubmit}
                className="custom-form"
                >
                      <div className="form-group channel-name-label">
                        <label>Name</label>
                        <input 
                        className = "form-control" 
                        type="text" 
                        placeholder="#new channel name" 
                        onChange={this.handleChannelName}/>
                      </div>
                </form>
            :
                <form
                onSubmit={this.handleSubmit}
                className="custom-form">
                      <div className="form-group channel-name-label">
                        <label>Private Channel Name</label>
                        <input 
                        className = "form-control" 
                        name="channelName"
                        type="text" 
                        placeholder="#new channel name"
                        onChange={this.handleChannelName}/>
                      </div>
                      {userButton}
                      <div className="form-group" controlId="channelName">
                        <label>Users</label>
                        <input 
                        className = "form-control"
                        name="users"
                        type="text" 
                        placeholder="#enter users separated by a space" 
                        onChange={this.handleUserChange}/>
                      </div>
                </form>
        return (
            <div>
                <Modal show={showCreateModal} onHide={this.handleHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Channel Creation</Modal.Title>
                    {takenMessage}
                </Modal.Header>
                <div className="create-channel-description">
                    <p>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</p>
                </div>
                {formDisplay}
                <div id="private-section">
                    <h4>Make Private</h4>
                    <div id="private-label">
                        <p>When a channel is set to private, it can only be viewed or joined by invitation.</p>
                        <div className="custom-control custom-switch">
                            <input type="checkbox" className="custom-control-input" id="customSwitch1"/>
                            <label className="custom-control-label " for="customSwitch1" onClick={()=>createPrivate(!isPrivate)}>
                                <p>Make private</p>
                            </label>
                        </div>
                    </div>
                </div>
                <Modal.Footer className= "footer">
                    <button
                    id="create-button"
                    type="button"
                    className="mt-2 btn btn-primary custom-button"
                    type='submit' 
                    onClick={this.handleSubmit}
                    >Create
                    </button>
                </Modal.Footer>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);