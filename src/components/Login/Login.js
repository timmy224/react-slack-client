import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services} from "../../context";
import "./Login.css";
import { Container, Row, Col } from 'react-bootstrap'
import CustomButton from '../CustomButton/CustomButton';
import CustomFormInput from '../CustomFormInput/CustomFormInput';
import CustomForm from '../CustomForm/CustomForm';

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
	        	<div className="main">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col md lg="6" className="logo-col green-color">
                                <img className="logo" src="https://www.sblack.online/img/icon.png"></img>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md lg="6" className="form-col green-color">
                                <CustomForm onSubmit={this.handleSubmit}>
                                    <h2 className= "login">Sign in to Kcals</h2>
                                    <h6 className="continue">Continue with the username and password you use to sign in.</h6>
                                    <CustomFormInput type="text" name="username" placeholder="username" onChange={this.onUsernameChange}>Enter Username</CustomFormInput>
                                    <CustomFormInput type="password" name="password" placeholder="password" onChange={this.onPasswordChange}>Enter Password</CustomFormInput>
                                    <CustomButton onClick={this.handleSubmit} type="submit">Sign In</CustomButton>
                                    <CustomButton onClick={this.handleClick}>Register</CustomButton>
                                </CustomForm>
                                {credentialsIncorrect}
                            </Col> 
                        </Row>
                    </Container>
                </div>
        	)
        }
}

export default connect(mapStateToProps, mapActionsToProps)(Login);

