import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state)=> {
  console.log('in chat.js:', state.user)
    return { 
        username:state.user.username,
        routePath:state.route.routePath,
        messages:state.message.messages,
    }
}

const mapActionsToProps = {
      changeRoute: actions.route.changeRoute,
      messageReceived: actions.message.messageReceived
}

class Chat extends React.Component {
  
  componentDidMount() {
    services.chatService.getMessages$().subscribe(message => {
      console.log("Received a message through the observable: ", message);
    this.props.messageReceived(message)
  })}

  onEnterPressed(message_content){
    const message = services.chatService.prepareMessage(message_content);
    services.socketService.send("send-message", message);
  }

  routeToChannelTest = () => {
    this.props.changeRoute({path:"/channel-test"});
  }

  render() {
    const { messages } = this.props;
    // if (routePath)  {
    //   return <Redirect to={{ pathname: routePath }} />
    // }
    return (
      <div>
        <button onClick={this.routeToChannelTest}>Route to Channel Test</button>
         {this.props.messages.map((message) => {
            return (<Message key={message.username + message.content} 
            time={message.time_sent} usernames={message.sender} text={message.content} />);
         })}
        <InputMessage
          onEnter={this.onEnterPressed}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
