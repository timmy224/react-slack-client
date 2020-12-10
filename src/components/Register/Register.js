import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService, registerService
import { services } from "../../context";
import { actions } from "../../context";
import "./Register.css"
import CustomButton from '../CustomButton/CustomButton';
import CustomFormInput from '../CustomFormInput/CustomFormInput';
import CustomForm from '../CustomForm/CustomForm';

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
        const { username, takenUsername, password, changeRoute, setPassword,setUsername, missingCredentials } = this.props

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
                else if (data.ERROR === "Missing username in route"){
                    return missingCredentials(true)
                }
                else if (data.ERROR === "Missing password in route"){
                    return missingCredentials(true)
                }
                else if (data.ERROR === "Username is taken"){
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
            <CustomForm onSubmit={this.handleSubmit}>
                <h1 className="register">Register for a new account</h1>
                <h6 className="create">Create an account with the username and password you will use to sign in.</h6>
                {takenMessage}
                {missingCred}
                <CustomFormInput 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    onChange={this.handleChangeUser}>
                    Enter Username
                </CustomFormInput>
                <CustomFormInput 
                    type="text" 
                    name="password" 
                    placeholder="password" 
                    onChange={this.handleChangePassword} >
                    Enter Password
                </CustomFormInput>
                <CustomButton type="submit" onClick={this.handleSubmit}>Submit</CustomButton>    
                <CustomButton onClick={()=>changeRoute({path:"/login"})}>Login Form</CustomButton>     
            </CustomForm>           
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
