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
        const { channel_name, takenChannelName, username, isPrivate, privateChannelUsers } = this.props
        event.preventDefault();
        const name = channel_name;
        const members =  isPrivate ? [...privateChannelUsers,username] : [];
        const channelInfo ={
            name,
            members,
            isPrivate
        }
        services.channelService.checkChannelName(name)
            .then(isAvailable => {
                if (isAvailable) {
                    services.channelService.createChannel(channelInfo) 
                    }else{
                        takenChannelName(true);    
                    }
                }
            )
            .catch(err => console.log(err));
    }
    handleUserChange = (event) =>{
        let users=event.target.value
        return this.props.setPrivateUsers(users.trim().split(/[\s,]+/))
    }

    handleChannelName = (event) =>{
        let channel_name = event.target.value
        return this.props.createChannel(channel_name)
    }

    render() {
        const { show_taken_msg, handleShow, showModal, isPrivate, createPrivate } = this.props;
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
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
                <Button variant="primary" onClick={()=>handleShow(true)}>Create Channel</Button>
                
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