import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./App.css";
// Depends on storageService, userService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";

class App extends Component {

    state = {
        routePath: null,
        routeState: {}
    }

    componentDidMount() {
        console.log("Hey");
        let username = services.storageService.get("username");
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
            services.userService.setUsername(username)
            services.socketService.connect({ username: username });
        }
    }

    setupConnectedSubscription() {
        services.socketService.getConnected$()
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
