import React, { Fragment } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
        showWrongUserMsg: state.user.showWrongUserMsg,
        showWrongPwMsg: state.user.showWrongPwMsg,
        password: state.user.password,
    }
}
const mapActionsToProps = {
    setUsername:actions.user.setUsername,
    changeRoute:actions.route.changeRoute,
    wrongUsername:actions.user.wrongUsername,
    wrongPassword:actions.user.wrongPassword,
    setPassword:actions.user.setPassword,
}

class Login extends React.Component {

    handleSubmit = (event) => {
        const { username, wrongPassword, changeRoute, wrongUsername, password } = this.props
        console.log('username is:', username)
        event.preventDefault();
        services.userService.checkUsername(username).then(isAvailable => {
            if (!isAvailable) {
               services.loginService.checkPassword(password).then(isCorrect=>{
               		if(isCorrect){	
               			services.loginService.loginUser(username, password);
               			changeRoute({path:"/main"});
               		}else{
               			wrongPassword(true)}});
            }else{
            	wrongUsername(true);
            }
        })
    }

    onUsernameChange = (event) =>{
        let username = event.target.value
        return this.props.setUsername(username)
    };

    onPasswordChange = (event) =>{
        let password = event.target.value
        return this.props.setPassword(password)
    };

    handleClick = ()=>{
    	console.log('click')
    	// this.props.changeRoute({path:"/register"});
    };

    render() {
        const { showWrongUserMsg, showWrongPwMsg } = this.props;         
        const wrongUsername = showWrongUserMsg ? <h3>Wrong Username</h3> : null;
        const wrongPassword = showWrongPwMsg ? <h3>Wrong Password</h3> : null;
	        return(
	        	<div>
	        		{wrongUsername}
	        		{wrongPassword}
	      			<legend>Sign In</legend>
        			<input onChange={this.onUsernameChange} type="text" placeholder="username" />
			        <input onChange={this.onPasswordChange} type="password" placeholder="password"/>
			      	<input onClick={this.handleSubmit} type="submit" value="Sign in"/>
			        <button onClick={this.handleClick}>Register</button>
				</div>
        	)
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);

