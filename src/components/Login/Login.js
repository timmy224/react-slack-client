import React from 'react';
import { connect } from "react-redux";
import { actions, services} from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
        wrongCredentialsMsg: state.user.wrongCredentialsMsg,
        password: state.user.password,
    }
}
const mapActionsToProps = {
    setUsername:actions.user.setUsername,
    changeRoute:actions.route.changeRoute,
    wrongCredentials:actions.user.wrongCredentials,
    setPassword:actions.user.setPassword,
}

class Login extends React.Component {
    componentDidMount() {
        services.authService.getCSRFToken().then(response => {
            services.storageService.set("csrf-token", response.headers.get("csrf-token"));
        });
    }

    handleSubmit = (event) => {
        const { username, wrongCredentials, changeRoute, password } = this.props
        event.preventDefault();
        services.authService.loginUser(username, password)
            .then(data => {
                if (data.isAuthenticated) {
                    changeRoute({path:"/main"})
                } else{
                    wrongCredentials(true)
                }
            })}

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
        //TODO Uncomment once Sleyter's code is in project
    	// this.props.changeRoute({path:"/register"});
    };

    render() {
        const { wrongCredentialsMsg } = this.props;         
        const credentialsIncorrect = wrongCredentialsMsg ? <h3>Wrong Username or Password</h3> : null;
	        return(
	        	<div>
	        		{credentialsIncorrect}
                    <form>
    	      			<legend>Sign In</legend>
            			<input onChange={this.onUsernameChange} type="text" placeholder="username" required="required" />
    			        <input onChange={this.onPasswordChange} type="password" placeholder="password" required="required" />
    			      	<input onClick={this.handleSubmit} type="submit" value="Sign in" required="required"/>
                    </form>
                    <button onClick={this.handleClick}>Register</button>
				</div>
        	)
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);

