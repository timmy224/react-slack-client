import React, { Component } from "react";

class Challenge2 extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          username: "",
          email: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        const data = this.state

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }

        fetch("http://localhost:5000/challenge2-form/", options)
        console.log("Dataaaaa", options)

        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={this.state.Name}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={this.state.Username}
                    onChange={this.handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    value={this.state.Email}
                    onChange={this.handleChange}
                    required
                />
                <input type="submit"></input>
            </form>
        )
    }
}

export default Challenge2;
