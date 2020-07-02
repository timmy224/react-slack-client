import React, { Component } from "react";
import { connect } from "react-redux";
import { actions, services } from "../../context";

const mapStateToProps = state => {
	return {
		currentInput: state.chat.currentInput	
	};
};

const mapActionsToProps = {
	updateInput: actions.chat.updateInput,
	inputClear: actions.chat.inputClear,
};



class InputMessage extends Component {
	handleChange = (event) => {
		this.props.updateInput(event.target.value);
    }

	handleKeyPressed = event => {
		if (event.key === "Enter") {
			const validMessage = this.props.currentInput;

			if (validMessage) {
				this.props.onEnter();
				this.props.inputClear();
			}
		}
	}	

	render(){
		return(
			<textarea
				placeholder='Write a comment'
				className= "bg-light-gray dib br3 pa2 ma3 w-90 h4"
				style={{resize:'none'}}
				value={this.props.currentInput}
				onChange={this.handleChange}
				onKeyPress={this.handleKeyPressed}
			/>
			)
	}
}


export default connect(mapStateToProps, mapActionsToProps)(InputMessage);