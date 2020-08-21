import React, { Fragment } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { actions } from "../../context";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const mapStateToProps = (state)=>{
    return { 
        channel_name: state.channel.channel_name,
        show_taken_msg: state.channel.show_taken_msg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
        showModal: state.channel.showModal,
        username: state.user.username,
        isPrivate: state.channel.isPrivate,
        privateChannelUsers: state.channel.privateChannelUsers
    }
}
const mapActionsToProps = {
    createChannel: actions.channel.createChannel,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
    handleShow: actions.channel.showModal,
    createPrivate: actions.channel.createPrivate,
    setPrivateUsers: actions.channel.privateChannelUsers
}

class CreateChannel extends React.Component {
    handleSubmit = (event) => {
        const { channel_name, takenChannelName, username, isPrivate, privateChannelUsers, createPrivate} = this.props
        event.preventDefault();
        const name = channel_name;
        const members =  isPrivate ? [...privateChannelUsers,username] : [];
        const channelInfo ={
            name,
            members,
            isPrivate
        }
        services.channelService.createChannel(channelInfo)
        .then(data => {
            if (data.ERROR == "Channel name is taken") {
                takenChannelName(true);
            }})
        createPrivate(false)
    }
    handleUserChange = (event) =>{
        let users=event.target.value
        let usersList = users.trim().split(/[\s,]+/)
        return this.props.setPrivateUsers(usersList)
    }

    handleChannelName = (event) =>{
        let channel_name = event.target.value
        return this.props.createChannel(channel_name)
    }

    render() {
        const { show_taken_msg, handleShow, showModal, isPrivate, createPrivate, privateChannelUsers} = this.props;
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
        const userButton = privateChannelUsers.map(user => <button type="button" class="btn btn-light m-1"value={user} key={user}>{user}</button>)
        const formDisplay = !isPrivate ?
                <Form
                onSubmit={this.handleSubmit}
                className="p-3">
                      <Form.Group controlId="channelName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="#new channel name" 
                        onChange={this.handleChannelName}/>
                      </Form.Group>
                      <br />
                    <Button 
                    className="mt-2"
                    type='submit' 
                    variant="primary" 
                    onClick={()=>handleShow(false)} 
                    onSubmit={this.handleSubmit}
                    >create
                    </Button>
                </Form>
            :
                <Form
                onSubmit={this.handleSubmit}
                className="p-3">
                      <Form.Group controlId="channelName">
                        <Form.Label>Private Channel Name</Form.Label>
                        <Form.Control 
                        name="channelName"
                        type="text" 
                        placeholder="#new channel name"
                        onChange={this.handleChannelName}/>
                      </Form.Group>
                      <br />
                      {userButton}
                      <br />
                      <Form.Group controlId="channelName">
                        <Form.Label>Users</Form.Label>
                        <Form.Control 
                        name="users"
                        type="text" 
                        placeholder="#enter users seperated by a space" 
                        onChange={this.handleUserChange}/>
                      </Form.Group>
                      <br />
                    <Button 
                    className="mt-2"
                    type='submit' 
                    variant="primary" 
                    onClick={()=>handleShow(false)}
                    onSubmit={this.handleSubmit}
                    >create
                    </Button>
                </Form>
        return (
            <div>
                <Modal show={showModal} onHide={()=>handleShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Channel Creation</Modal.Title>
                    {takenMessage}
                </Modal.Header>
                {formDisplay}
                <Modal.Footer>
                    <Form.Check 
                        type="switch"
                        id="switchEnabled"
                        label="Make private"
                        onChange={()=>createPrivate(!isPrivate)}
                        />
                </Modal.Footer>
                </Modal>
            </div>         
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);