import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services} from "../../context";

import styles from "./Login.module.css";
import classes from "../Register/Register.module.css"
import { Container, Row, Col } from 'react-bootstrap'

const mapStateToProps = (state)=>{
    return { 
        username:state.user.username,
        routePath: state.route.routePath,
        wrongCredentialsMsg: state.user.wrongCredentialsMsg,
    }
}

const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    changeRoute: actions.route.changeRoute,
    wrongCredentials: actions.user.wrongCredentials,
    login: actions.user.login,
    googleLogin: actions.user.googleLogin
}
    
class Login extends Component {
    constructor(){
        super();
        this.state={
            password: '',
        }
    }

    componentDidMount() {
        services.authService.getCSRFToken()
            .then(response => {
                services.storageService.set("csrf-token", response.headers.get("csrf-token"));
            })
            .catch(err => console.log(err));
    }

    handleSubmit = event => {
        event.preventDefault();
        const { password } = this.state
        const { username, login } = this.props
        login(username, password);
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({[name]: value})
    }

    onUsernameChange = (event) =>{
        const username = event.target.value
        return this.props.setUsername(username)
    };

    handleClick = ()=>{
    	this.props.changeRoute({path:"/register"});
    };

    render() {
        const { wrongCredentialsMsg, googleLogin } = this.props;  
        const { password }  = this.state;  
        const { main, logoCol, greenColor, logo, formCol, formWrapper, login, next, btnCol } = styles 
        const { customInput, signInReg } = classes  
        const credentialsIncorrect = wrongCredentialsMsg ? <h3>Wrong Username or Password</h3> : null;
	        return(
	        	<div className={main}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md lg="6" className={`${logoCol} ${greenColor}`}>
                                <img 
                                    className={logo}
                                    alt="logo"
                                    src="https://www.sblack.online/img/icon.png">
                                </img>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md lg="6" className={`${formCol} ${greenColor}`}>
                                <form className={formWrapper}>
                                    <h2 className={login}>Sign in to Kcals</h2>
                                    <h6 className={next}>Continue with the username and password you use to sign in.</h6>
                                    <input className={`${customInput} login-input`} 
                                        type="text" 
                                        name="username"
                                        placeholder="Enter Username" 
                                        onChange={this.onUsernameChange} 
                                        required="required" />
                                    <input 
                                        type="password" 
                                        name="password"
                                        placeholder="Enter Password" 
                                        value={password}
                                        onChange={this.handleInputChange}
                                        className={`${customInput} login-input`}  
                                        required="required" />
                                </form>
                                {credentialsIncorrect}
                            </Col> 
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md lg="6" className={`${btnCol} ${greenColor}`}>
                                <button 
                                    className={signInReg} 
                                    onClick={this.handleSubmit} 
                                    type="submit" 
                                    value="Sign in" 
                                    required="required"
                                    >Sign In
                                </button>
                                <button 
                                    className={signInReg} 
                                    onClick={googleLogin} 
                                    >Sign In with Google
                                </button>
                                <button 
                                    className={signInReg} 
                                    onClick={this.handleClick}
                                    >Register
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </div>
        	)
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);