import React from "react";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
import * as chatService from "../../services/chat-service";
import * as socketService from "../../services/socket-service";

class Chat extends React.Component {
  state = {
    messages: []
  };
  
  componentDidMount() {
    chatService.getMessages$().subscribe(message => {
      console.log("Received a message through the observable: ", message);
      this.setState({
        messages: [...this.state.messages, message]
      });
    });
  }

  

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     input: "",
  //     username: "Sleyter",
  //     time: Date(),
  //     message: ["message1", "second one", "please work"],
  //   };

  //   this.keyPressed = this.keyPressed.bind(this);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.submitMessage = this.submitMessage.bind(this);
  // }

  onEnterPressed(message_content) {
    const message = chatService.prepareMessage(message_content);
    socketService.send("send-message", message);
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
