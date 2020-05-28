import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
// COMPONENTS 
import EnterUsername from "../EnterUsername/EnterUsername";
import AlertUser from "../AlertUser/AlertUser";
import Chat from "../Chat/Chat";

// SERVICES
import * as storageService from "../../services/storage-service";
import * as userService from "../../services/user-service";
import * as socketService from "../../services/socket-service";
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
            this.setupConnectedSubscription();
            // user exists
            userService.setUsername(username)
            socketService.connect({ username: username });
        }
    }

    setupConnectedSubscription() {
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
    }

    render() {
        if (!this.state.routePath) {
            return <h1>Loading....</h1>
        } else {
            return <Redirect to={{ pathname: this.state.routePath, 
                    state: this.state.routeState }} />
        }
    }
}

export default App;
