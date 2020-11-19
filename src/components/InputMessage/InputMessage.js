import React, {Component} from "react";
import {connect} from "react-redux";
import {actions} from "../../context";
import "./InputMessage.css";

const mapStateToProps = (state) => {
	return {
		currentInput: state.chat.currentInput,
	};
};

const mapActionsToProps = {
	updateInput: actions.chat.updateInput,
	inputClear: actions.chat.inputClear,
};

class InputMessage extends Component {
	handleChange = (event) => {
		this.props.updateInput(event.target.value);
	};

	handleKeyPressed = (event) => {
		if (event.key === "Enter") {
			const validMessage = this.props.currentInput;

			if (validMessage) {
				this.props.onEnter();
				this.props.inputClear();
			}
		}
	};

	render() {
		return (
			<div className="text-center mt-3 rounded input-outer">
				<textarea
					placeholder="Enter a message"
					className="form-control form-control-lg"
					style={{resize: "none"}}
					value={this.props.currentInput}
					onChange={this.handleChange}
					onKeyPress={this.handleKeyPressed}
					type="text"
					rows="1"
				/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapActionsToProps)(InputMessage);
