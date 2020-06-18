import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";


class SideBar extends Component {

    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
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
        let channelsDisplay = isChannelsEmpty ?
            <h2>Loading channels...</h2>
            : (Object.entries(channels).map(([channel_id, channel]) => 
                <div>
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
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
    selectUser: actions.sidebar.selectUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);