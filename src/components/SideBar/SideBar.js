import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class SideBar extends Component {

    fetchChannelMessages = (event) => {
        this.props.selectChannel(event.target.value)
    }

    render() {
        const { channels } = this.props;
        return (
            <div>
                {
                    !channels.length ?
                        <h2>Loading channels...</h2>
                        : (channels.map((el) => <button
                            value={el}
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
    };
};

const mapActionsToProps = {
    selectChannel: actions.sidebar.selectChannel,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);