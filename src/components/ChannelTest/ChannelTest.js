import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class ChannelTest extends Component {
    fetchChannels = () => {
        this.props.fetchChannels();
    }

    render() {
        const { channels } = this.props;
        return !channels.length ?
            <button onClick={this.fetchChannels}>Fetch channels</button>
            : (channels.map((el) => <p key={el.id}>{el.id}</p>));
    };
}


const mapStateToProps = (state) => {
    return {
        channels: state.channel.list,
    };
};

const mapActionsToProps = {
    fetchChannels: actions.channel.fetchChannels,
};

export default connect(mapStateToProps, mapActionsToProps)(ChannelTest);

