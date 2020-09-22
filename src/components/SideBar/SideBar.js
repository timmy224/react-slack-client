import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services, store } from "../../context";
import Button from 'react-bootstrap/Button';
import CreateChannel from "../CreateChannel/CreateChannel";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCaretDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
        const { channels, usernames, handleShow, selectedChannel, selectedPartner } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        const sidebarItemHighlightClass = "sidebar-item-highlight";
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div key={channel.channel_id} class={selectedChannel && selectedChannel.channel_id == channel.channel_id ? sidebarItemHighlightClass : ""}>
                    <button
                        class="sidebar-channel unstyled-button"
                        value={channel.channel_id}
                        onClick={this.selectChannel}>
                        {"# " + channel.name}
                    </button>
                    <button
                        type="button" 
                        class="channel-delete unstyled-button"
                        value={channel.channel_id}
                        onClick={() => this.deleteChannel(channel.channel_id)}>
                        <FontAwesomeIcon icon={faTrashAlt} transform="grow-3" color="red" />
                    </button>
                </div>
                ));
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map(username => 
                    <div key={username} class={selectedPartner && selectedPartner == username ? sidebarItemHighlightClass : ""}>
                        <button
                            type="button"
                            class="sidebar-user unstyled-button"
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
                    <span class="sidebar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button class="sidebar-section-heading-label unstyled-button">Channels</button>
                    <div class="sidebar-section-heading-right">
                        <button class="unstyled-button" onClick={()=>handleShow(true)}>
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                        </button>
                    </div>                               
                </div>
                <CreateChannel />
                <div className="container">
                    {channelsDisplay}
                </div>
                <div className="sidebar-section-heading">
                    <span class="sidebar-section-heading-expand">
                        <FontAwesomeIcon icon={faCaretDown} transform="grow-4" color="#99a59e" />
                    </span>                    
                    <button class="sidebar-section-heading-label unstyled-button">Direct messages</button>
                    <div class="sidebar-section-heading-right">
                        <button class="unstyled-button">
                            <FontAwesomeIcon icon={faPlus} transform="grow-6" color="#99a59e" />
                        </button>
                    </div>                               
                </div>
                <div className="container">
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
        selectedChannel: state.chat.channel,
        selectedPartner: state.chat.partnerUsername
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    selectUser: actions.sidebar.selectUser,
    handleShow: actions.channel.showModal,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);