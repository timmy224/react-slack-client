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
        <button onClick={this.fetchMessages(el.id)}>Channel{el.id} </button>
      ))
    );
  }
}
//NEED TO ROUTE TO NEW NESTED ROUTEPATH IN ORDER TO DISPLAY CHANNEL CHANGES WHEN ^BUTTON IS CLICKED .
//THIS SHOULD RENDER A DIFFERENT CHAT COMPONENT THAT HAS THE EL.ID
//WITHIN EACH CHAT COMPONENT THE FETCH MESSAGES SHOULD BE MAPPED AND RENDERED AS THE MESSAGES.

// OR CHANGE MESSAGE RETRIEVAL IN CHAT COMPONENT BASED ON WHICH BUTTON IS CLICKED
//     return !messages.length ? (
//       <button onCLick={this.fetchMessages}>Messages</button>
//     ) : (
//       messages.map((msg) => <p>{msg}</p>)
//     );
//   }
// }
const mapStateToProps = (state) => {
  return {
    channels: state.channel.channels,
    messages: state.channel.messages,
  };
};

const mapActionsToProps = {
  fetchChannels: actions.channel.fetchChannels,
  fetchMessages: actions.channel.fetchMessages,
};

export default connect(mapStateToProps, mapActionsToProps)(SideBar);
