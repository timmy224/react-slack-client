import React from "react";
import InputMessage from "./InputMessage";
import Message from "./Message";
import * as chatService from "../services/chat-service";
import * as apiService from "../services/api-service";

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
    chatService.sendMessage(message_content);
  }

  handleEcho = () => {
    let message = "Hello everyone"
    apiService.echoMessage(message).then(data => {
        console.log(data); // print data response
        //return data
    })
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
        <button onClick={this.handleEcho}>Echo Button</button>
      </div>
    );
  }
}

export default Chat;
