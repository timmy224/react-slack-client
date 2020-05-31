import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class ChannelTest extends Component {
    fetchChannels = () => {
        this.props.fetchChannels();
    }

    // did not implement visuals for last 25 messages received
    // selectChannel = (event) => {
    //     this.props.selectChannel(event.target.value)
    //     console.log(event.target.value)
    // }

    fetchChannelMessages = (event) => {
        this.props.selectChannel(event.target.value)
        console.log(event.target.value)
        this.props.fetchChannelMessages(event.target.value);
    }

    render() {
        const { channels, channel, channelMessages } = this.props;
        console.log(channels)
        console.log(channel)
        console.log(channelMessages)
        return !channels.length ?
               <button onClick={this.fetchChannels}>Fetch channels</button>
               : (channels.map((el) => 
                    <button 
                        value={el} 
                        //onClick={this.selectChannel}
                        onClick={this.fetchChannelMessages}
                        key={el}>
                            Channel #{el}
                    </button>))
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        channel: state.channel.channel,
        channelMessages: state.channel.channelMessages,
    };
};

const mapActionsToProps = {
        fetchChannels: actions.channel.fetchChannels,
        selectChannel: actions.channel.selectChannel,
        fetchChannelMessages: actions.channel.fetchChannelMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(ChannelTest);

