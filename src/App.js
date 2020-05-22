import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
// COMPONENTS 
import EnterUsername from "./Component/EnterUsername";
import AlertUser from "./Component/AlertUser";
import Chat from "./Component/Chat";

// SERVICES
import * as storageService from "./services/storage-service";
import * as userService from "./services/user-service";
import * as socketService from "./services/socket-service";
import { take } from "rxjs/operators";

class App extends Component {

    state = {
        routePath: null,
        routeState: {}
    }

    componentDidMount() {
        console.log("Hey");
        let username = storageService.get("username");
        console.log("Username is: ", username);
        let isNewUser =  username === null;
        if (isNewUser) {
            this.setState({
                routePath: "/enter-username"
            });
        }
        else {
            socketService.getConnected$()
            .pipe(take(1)) // TODO learn what this does
            .subscribe(connected => {
                if (connected) {                    
                    console.log("Successful connection!");
                    this.setState({
                        routePath: "/chat"
                    });
                } else {
                    this.setState({
                        routePath: "/alert-user",
                        routeState: { alert: "Web socket connection error "}
                    });
                }
            });
            // user exists
            userService.setUsername(username)
            userService.joinChat()
        }
        // else {
        //     <Switch>
        //         <Route path="/AlertUser" component={AlertUsern} />
        //     </Switch>
        // }
    }
    render() {
        if (!this.state.routePath) {
            return <h1>Loading....</h1>
        } else {
            return <Redirect to={{ pathname: this.state.routePath, 
                    state: this.state.routeState }} />
        }
        // return <AlertUser alert={"Heyoooo"}></AlertUser>
        // return (
        //     <Redirect to={{ pathname: '/alert-user', 
        //             state: { alert: "This is our test" } }} />
        // );
        // return (
        //     <div>
        //         <Chat />
        //     </div>
        // );
    }
}

export default App;




// import * as apiService from "./services/api-service";
// import * as chatService from "./services/chat-service"; 
// import * as socketService from "./services/socket-service";
// import { take } from "rxjs/operators";

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

///////////////////// SOCKET SERVICE CONNECT OBSERVABLE TEST //////////////////////////////
// import * as socketService from "./services/socket-service";
// import { take } from "rxjs/operators";

// socketService.getConnected$()
//   .pipe(take(1))
//   .subscribe(connected => {
//     if (connected) {
//       console.log("Successful connection!")
//       // do stuff on successful connection
//     } else {
//       console.log("Unsuccessful connection")
//       // do stuff on unsuccessful connection 
//     }
//   });

// try to connect
// socketService.connect({username: "codeninja"});