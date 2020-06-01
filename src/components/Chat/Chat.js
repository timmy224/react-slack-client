import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { actions } from "../../context";

<<<<<<< HEAD
const mapStateToProps = (state) => {
  return {
    username: state.userModule.username,
    routePath: state.routeModule.routePath,
    messages: state.userModule.messages,
  };
};
=======
const mapStateToProps = (state)=> {
  console.log('in chat.js:', state.user)
    return { 
        username:state.user.username,
        routePath:state.route.routePath,
        messages:state.user.messages,
    }
}

const mapActionsToProps = (dispatch)=> {
   return {
      changeRoute: actions.route.changeRoute,
      messageReceived: actions.message.messageReceived

    }
}
>>>>>>> dev

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMessages: (message) =>
      dispatch(actions.userModule.messageReceived(message)),
    routeToChannels: () =>
      dispatch(actions.routeModule.changeRoute("/channel-test")),
  };
};
class Chat extends React.Component {
<<<<<<< HEAD
=======
  
>>>>>>> dev
  componentDidMount() {
    services.chatService.getMessages$().subscribe((message) => {
      console.log("Received a message through the observable: ", message);
<<<<<<< HEAD
      this.props.fetchMessages(message);
    });
  }
=======
    this.props.messageReceived(message)
  })}
>>>>>>> dev

  onEnterPressed(message_content) {
    const message = services.chatService.prepareMessage(message_content);
    services.socketService.send("send-message", message);
  }

  routeToChannelTest = () => {
<<<<<<< HEAD
    this.props.routeToChannels();
  };

  render() {
    let { routePath, username, messages } = this.props;

    console.log("in_render_chat.js:", username);
=======
    this.props.changeRoute("/channel-test");
  }

  render() {
    const { messages } = this.props;
>>>>>>> dev
    // if (routePath)  {
    //   return <Redirect to={{ pathname: routePath }} />
    // }
    return (
      <div>
<<<<<<< HEAD
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
=======
        <button onClick={this.routeToChannelTest}>Route to Channel Test</button>
         {this.props.messages.map((message) => {
            return (<Message key={message.username + message.content} 
            time={message.time_sent} usernames={message.sender} text={message.content} />);
         })}
        <InputMessage
          onEnter={this.onEnterPressed}
        />
>>>>>>> dev
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
