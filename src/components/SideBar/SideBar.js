import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";

//TODO upon 
class SideBar extends Component {

    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }

    readChannelMessages = (event) => {
        this.props.readChannelMessages(event.target.value); 
    }

    readPrivateMessages = (event) => {
        this.props.readPrivateMessages(event.target.value);
    }

    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }
    handleDelete = (event) => {
        let channel_id = event.target.value
        services.channelService.deleteChannel(channel_id);
    }

    render() {
        const { channels, usernames } = this.props;
        let isChannelsEmpty = services.utilityService.isEmpty(channels);
        const sidebarItemHighlightClass = "sidebar-item-highlight"; 
        // TODO add var for CSS element for bolding channel/private channel 
        // ADD event handler for reading messages when selecting channel
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div 
                    key={channel.channel_id} 
                    class={
                        selectedChannel && selectedChannel.channel_id == channel.channel_id ? 
                            sidebarItemHighlightClass :
                            "sidebar-item"
                    }
                >
                    <button
                        value={channel.channel_id}
                        onClick={this.selectChannel}
                        key={channel.channel_id}>
                        {channel.name}
                    </button>
                    <button
                        value={channel.channel_id}
                        onClick={this.handleDelete}
                        >delete
                    </button>
                </div>
                ));
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map(username => <button 
                    value={username}
                    onClick={this.selectUser}
                    key={username}>
                        {username}
                    </button>))
        return (
            <div>
                {channelsDisplay}
                {usernamesDisplay}
            </div>
        )
    
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        usernames: state.user.usernames,
        selectedChannel: state.chat.channel,
        selectedPartner: state.chat.partnerUsername, 
        // TODO map alert states to props
        channelMessagesAlert: state.message.channelMessagesAlert,
        privateMessagesAlert: state.message.privateMessagesAlert,
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    selectUser: actions.sidebar.selectUser,
    handleShow: actions.channel.showModal,
    // TODO map alert actions to props
    readChannelMessages: actions.message.readChannelMessages,
    readPrivateMessages: actions.message.readPrivateMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);