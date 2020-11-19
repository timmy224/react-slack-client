import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";
import Button from 'react-bootstrap/Button';
import CreateChannel from "../CreateChannel/CreateChannel";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import InvitationsModal from "../InvitationsModal/InvitationsModal"
import InviteModal from "../InviteModal/InviteModal"
import CreateOrg from "../CreateOrg/CreateOrg"
import CanView from "../CanView/CanView";

class SideBar extends Component {
    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }

    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }

    deleteChannel = channelId => {
        services.channelService.deleteChannel(channelId).catch(err => console.log(err));
    }

    render() {
        const { org, channels, users, selectedChannel, selectedPartner, showCreateChannelModal, showSendInviteModal, invitations, showPendingInvitationsModal, showCreateOrgModal} = this.props;
        let invitationsBtn = !invitations.length ? null 
            :   <div>
                    <InvitationsModal />
                <button onClick={() => showPendingInvitationsModal(true)}>Invitations Pending</button> 
                </div>

        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        const sidebarItemHighlightClass = "sidebar-item-highlight";
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div key={channel.channel_id} className={selectedChannel && selectedChannel.channel_id == channel.channel_id ? sidebarItemHighlightClass : "sidebar-item"}>
                    <button
                        className="sidebar-channel unstyled-button"
                        type="button" 
                        value={channel.channel_id}
                        onClick={this.selectChannel}>
                        {"# " + channel.name}
                    </button>
                    <button
                        type="button" 
                        className="channel-delete unstyled-button"
                        value={channel.channel_id}
                        onClick={() => this.deleteChannel(channel.channel_id)}>
                        <FontAwesomeIcon icon={faTrashAlt} transform="grow-3" color="red" />
                    </button>
                </div>
                ));
        let isUsersEmpty = services.utilityService.isEmpty(users);
        let usernamesDisplay = isUsersEmpty ?
                <h2>Loading users...</h2>
                : (Object.entries(users).map(([username, user]) =>  
                    <div key={username} className={selectedPartner && selectedPartner == username ? sidebarItemHighlightClass : "sidebar-item"}>
                        <button
                            type="button"
                            className= "sidebar-user unstyled-button"
                            value={username}
                            onClick={this.selectUser}>
                            {username}
                        </button>
                        <div className={`login-circle ${user.logged_in ? "logged-in" : null}`}></div>
                    </div>
                ))
        return (
            <div className="sidebar-wrapper">
                <div className="sidebar">
                    <div className="org-name">
                        <p>{org.name}</p>
                    </div>
                    <div className="sidebar-section-heading">
                        <span className="sidebar-section-heading-expand">
                            <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                        </span>                    
                        <button className="sidebar-section-heading-label unstyled-button">Channels</button>
                        <CanView
                            resource="channel"
                            action="create"
                            yes={() => {
                                return (<div className="sidebar-section-heading-right">
                                            <button className="unstyled-button" onClick={() => showCreateChannelModal(true)}>
                                                <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                                            </button>
                                        </div>)}}
                            no={() => null}
                        />                              
                    </div>
                    <CreateChannel />                
                    <div className="container">
                        {channelsDisplay}
                    </div>
                    <div className="sidebar-section-heading">
                        <span className="sidebar-section-heading-expand">
                            <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                        </span>                    
                        <button className="sidebar-section-heading-label unstyled-button">Direct messages</button>
                    </div>
                    <div className="container invite-create-wrapper">
                        <br />
                        {invitationsBtn}
                        <InviteModal />
                        {/* TODO match CSS of button element with Button Component */}
                        <button onClick={()=>showSendInviteModal(true)} type="button">Invite People</button>
                        <CreateChannel />
                        <div className = "container text-center mt-3 p-3 rounded">
                            {usernamesDisplay}
                        </div>
                    </div>
                    <div className='text-center logout-wrapper'>
                        <div className="container text-center logout-btn">
                            <button
                                type="button" className="btn btn-secondary m-1"
                                onClick={() => this.props.logout()}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        );    
    };
}

const mapStateToProps = (state) => {
    return {
        org: state.org.org,
        channels: state.channel.channels,
        users: state.user.users,
        selectedChannel: state.chat.channel,
        selectedPartner: state.chat.partnerUsername,
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
    logout: actions.user.logout,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);