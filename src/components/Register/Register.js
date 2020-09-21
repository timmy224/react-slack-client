import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService, registerService
import { services } from "../../context";
import { actions } from "../../context";
import "./Register.css"

const mapStateToProps = (state)=>{
    return { 
        username: state.user.username,
        showTakenMsg: state.user.showTakenMsg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
        password:state.user.password,
        showMissingCred: state.user.showMissingCred
    }
}
const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    takenUsername: actions.user.takenUsername,
    changeRoute: actions.route.changeRoute,
    setPassword: actions.user.setPassword,
    missingCredentials: actions.user.missingCredentials,
}

class Register extends Component {
    handleSubmit = (event) => {
        const { username, takenUsername, password, changeRoute, setPassword,setUsername, missingCredentials, showmMissingCred } = this.props

        event.preventDefault();
        setUsername(username)
        setPassword(password)
        missingCredentials(false)
        takenUsername(false)
        services.registerService.registerUser(username, password)
            .then(data => {
                if (data.successful) {
                    services.storageService.set("username", username);
                    setPassword("")
                    changeRoute({path:"/login"})
                }
                else if (data.ERROR =="Missing username in route"){
                    return missingCredentials(true)
                }
                else if (data.ERROR =="Missing password in route"){
                    return missingCredentials(true)
                }
                else if (data.ERROR == "Username is taken"){
                    return takenUsername(true)
                }  
            })
            .catch(err => console.log(err));
    }

    handleChangeUser = (event) => {
        let username = event.target.value
        return this.props.setUsername(username)
    }
    handleChangePassword = (event) => {
        let password = event.target.value
        return this.props.setPassword(password)
    }
    render() {
        const {showTakenMsg, changeRoute, showMissingCred} = this.props

        const takenMessage = showTakenMsg ? <h3>Username taken, Try another</h3> : null;
        const missingCred = showMissingCred ?  <h3>Either password or username are missing.</h3> : null;
        return (
            <Fragment>
                <img className="logo" src="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"></img>
                <h1 className="register">Register for a new account</h1>
                <h6 className="create">Create an account with the username and password you will use to sign in.</h6>
                {takenMessage}
                {missingCred}
                <input
                    className="loginInput"
                    onChange={this.handleChangeUser}
                    type="text"
                    placeholder="Username"
                />
                <input 
                    className="loginInput"
                     onChange={this.handleChangePassword} 
                     type="password"
                     placeholder="Password"
                />
                <input
                className="signInReg"
                 onClick={this.handleSubmit}
                  type="submit"
                  value="Register" />
                
                <button
                className="signInReg"
                 onClick = {()=> changeRoute({path:"/login"})}>Login Form
                 </button>      
            
            </Fragment>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
