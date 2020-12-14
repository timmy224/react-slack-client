import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";
import CreateChannelModal from "../Modals/CreateChannelModal/CreateChannelModal";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import CanView from "../CanView/CanView";
import PendingInvitationsModal from "../Modals/PendingInvitationsModal/PendingInvitationsModal";
import CreateOrgModal from "../Modals/CreateOrgModal/CreateOrgModal";
import InviteMembersModal from "../Modals/InviteMembersModal/InviteMembersModal";
import OrgSettingsModal from "../Modals/OrgSettingsModal/OrgSettingsModal";

class SideBar extends Component {
    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }

    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }

    deleteChannel = channelName => {
        this.props.deleteChannel(channelName);
    }

    render() {
        const { org, channels, orgMembers, selectedChannel, selectedPartner, showCreateChannelModal, showOrgSettingsModal } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        const sidebarItemHighlightClass = "sidebar-item-highlight";
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.values(channels).map(channel => 
                <div key={channel.name} className={selectedChannel && selectedChannel.name === channel.name ? sidebarItemHighlightClass : "sidebar-item"}>
                    <button
                        className="sidebar-channel unstyled-button"
                        type="button"
                        value={channel.name}
                        onClick={this.selectChannel}>
                        {"# " + channel.name}
                    </button>
                    <CanView
                        resource="channel"
                        action="delete"
                        yes={() => {
                            return (
                                <button
                                    type="button"
                                    className="channel-delete unstyled-button"
                                    value={channel.name}
                                    onClick={() => this.deleteChannel(channel.name)}>
                                    <FontAwesomeIcon icon={faTrashAlt} transform="grow-3" color="red" />
                                </button>
                            )
                        }}
                        no={() => null}
                    />
                </div>
                ));
        let orgMembersDisplay = services.utilityService.isEmpty(orgMembers) ?
                <h2>Loading users...</h2>
                : (Object.values(orgMembers).map(({ username, logged_in }) => 
                    <div key={username} className={selectedPartner && selectedPartner === username ? sidebarItemHighlightClass : "sidebar-item"}>
                        <button
                            type="button" 
                            className="user-icon unstyled-button"
                            value={username}
                            onClick={this.selectUser}>
                            <FontAwesomeIcon icon={faUser} transform="grow-3" color="#c3c3c3" />
                        </button>
                        <button
                            type="button"
                            className= "sidebar-user unstyled-button"
                            value={username}
                            onClick={this.selectUser}
                        >
                            {username}
                        </button>
                        <div className={`login-circle ${logged_in ? "logged-in" : null}`}></div>
                    </div>
                ))
        return (
            <div id="sidebar">
                <div className="org-name-header">
                        <h1>{org?.name}</h1>
                        <CanView
                        resource="org-member"
                        action="invite"
                        yes={() => (
                            <span className="org-options" onClick={() => showOrgSettingsModal(true)}>
                                <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                            </span> 
                        )}
                        no={() => null}
                    />
                    </div>
                <div className="sidebar-body">
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
                    <CreateChannelModal />                
                    <div className="container">
                        {channelsDisplay}
                    </div>
                    <div className="sidebar-section-heading">
                        <span className="sidebar-section-heading-expand">
                            <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                        </span>                    
                        <button className="sidebar-section-heading-label unstyled-button">Direct messages</button>
                    </div>
                    <div className = "container">
                        {orgMembersDisplay}
                    </div>
                </div>
                <div className="sidebar-end" old_className='container text-center logout-wrapper'>
                    <button
                        type="button" className="logout-btn"
                        onClick={() => this.props.logout()}>Logout</button>
                </div>
                <OrgSettingsModal />
                <PendingInvitationsModal />
                <CreateOrgModal />
                <InviteMembersModal />
            </div>
        );    
    };
}

const mapStateToProps = (state) => {
    const mapping = {
        org: state.org.org,
        selectedChannel: state.chat.channel,
        selectedPartner: state.chat.partnerUsername,
    };
    const { org } = mapping;
    if (org) {
        mapping.channels = state.channel.channels[org.name];
        mapping.orgMembers = state.org.orgs[org.name]?.members
    }    
    return mapping;
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    deleteChannel: actions.channel.deleteChannel,
    selectUser: actions.sidebar.selectUser,
    showCreateChannelModal: actions.channel.showCreateModal,
    logout: actions.user.logout,
    showOrgSettingsModal: actions.org.showOrgSettingsModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);