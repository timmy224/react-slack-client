import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services} from "../../context";
import "./Login.css";

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
        wrongCredentialsMsg: state.user.wrongCredentialsMsg,
        password: state.user.password,
    }
}

const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
    wrongCredentials: actions.user.wrongCredentials,
    setPassword: actions.user.setPassword,
    login: actions.user.login,
}
    
class Login extends Component {
    componentDidMount() {
        services.authService.getCSRFToken()
            .then(response => {
                services.storageService.set("csrf-token", response.headers.get("csrf-token"));
            })
            .catch(err => console.log(err));
    }

    handleSubmit = (event) => {
        const { username, password } = this.props
        event.preventDefault();
        this.props.login(username, password);
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
    	this.props.changeRoute({path:"/register"});
    };

    render() {
        const { wrongCredentialsMsg } = this.props;         
        const credentialsIncorrect = wrongCredentialsMsg ? <h3>Wrong Username or Password</h3> : null;
	        return(
	        	<div>
	        		{credentialsIncorrect}
                    <img className="logo" src="https://www.sblack.online/img/icon.png"></img>
                    <form>
    	      			<h1 className= "login">Sign in</h1>
                        <h6 className="continue">Continue with the username and password you use to sign in.</h6>
            			<input className ="login-input" onChange={this.onUsernameChange} type="text" placeholder="Enter Username" required="required" />
    			        <input className="login-input" onChange={this.onPasswordChange} type="password" placeholder="Enter Password" required="required" />
    			      	<input className= "sign-in-reg"onClick={this.handleSubmit} type="submit" value="Sign in" required="required"/>
                    </form>
                    <button className ="sign-in-reg"onClick={this.handleClick}>Register</button>
				</div>
        	)
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);

