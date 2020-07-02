import React, { Fragment } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { take } from "rxjs/operators";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        showTakenMsg: state.user.showTakenMsg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
        password:state.user.password,
    }
}
const mapActionsToProps = {
    setUsername:actions.user.setUsername,
    takenUsername:actions.user.takenUsername,
    changeRoute:actions.route.changeRoute,
    setPassword:actions.user.setPassword
}

class Login extends React.Component {

    handleSubmitUser = (event) => {
        const { username, takenUsername } = this.props
        console.log('username is:', username)
        event.preventDefault();
        services.userService.checkUsername(username).then(isAvailable => {
            if (isAvailable) {
                services.storageService.set("username", username);
                services.socketService.connect({ username: username });
            } else {
                takenUsername(true);
            }
        });
    }

    handleSubmitPassword = (event) => {
        const {password}= this.props
        console.log ("password is:" , password)
        event.preventDefault();
    
    }

    handleChangeUser = (event) =>{
        let username = event.target.value
        return this.props.setUsername(username)

    }
    handleChangePassword =(event) => {
        let password= event.target.value
        return this.props.setPassword(password)
    }

    render() {
        const {  showTakenMsg, changeRoute } = this.props
        
        const takenMessage = showTakenMsg ? <h3>Username taken, Try another</h3> : null;
        return (
            <Fragment>
                <h1>Please Login</h1>
                {takenMessage}
                <form onSubmit={this.handleSubmitUser}>
                    Username:
                    <input
                        onChange={this.handleChangeUser} 
                        />
                <form onSubmit= {this.handleSubmitPassword}>
                    Password:
                    <input 
                    onChange={this.handleChangePassword} 
                    />
                </form>
                    <button type='submit'>Submit!</button>
                </form>
                <button
                 onClick = {() => changeRoute({path:"/main"})}>Main page?</button>
            </Fragment>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);