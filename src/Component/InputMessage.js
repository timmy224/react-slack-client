import React, { Component } from 'react';

class InputMessage extends Component {
	state = {
		message: ""
	}

	handleChange = (event) => {
        this.setState({
			message: event.target.value
		});
    }

	handleKeyPressed = event => {
		if (event.key === "Enter") {
			const validMessage = this.state.message;
			if (validMessage) {
				this.props.onEnter(validMessage);
				this.setState({
					message: ""
				});
			}
		}
	}	

	render(){
		return(
			<textarea
				placeholder='Write a comment'
				className= "bg-light-gray dib br3 pa2 ma3 w-90 h4"
				style={{resize:'none'}}
				value={this.state.message}
				onChange={this.handleChange}
				onKeyPress={this.handleKeyPressed}
			/>
			)
	}
}


export default InputMessage;