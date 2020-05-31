import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class ChannelTest extends Component {
    fetchChannels = () => {
        this.props.fetchChannels();
    }

    // need to determine UI input implementation to pass in arg
    selectChannel = (user_selected_channel) => { 
        this.props.selectChannel(user_selected_channel);
    }

    // did not implement visuals for last 25 messages received
    fetchChannelMessages = (user_selected_channel) => {
        this.props.fetchChannelMessages(user_selected_channel);
    }

    render() {
        const { channels } = this.props;
        return !channels.length ?
               <button onClick={this.fetchChannels}>Fetch channels</button>
               : (channels.map((el) => <button key={el}>Channel #{el}</button>))
    };
}


const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        sel_channel: state.channel.channel,
        messages: state.channel.channelMessages,
    };
};

const mapActionsToProps = {
    fetchChannels: actions.channel.fetchChannels,
    selectChannel: actions.channel.selectChannel,
    fetchChannelMessages: actions.channel.fetchChannelMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(ChannelTest);

