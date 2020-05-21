import React from "react";
import InputMessage from "./InputMessage";
import Message from "./Message";
import {
  sendMessage,
  onMessagesReceived,
  onUserJoinedChat,
} from "../services/chat-service";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      username: "Sleyter",
      time: Date(),
      message: ["message1", "second one", "please work"],
    };

    this.keyPressed = this.keyPressed.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      sendMessage(this.state.input);
    }
  }

  submitMessage() {
    this.setState({ messages: [...this.state.message, this.state.input] });
    this.setState({ input: "" });
  }

  render() {
    let { message, username, time } = this.state;

    return (
      <div>
        {message.map((message) => {
          return <Message time={time} usernames={username} text={message} />;
        })}
        <InputMessage
          className="input-message"
          onChange={this.handleChange}
          onKeyPress={this.keyPressed}
          value={this.state.input}
        />
      </div>
    );
  }
}

export default Chat;
