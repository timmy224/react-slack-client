import React from 'react';
// import './App.css';
//import * as UserService from "../services/user-service"
//import * as StorageService from "../services/storage-service"
//import * as APIService from "../services/API-service"

class EnterUsername extends React.Component {
    state = {
        input: 'child input',
        submit: "child submit"
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submit: this.state.input
        });
        //let response = "valid";
        // if (APIService.checkUsername(this.state.username)) {
        //     response = "Valid Username"
        //     let username = this.state.submit
        //     this.props.username(username) // sets parent prop username 
        //     UserService.setUsername(username)
        //     StorageService.store("username", username)
        //     UserService.joinChat(username)
        //          // route to Alert User Component
        //          // route to Chat Component 
        // } else {
        //     response = <p>Please pick another username</p>
        // }
    }

    render() {
        
    
        return (
            <form onSubmit={this.handleSubmit}>
                {/* response */}
                {
                    (this.props.username)
                }
                <input
                    value={this.state.input}
                    onChange={this.handleChange} />
                <button type='submit'>Submit!</button>
            </form>
        )
    }
}

export default EnterUsername