import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";
import CreateChannelModal from "../Modals/CreateChannelModal/CreateChannelModal";
import CanView from "../CanView/CanView";
import InviteMembersModal from "../Modals/InviteMembersModal/InviteMembersModal";
import OrgSettingsModal from "../Modals/OrgSettingsModal/OrgSettingsModal";

import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons";

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
        const { sidebarChannel, unstyledButton, channelDelete, userIcon, sidebarUser, orgNameHeader, sidebar,
                orgOptions, sidebarBody, sidebarSectionHeading, sidebarSectionHeadingExpand, sidebarSectionHeadingLabel, 
                sidebarSectionHeadingRight, container, sidebarEnd, logoutBtn, sidebarItemHighlightClass, sidebarItem, orgName, loginCircle, loggedIn } = styles;
        const { org, channels, orgMembers, selectedChannel, selectedPartner, handleCreateChannelModal, handleOrgSettingsModal } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.values(channels).map(channel => 
                <div key={channel.name} className={`${selectedChannel && selectedChannel.name === channel.name ? sidebarItemHighlightClass : null} ${sidebarItem}`}>
                    <button
                        className={`${sidebarChannel} ${unstyledButton}`}
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
                                    className={`${channelDelete} ${unstyledButton}`}
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
                    <div key={username} className={`${selectedPartner && selectedPartner === username ? sidebarItemHighlightClass : null} ${sidebarItem}`}>
                        <button
                            type="button" 
                            className={`${userIcon} ${unstyledButton}`}
                            value={username}
                            onClick={this.selectUser}>
                            <FontAwesomeIcon icon={faUser} transform="grow-3" color="#c3c3c3" />
                        </button>
                        <button
                            type="button"
                            className= {`${sidebarUser} ${unstyledButton}`}
                            value={username}
                            onClick={this.selectUser}
                        >
                            {username}
                        </button>
                        <div className={`${loginCircle} ${logged_in ? loggedIn : null}`}></div>
                    </div>
                ))
        return (
            <div className={sidebar}>
                <div className={orgNameHeader}>
                        <h1 className={orgName}>{org?.name}</h1>
                        <CanView
                        resource="org-member"
                        action="invite"
                        yes={() => (
                            <span className={orgOptions} onClick={() => handleOrgSettingsModal(true)}>
                                <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                            </span> 
                        )}
                        no={() => null}
                    />
                    </div>
                <div className={sidebarBody}>
                    <div className={sidebarSectionHeading}>
                        <span className={sidebarSectionHeadingExpand}>
                            <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                        </span>                    
                        <button className={`${sidebarSectionHeadingLabel} ${unstyledButton}`}>Channels</button>
                        <CanView
                            resource="channel"
                            action="create"
                            yes={() => {
                                return (<div className={sidebarSectionHeadingRight}>
                                            <button className={unstyledButton} onClick={() => handleCreateChannelModal(true)}>
                                                <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                                            </button>
                                        </div>)}}
                            no={() => null}
                        />                              
                    </div>
                    <CreateChannelModal />                
                    <div className={container}>
                        {channelsDisplay}
                    </div>
                    <div className={sidebarSectionHeading}>
                        <span className={sidebarSectionHeadingExpand}>
                            <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                        </span>                    
                        <button className={`${sidebarSectionHeadingLabel} ${unstyledButton}`}>Direct messages</button>
                    </div>
                    <div className={container}>
                        {orgMembersDisplay}
                    </div>
                </div>
                <div className={sidebarEnd} old_className='container text-center logout-wrapper'>
                    <button
                        type="button" 
                        className={logoutBtn}
                        onClick={() => this.props.logout()}>Logout</button>
                </div>
                <OrgSettingsModal />
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
    handleCreateChannelModal: actions.channel.showCreateChannelModal,
    logout: actions.user.logout,
    handleOrgSettingsModal: actions.org.showOrgSettingsModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);