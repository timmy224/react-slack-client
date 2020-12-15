import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService, registerService
import { services } from "../../context";
import { actions } from "../../context";

import styles from "./Register.module.css"

const mapStateToProps = (state)=>{
    return { 
        username: state.user.username,
        showTakenMsg: state.user.showTakenMsg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    takenUsername: actions.user.takenUsername,
    changeRoute: actions.route.changeRoute,
}

class Register extends Component {
    constructor(){
        super();
        this.state={
            password: '',
            showMissingCredMsg: false,
            showTakenUsernameMsg: false,
        }
    }

    handleSubmit = (event) => {
        console.log('click')
        event.preventDefault();
        const { username, changeRoute } = this.props
        const { password } = this.state
        services.registerService.registerUser(username, password)
            .then(data => {
                if (data.successful) {
                    services.storageService.set("username", username);
                    this.reset()
                    return changeRoute({path:"/login"})
                }else if (data.ERROR !== "Username is taken"){
                    this.setState({showMissingCredMsg: true})
                }else{
                    this.setState({showTakenUsernameMsg: true})
                } 
                this.reset()
            })
            .catch(err => console.log(err));
    }

    handleChangeUser = (event) => {
        let username = event.target.value
        return this.props.setUsername(username)
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    reset = () => {
        this.setState({
            password: '',
            showMissingCredMsg: false,
            showTakenUsernameMsg: false,
        });
    }

    render() {
        const { register, create, signInReg } = styles
        const { password, showMissingCredMsg, showTakenUsernameMsg } = this.state
        const { changeRoute,customInput } = this.props
        const takenMessage = showTakenUsernameMsg ? <h3>Username taken, Try another</h3> : null;
        const missingCred = showMissingCredMsg ?  <h3>Either password or username are missing.</h3> : null;
        return (
            <Fragment>
                <h1 className={register}>Register for a new account</h1>
                <h6 className={create}>Create an account with the username and password you will use to sign in.</h6>
                {takenMessage}
                {missingCred}
                <input
                    className={`login-input ${customInput}`}
                    onChange={this.handleChangeUser}
                    type="text"
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    name="password"
                    placeholder="Enter Password" 
                    value={password}
                    onChange={this.handleInputChange}
                    className={`login-input ${customInput}`} 
                    required="required" />
                <input
                    className={signInReg}
                    onClick={this.handleSubmit}
                    type="submit"
                    value="Register" />
                <button
                    className={signInReg}
                    onClick = {()=> changeRoute({path:"/login"})}>Login Form
                </button> 
            </Fragment>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Register);