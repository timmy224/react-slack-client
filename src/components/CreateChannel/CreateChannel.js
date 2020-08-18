import React, { Fragment, useState } from 'react';
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
        username: state.user.username
    }
}
const mapActionsToProps = {
    createChannel: actions.channel.createChannel,
    takenChannelName: actions.channel.takenChannelName,
    changeRoute: actions.route.changeRoute,
    handleShow: actions.channel.showModal
}

class CreateChannel extends React.Component {
    handleSubmit = (event) => {
        const { channel_name, takenChannelName, changeRoute, username} = this.props
        event.preventDefault();
        services.channelService.checkChannelName(channel_name)
            .then(isAvailable => {
                if (isAvailable) {
                    services.channelService.createChannel(channel_name,username)                } else {
                    takenChannelName(true);
                }
            })
            .catch(err => console.log(err));
    }

    handleChange = (event) =>{
        let channel_name = event.target.value
        return this.props.createChannel(channel_name)
    }

    render() {
        const { show_taken_msg, handleShow, showModal } = this.props;
        const takenMessage = show_taken_msg ? <h3>Channel Name taken</h3> : null;
        return (
            <div>
                <Button variant="primary" onClick={()=>handleShow(true)}>Create Channel</Button>

                <Modal show={showModal} onHide={()=>handleShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Channel Creation</Modal.Title>
                    {takenMessage}
                </Modal.Header>
                <Form
                onSubmit={this.handleSubmit}
                className="p-3">
                      <Form.Group controlId="channelName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="#new channel name" 
                        onChange={this.handleChange}/>
                      </Form.Group>
                      <br />
                    <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Make private"
                    />
                    <Button 
                    className="mt-2"
                    type='submit' 
                    variant="primary" 
                    onClick={()=>handleShow(false)} 
                    onSubmit={this.handleSubmit}
                    >create
                    </Button>
                </Form>
              </Modal>
            </div>           
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(CreateChannel);