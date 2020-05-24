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

    chatService.getSpecial$().subscribe(special => {
      console.log("Special message from special observable stream ", special)
    })
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

  // Week 1 Challenge 
  handleEcho = () => {
    let message = "Hello everyone"
    apiService.echoMessage(message).then(data => {
        console.log(data); // print data response
        //return data
    })
  }

  // Week 1 Challenge 
  handleSpecialEvent = () => {
    let message = "special event message"
    chatService.sendSpecialEvent(message);
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
        {/* Week 1 Challenge */}
        <button onClick={this.handleEcho}>Echo Button</button>
        <button onClick={this.handleSpecialEvent}>Special Event Button</button>
      </div>
    );
  }
}

export default Chat;
