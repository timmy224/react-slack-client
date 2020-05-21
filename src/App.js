import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import * as chatService from "./services/chat-service"; 
import * as socketService from "./services/socket-service";
import { take } from "rxjs/operators";

// Commented out code is a test of how the chatService runs
// TODO remove eventually
// chatService.getMessages$().subscribe(message => console.log("Message received from chatService: ", message));
// chatService.getJoinedChat$().subscribe(username => console.log("User joined chat received from chatService: ", username));

// let messages = [
//   {sender: "Luis", time_sent: "12:01", content: "yo"},
//   {sender: "Sleyter", time_sent: "12:01", content: "sup"},
//   {sender: "Konrad", time_sent: "12:01", content: "greetings"}
// ];

// chatService.onMessagesReceived(messages);

// chatService.onUserJoinedChat("Timmy");

// let messageTypedFromClient = {
//   sender: "Timmy", time_sent: "12:02", content: "Whazzaaap"
// };

// chatService.sendMessage(messageTypedFromClient);

// respond to whether we connected successfully or not 
socketService.getConnected$()
  .pipe(take(1))
  .subscribe(connected => {
    if (connected) {
      console.log("Successful connection!")
      // do stuff on successful connection
    } else {
      console.log("Unsuccessful connection")
      // do stuff on unsuccessful connection 
    }
  });

// try to connect
socketService.connect({username: "codeninja"});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
