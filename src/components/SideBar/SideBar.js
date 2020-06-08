import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class SideBar extends Component {

    selectChannel = (event) => {
        this.props.selectChannel(event.target.value);
    }

    selectUser = (event) => {
        this.props.selectUser(event.target.value);
    }

    render() {
        const { channels, usernames } = this.props;
        let channelsDisplay = !channels.length ?
            <h2>Loading channels...</h2>
            : (channels.map((el) => <button
                value={el}
                onClick={this.selectChannel}
                key={el}>
                Channel #{el}
            </button>));
        let usernamesDisplay = !usernames.length ?
                <h2>Loading users...</h2>
                : (usernames.map((username) => <button 
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