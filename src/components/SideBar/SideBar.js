import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import { services } from "../../context";
import { filter } from 'rxjs/operators';

class SideBar extends Component {
    fetchChannels = () => {
        this.props.fetchChannels();
    }

    fetchChannelMessages = (event) => {
        this.props.selectChannel(event.target.value)
        this.props.fetchChannelMessages(event.target.value);
    }

    render() {
        const { channels } = this.props;
        return (
            <div>
                {
                    !channels.length ?
                        <button onClick={this.fetchChannels}>Fetch channels</button>
                        : (channels.map((el) => <button
                            value={el}
                            //onClick={this.selectChannel}
                            onClick={this.fetchChannelMessages}
                            key={el}>
                            Channel #{el}
                        </button>))
                }
            </div>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        channels: state.channel.channels,
        channel_id: state.channel.channel_id,
        channelMessages: state.message.channelMessages,
    };
};

const mapActionsToProps = {
    fetchChannels: actions.channel.fetchChannelIDs,
    selectChannel: actions.channel.selectChannel,
    fetchChannelMessages: actions.message.fetchMessagesChannel,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);