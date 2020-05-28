import React from "react";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { services } from "../../context";

class Chat extends React.Component {
  state = {
    messages: []
  };
  
  componentDidMount() {
    services.chatService.getMessages$().subscribe(message => {
      console.log("Received a message through the observable: ", message);
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  onEnterPressed(message_content) {
    const message = services.chatService.prepareMessage(message_content);
    services.socketService.send("send-message", message);
  }

  render() {
    let { messages } = this.state;
    return (
      <div>
        {messages.map((message) => {
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

export default Chat;
