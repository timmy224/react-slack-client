import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService, registerService
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username: state.user.username,
        showTakenMsg: state.user.showTakenMsg,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
        password:state.user.password,
        showWrongCred: state.user.showWrongCred
    }
}
const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    takenUsername: actions.user.takenUsername,
    changeRoute: actions.route.changeRoute,
    setPassword: actions.user.setPassword,
    wrongCredentials: actions.user.wrongCredentials,
}

class Register extends Component {
    handleSubmit = (event) => {
        const { username, takenUsername, password, changeRoute, setPassword,setUsername, wrongCredentials, showWrongCred } = this.props

        event.preventDefault();
        setUsername(username)
        setPassword(password)
        wrongCredentials(false)
        takenUsername(false)
        services.registerService.registerUser(username, password).then(ERROR => {
            
            if (ERROR =="Missing username in route")
            {return wrongCredentials(true)}

            else if (ERROR =="Missing password in route")
            {return wrongCredentials(true)}

            else if (ERROR == "Username is taken")
            {return takenUsername(true)}

            else{
                setPassword("")
                changeRoute({path:"/login"})
            }
        });
        
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
        const {showTakenMsg, changeRoute, showWrongCred} = this.props

        const takenMessage = showTakenMsg ? <h3>Username taken, Try another</h3> : null;
        const wrongCred = showWrongCred ?  <h3>Either password or username are missing.</h3> : null;
        return (
            <Fragment>
                <h1>Please Register with a Username and Password</h1>
                {takenMessage}
                {wrongCred}
                <input
                    onChange={this.handleChangeUser}
                    type="text"
                    placeholder="Username"
                />
                <input 
                     onChange={this.handleChangePassword} 
                     type="password"
                     placeholder="Password"
                />
                <input
                 onClick={this.handleSubmit}
                  type="submit"
                  value="register" />
                
                <button
                 onClick = {()=> changeRoute({path:"/login"})}>Login Form
                 </button>      
            
            </Fragment>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Register);
