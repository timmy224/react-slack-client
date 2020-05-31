import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

class SideBar extends Component {
  fetchMessages = () => {
    this.props.fetchMessages();
  };
  fetchChannels = () => {
    this.props.fetchChannels();
  };

  render() {
    const { messages, channels } = this.props;
    return !channels.length ? (
      <button onClick={this.fetchChannels}>Channels</button>
    ) : (
      channels.map((el) => (
        <button onClick={this.fetchMessages(el.id)}>Channel #{el.id}</button>
      ))
    );
  }
}
//     return !messages.length ? (
//       <button onCLick={this.fetchMessages}>Messages</button>
//     ) : (
//       messages.map((msg) => <p>{msg}</p>)
//     );
//   }
// }
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

export default connect(mapStateToProps, mapActionsToProps)(SideBar);
