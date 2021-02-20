import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";

import CreateChannelModal from "../Modals/CreateChannelModal/CreateChannelModal";
import CanView from "../CanView/CanView";
import InviteMembersModal from "../Modals/InviteMembersModal/InviteMembersModal";
import OrgSettingsModal from "../Modals/OrgSettingsModal/OrgSettingsModal";
import CustomButton from '../UI/CustomButton/CustomButton';

import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt, faHashtag } from "@fortawesome/free-solid-svg-icons";

class SideBar extends Component {
    selectChannel = (channelName) => {
        this.props.updateChannelStatus(prevState.channelName, false);
        this.props.selectChannel(channelName);
    }

    selectUser = (username) => {
        this.props.updatePrivateStatus(prevState.partnerUsername, false);
        this.props.selectUser(username);
    }

    deleteChannel = channelName => {
        this.props.deleteChannel(channelName);
    }

    setChannelStyle = (selectedChannel, channelName, sidebarItemHighLightClass, sidebarItemBold) => {
        let styles = {};
        if (selectedChannel && selectedChannel.name === channelName) {
            styles = Object.assign(styles, sidebarItemHighLightClass);
        }
        if (this.props.unreadChannels[channelName]) {
            styles = Object.assign(styles, sidebarItemBold);
        }
        return styles
    }

    setPrivateStyle = (selectedPartner, username, sidebarItemHighLightClass, sidebarItemBold) => {
        let styles = {};
        if (selectedPartner && selectedPartner === username) {
            styles = Object.assign(styles, sidebarItemHighLightClass);
        }
        if (this.props.unreadPrivates[username]) {
            styles = Object.assign(styles, sidebarItemBold);
        }
        return styles
    }

    render() {
        const { sidebarChannel, unstyledButton, channelDelete, sidebarUser, orgNameHeader, sidebar,
                orgOptions, sidebarBody, sidebarSectionHeading, sidebarSectionHeadingExpand, sidebarSectionHeadingLabel, 
                sidebarSectionHeadingRight, container, sidebarEnd, logoutBtn, sidebarItemHighlightClass, sidebarItemBold, sidebarItem, orgName, loginCircle, loggedIn, channelIcon } = styles;
        const { org, channels, orgMembers, selectedChannel, selectedPartner, handleCreateChannelModal, handleOrgSettingsModal } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.values(channels).map(channel => 
                <div 
                    key={channel.name} 
                    className={`${this.setChannelStyle(selectedChannel, channel.name, sidebarItemHighlightClass, sidebarItemBold)} ${sidebarItem}`}
                    onClick={() => this.selectChannel(channel.name)}>
                    <div className={channelIcon}>
                        <FontAwesomeIcon icon={faHashtag} transform="grow-1" color="#99a59e" />
                    </div>                    
                    <p className={sidebarChannel}>{channel.name.toLowerCase()}</p>
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
                    <div 
                        key={username} 
                        className={`${this.setChannelStyle(selectedPartner, username, sidebarItemHighlightClass, sidebarItemBold)} ${sidebarItem}`}
                        onClick={() => this.selectUser(username)}>
                        <div className={`${loginCircle} ${logged_in ? loggedIn : null}`}></div>
                        <p className={sidebarUser}>{username}</p>                        
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
                    <CustomButton
                        type="button" 
                        onClick={() => this.props.logout()}>Logout
                    </CustomButton>
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
        unreadChannels: state.sidebar.unreadChannels,
        unreadPrivates: state.sidebar.unreadPrivates
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
    updateChannelStatus: actions.sidebar.updateChannelStatus,
    updatePrivateStatus: actions.sidebar.updatePrivateStatus,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);