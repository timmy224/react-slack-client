import React, { Fragment } from 'react';
import { connect } from "react-redux";
// Depends on userService, storageService, socketService, registerService
import { services } from "../../context";
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
    setUsername: actions.user.setUsername,
    takenUsername: actions.user.takenUsername,
    changeRoute: actions.route.changeRoute,
    setPassword: actions.user.setPassword
}

class Register extends React.Component {
    handleSubmit = (event) => {
        const { username, takenUsername, password, changeRoute, setPassword,setUsername } = this.props
        console.log('username is:', username)
        console.log ("password is:" , password)

        event.preventDefault();
        services.userService.checkUsername(username).then(isAvailable => {
            if (isAvailable) {
                setUsername(username)
                setPassword(password)
                services.registerService.registerUser(username, password);
                setPassword("")
                changeRoute({path:"/login"})
            } else {
                takenUsername(true);
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
        const {showTakenMsg, changeRoute} = this.props

        const takenMessage = showTakenMsg ? <h3>Username taken, Try another</h3> : null;
        return (
            <Fragment>
                console.log("delete this later...")
                <h1>Please Register with a Username and Password</h1>
                {takenMessage}
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


  // <form onSubmit= {this.handleSubmitPassword}>
                //     <input 
                //     onChange={this.handleChangePassword} 
                //     />
                //     <button type='submit'>Submit!</button>
                // </form>
                // <button
                //  onClick = {changeRoute({path:"/login"})}>Login Form
                //  </button> 
               