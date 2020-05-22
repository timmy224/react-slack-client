import React, { Component } from 'react';

class InputMessage extends Component {
	handleKeyPressed = event => {
  		if (event.key === "Enter") {
  			this.props.onEnter(event.target.value)
  		}
	}	

	render(){
		return(
			<textarea
				placeholder='Write a comment'
				className= "bg-light-gray dib br3 pa2 ma3 w-90 h4"
				style={{resize:'none'}}
				onKeyPress={this.handleKeyPressed}
			/>
			)
	}
}


export default InputMessage;