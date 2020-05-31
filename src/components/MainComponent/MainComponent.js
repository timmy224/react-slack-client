import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";

class MainComponent extends Component {
  fetchMessages = () => {
    this.props.fetchMessages();
  };
  fetchChannels = () => {
    this.props.fetchChannels();
  };
  render() {
    return (
      <div>
        <Chat />
        <SideBar />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    channels: state.channel.list,
    messages: state.channel.messages,
  };
};

const mapActionsToProps = {
  fetchChannels: actions.channel.fetchChannels,
  fetchMessages: actions.channel.fetchMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(MainComponent);
