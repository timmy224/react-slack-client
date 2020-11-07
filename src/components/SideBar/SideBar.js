import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services, store } from "../../context";
import Button from 'react-bootstrap/Button';
import CreateChannel from "../CreateChannel/CreateChannel";
import InvitationsModal from "../InvitationsModal/InvitationsModal"
import InviteModal from "../InviteModal/InviteModal"

class SideBar extends Component {
    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }
    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }
    handleDelete = (event) => {
        let channel_id = event.target.value
        services.channelService.deleteChannel(channel_id).catch(err => console.log(err));
    }

    render() {
        const { channels, usernames, handleInviteShow, handleCreateShow, invitations, handleInvitationsShow} = this.props;
        let invitationsBtn = !invitations.length ? null 
            :   <div>
                    <InvitationsModal />
                    <button onClick={()=>handleInvitationsShow(true)}>Invitations Pending</button> 
                </div>

        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div key={channel.channel_id}>
                    <button
                        type="button" 
                        className="btn btn-dark m-1"
                        value={channel.channel_id}
                        onClick={this.selectChannel}>
                        {channel.name}
                    </button>
                    <button
                        type="button" 
                        className="btn btn-danger m-1"
                        value={channel.channel_id}
                        onClick={this.handleDelete}
                        >delete
                    </button>
                </div>
                ));
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map(username => 
                    <button 
                    type="button" 
                    className="btn btn-light m-1"
                    value={username}
                    onClick={this.selectUser}
                    key={username}>
                        {username}
                    </button>))
        return (
            <div>
                <div className = "container text-center mt-3 p-3 rounded" style={{border:'2px solid black'}}>
                    {channelsDisplay}
                </div>
                <br />
                {invitationsBtn}
                <InviteModal />
                <button onClick={()=>handleInviteShow(true)} type="button">Invite People</button>
                <CreateChannel />
                <Button variant="primary" onClick={()=>handleCreateShow(true)}>Create Channel</Button>
                <div className = "container text-center mt-3 p-3 rounded" style={{border:'2px solid black'}}>
                    {usernamesDisplay}
                </div>
            </div>
            
        )
    
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        usernames: state.user.usernames,
        invitations: state.invitation.pendingInvitations,
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    selectUser: actions.sidebar.selectUser,
    handleCreateShow: actions.channel.showCreateModal,
    handleInviteShow: actions.invitation.showInviteModal,
    handleInvitationsShow: actions.invitation.showInvitationsModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);