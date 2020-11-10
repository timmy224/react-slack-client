import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services, store } from "../../context";
import CreateChannel from "../CreateChannel/CreateChannel";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import InvitationsModal from "../InvitationsModal/InvitationsModal"
import InviteModal from "../InviteModal/InviteModal"

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
        const { channels, usernames, selectedChannel, selectedPartner, handleInviteShow, handleCreateShow, invitations, handleInvitationsShow} = this.props;
        let invitationsBtn = !invitations.length ? null 
            :   <div>
                    <InvitationsModal />
                    <button onClick={()=>handleInvitationsShow(true)}>Invitations Pending</button> 
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
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map(username => 
                    <div key={username} className={selectedPartner && selectedPartner == username ? sidebarItemHighlightClass : "sidebar-item"}>
                        <button
                            type="button"
                            className="sidebar-user unstyled-button"
                            value={username}
                            onClick={this.selectUser}>
                            {username}
                        </button>
                    </div>
                ))
        return (
            <div className="sidebar">
                <div className="org-name">
                    <p>CodeLearning</p>
                </div>
                <div className="sidebar-section-heading">
                    <span className="sidebar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button className="sidebar-section-heading-label unstyled-button">Channels</button>
                    <div className="sidebar-section-heading-right">
                        <button className="unstyled-button" onClick={()=>handleCreateShow(true)}>
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                        </button>
                    </div>                               
                </div>
                <CreateChannel />                <div className="container">
                    {channelsDisplay}
                </div>
                <div className="sidebar-section-heading">
                    <span className="sidebar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button className="sidebar-section-heading-label unstyled-button">Direct messages</button>
                    <div className="sidebar-section-heading-right">
                        <button className="unstyled-button">
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" onClick={()=>handleCreateShow(true)}/>
                        </button>
                    </div>                               
                </div>
                <div className="container">
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
            </div>
        );    
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        usernames: state.user.usernames,
        selectedChannel: state.chat.channel,
        selectedPartner: state.chat.partnerUsername,
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