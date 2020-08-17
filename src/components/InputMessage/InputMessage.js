import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";

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
			<div class="container text-center mt-3 rounded">
				<textarea
					placeholder='Enter a message'
					className= "form-control form-control-lg"
					style={{resize:'none'}}
					value={this.props.currentInput}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPressed}
				/>
			</div>
			)
	}
}


export default connect(mapStateToProps, mapActionsToProps)(InputMessage);