import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state) => {
  return {
    username: state.userModule.username,
    routePath: state.routeModule.routePath,
    messages: state.userModule.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (message) =>
      dispatch(actions.userModule.messageReceived(message)),
    routeToChannels: () =>
      dispatch(actions.routeModule.changeRoute("/channel-test")),
  };
};
class Chat extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    services.chatService.getMessages$().subscribe((message) => {
      console.log("Received a message through the observable: ", message);
      this.props.fetchMessages(message);
    });
  }

  onEnterPressed(message_content) {
    const message = services.chatService.prepareMessage(message_content);
    services.socketService.send("send-message", message);
  }

  routeToChannelTest = () => {
    this.props.routeToChannels();
  };

  render() {
    let { routePath, username, messages } = this.props;

    console.log("in_render_chat.js:", username);
    // if (routePath)  {
    //   return <Redirect to={{ pathname: routePath }} />
    // }
    return (
      <div>
        {/* <button onClick={this.routeToChannelTest}>Route to Channel Test</button> */}
        {messages.map((message) => {
          return (
            <Message
              key={message.username + message.content}
              time={message.time_sent}
              usernames={message.sender}
              text={message.content}
            />
          );
        })}
        <InputMessage onEnter={this.onEnterPressed} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
