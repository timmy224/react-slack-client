import React from "react";
import { Redirect } from "react-router-dom";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { connect } from "react-redux";
import { MESSAGE_UPDATE } from "../../modules/Chat/chatTypes";
import { messageUpdate } from "../../modules/Chat/chatActions";

class Chat extends React.Component {
  state = {
    messages: [],
    routePath: null,
  };
  componentDidMount() {
    console.log("this.props.messageUpdate:", this.props.messageUpdate);
    console.log("this.props.messages:", this.props.messages);
    this.props.messageUpdate();
  }
  // componentDidMount() {
  //   services.chatService.getMessages$().subscribe((message) => {
  //     console.log("Received a message through the observable: ", message);
  //     console.log("this.props:", this.props);
  //     this.setState({
  //       messages: [...this.state.messages, message],
  //     });
  //   });
  // }

  onEnterPressed(message_content) {
    const message = services.chatService.prepareMessage(message_content);
    services.socketService.send("send-message", message);
  }

  routeToChannelTest = () => {
    this.setState({
      routePath: "/channel-test",
    });
  };

  render() {
    let { messages } = this.state;
    if (this.state.routePath) {
      return <Redirect to={{ pathname: this.state.routePath }} />;
    }
    return (
      <div>
        <button onClick={this.routeToChannelTest}>Route to Channel Test</button>
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

// const mapStateToProps = (state) => {
//   return {
//     messages: state.messages,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     //dispatching plain action
//     messageUpdate: (message) => dispatch({ type: MESSAGE_UPDATE }),
// //   };
// };
export default connect(null, { messageUpdate })(Chat);
