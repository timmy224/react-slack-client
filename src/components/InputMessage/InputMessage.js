import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { actions } from "../../context";
import "./inputMessage.css"
import { Editor } from '@tinymce/tinymce-react'
import {apiKey} from '../../sensitive'

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
	handleEditorChange = (content, editor) => {
		this.props.updateInput(content);
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
					rows="2"
				/>
				{/* <Editor
					apiKey={apiKey}
					init={{
						content_css: 'tinymce.css',
						value: this.props.currentInput,
						height: 100,
						menubar: false,
						statusbar: false,
						plugins: [
							'advlist autolink lists link image charmap print preview anchor',
							'searchreplace visualblocks code fullscreen',
							'insertdatetime media table paste code help wordcount emoticons',
						],
						toolbar:
							'bold italic strikethrough code link \
							numlist bullist blockquote emoticons',
						toolbar_location: "bottom",
					}}
					onEditorChange={this.handleEditorChange}
				/> */}
			</div>
			)
	}
}


export default connect(mapStateToProps, mapActionsToProps)(InputMessage);