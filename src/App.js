import React from "react";
import "./App.css";
import Chat from "./Component/Chat";
//import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import User from './User-service'
// import * as chatService from "./services/chat-service";

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    /* if (StorageService.load("username") ===null)
     {
      <Router>
      <Route path="/username" component={Username} />
      </Router> 
     }      
     else{
      UserService.setUsername(username) 
     }
       if (UserService.joinChat() == true ){
    UserService.joinChat()
       }
       else {  
        <Router>
      <Route path="/alertUsername" component={AlertUsername} />
      </Router> 
        }
    } 
    
    */
  }

  render() {
    return (
      <div>
        <Chat />
      </div>
    );
  }
}

export default App;
