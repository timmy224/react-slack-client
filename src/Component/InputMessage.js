import React, { Component } from 'react';

class InputMessage extends Component {
	state = {
		message: ""
	}

	handleKeyPressed = event => {
		console.log("key pressed: ", event.target.value);
		this.setState({
			message: event.target.value
		});
  		if (event.key === "Enter") {
			  this.props.onEnter(event.target.value);
			  this.setState({
				  message: ""
			  });
  		}
	}	

	render(){
		return(
			<textarea
				placeholder='Write a comment'
				className= "bg-light-gray dib br3 pa2 ma3 w-90 h4"
				style={{resize:'none'}}
				value={this.state.message}
				onChange={this.handleKeyPressed}
			/>
			)
	}
}


export default InputMessage;