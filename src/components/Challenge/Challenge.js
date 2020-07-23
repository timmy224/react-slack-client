import React, { Fragment, Component } from 'react';
import { connect } from "react-redux";
import { services } from "../../context";
import { actions } from "../../context";

const mapStateToProps = (state)=>{
    return { 
        username: state.user.username,
        name: state.user.name,
        email: state.user.email,
        routePath: state.route.routePath,
        routeState: state.route.routeState,
    }
}
const mapActionsToProps = {
    setUsername: actions.user.setUsername,
    setName: actions.user.setName,
    setEmail: actions.user.setEmail,
    changeRoute: actions.route.changeRoute,
}

class Challenge extends Component {
    handleSubmit = (event) => {
        const { username,  setUsername, name, setName, email, setEmail, changeRoute } = this.props

        event.preventDefault();
        setUsername(username)
        setEmail(email)
        setUsername(name)
      services.challengeService.ChallengeUser(name, username, email)
        console.log("this has set all parameters")
        changeRoute({path:"/login"})
    }

    handleChangeUser = (event) => {
        let username = event.target.value
        return this.props.setUsername(username)

    }
    handleChangeEmail = (event) => {
        let email = event.target.value
        return this.props.setEmail(email)
    }
    handleChangeName = (event) => {
        let name = event.target.value
        return this.props.setName(name)
    }
    render() {
        return (
            <Fragment>
                <h1>Please Enter a Name, Username and Email</h1>
                <input
                    onChange={this.handleChangeName}
                    type="text"
                    placeholder="Name"
                />
                <input
                    onChange={this.handleChangeUser}
                    type="text"
                    placeholder="Username"
                />
                <input 
                     onChange={this.handleChangeEmail} 
                     type="email"
                     placeholder="email"
                />
                <input
                 onClick={this.handleSubmit}
                  type="submit"
                  value="Submit" />   
            
            </Fragment>            
        );
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Challenge);
