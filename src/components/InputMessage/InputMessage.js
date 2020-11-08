import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import "./inputMessage.css"
//import Picker from 'react-emojipicker';

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
	logEmoji (emoji) {
		console.log(emoji)
		}

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
			<div className="input-outer">
				<textarea 
					placeholder='Enter a message'
					className= "form-control form-control-lg input-inner"
					style={{resize:'none'}}
					value={this.props.currentInput}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPressed}
					type="text"
				/>
			</div>
			)
	}
}


export default connect(mapStateToProps, mapActionsToProps)(InputMessage);