import React, { Component } from 'react';

const mapStateToProps = state => {
	return {
		input: state.message.message
		
	}
}

const mapActionsToProps = {
}

class InputMessage extends Component {
	handleChange = (event) => {
        this.setState({
			message: event.target.value
		});
    }

	handleKeyPressed = event => {
		if (event.key === "Enter") {
			const validMessage = this.props.message;
			if (validMessage) {
				this.props.onEnter();
				this.props.clearAfterInput
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


export default connect(mapStateToProps, mapActionsToProps)(InputMessage);