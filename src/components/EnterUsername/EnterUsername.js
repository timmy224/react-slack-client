import React, { Fragment } from 'react';
import { Redirect } from "react-router-dom";
// import './App.css';
import * as userService from "../../services/user-service";
import * as storageService from "../../services/storage-service";
import * as apiService from "../../services/api-service";
import * as socketService from "../../services/socket-service";
import { take } from "rxjs/operators";

class EnterUsername extends React.Component {
    state = {
        username: "",
        showTakenMsg: false,
        routePath: null,
        routeState: {}
    }

    componentDidMount() {
        this.setupConnectedSubscription();
    }
    
    setupConnectedSubscription() {
        socketService.getConnected$()
        .pipe(take(1))
        .subscribe(connected => {
            if (connected) {
                this.setState({
                    routePath: "/chat"
                });
            } else {
                this.setState({
                    routePath: "/alert-user",
                    routeState: { alert: "Web socket connection error " }
                });
            }
        });
    }

    handleChange = (event) => {
        this.setState({
            username: event.target.value
        });
        this.setState((prevState) => {
            if (prevState.showTakenMsg) {
                return {
                    showTakenMsg: false
                };
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let username = this.state.username;
        apiService.checkUsername(username).then(isAvailable => {
            if (isAvailable) {
                storageService.set("username", username);
                userService.setUsername(username);
                userService.joinChat();
            } else {
                this.setState({
                    showTakenMsg: true
                });
            }
        });
    }

    render() {
        if (this.state.routePath)  {
            return <Redirect to={{ pathname: this.state.routePath, 
                state: this.state.routeState }} />
        }
        const takenMessage = this.state.showTakenMsg ? <h3>Username taken</h3> : null;
        return (
            <Fragment>
                {takenMessage}
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.input}
                        onChange={this.handleChange} />
                    <button type='submit'>Submit!</button>
                </form>
            </Fragment>            
        );
    }
}

export default EnterUsername