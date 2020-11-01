import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";
import Button from 'react-bootstrap/Button';
import CreateChannel from "../CreateChannel/CreateChannel";
import InvitationsModal from "../InvitationsModal/InvitationsModal"
import InviteModal from "../InviteModal/InviteModal"
import CreateOrg from "../CreateOrg/CreateOrg"

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
    handleOrgDelete = () => {
        //TODO
        let org_id = 26 //hard-coded for testing purposes, will be updated once redux stores org info
        services.orgService.deleteOrg({org_id}).catch(err => console.log(err));
    }

    render() {
        const { channels, usernames, showCreateChannelModal, showSendInviteModal, invitations, showPendingInvitationsModal, showCreateOrgModal} = this.props;
        let invitationsBtn = !invitations.length ? null 
            :   <div>
                    <InvitationsModal />
                <button onClick={() => showPendingInvitationsModal(true)}>Invitations Pending</button> 
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
                <button onClick={() => showSendInviteModal(true)} type="button">Invite People</button>
                <CreateChannel />
                <Button variant="primary" onClick={() => showCreateChannelModal(true)}>Create Channel</Button>
                <CreateOrg />
                <Button variant="primary" onClick={() => showCreateOrgModal(true)}>Create ORG</Button>
                <div className = "container text-center mt-3 p-3 rounded" style={{border:'2px solid black'}}>
                    {usernamesDisplay}
                </div>
                <button type='submit' onClick={this.handleOrgDelete} className="mt-2 btn btn-primary custom-button">Delete</button>
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
    showCreateChannelModal: actions.channel.showCreateModal,
    showSendInviteModal: actions.invitation.showInviteModal,
    showPendingInvitationsModal: actions.invitation.showInvitationsModal,
    showCreateOrgModal: actions.org.showCreateOrgModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);