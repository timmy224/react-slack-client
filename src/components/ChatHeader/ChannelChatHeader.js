import React from "react";
import "./ChannelChatHeader.css"

function ChannelChatHeader(props) {
	return (
		<div className="chat-header" >
			<h1>{`# ${props.channelName}`}</h1>
			<button
				type="button"
				className="btn btn-light custom-button">
				{`${props.numberOfUsers} members`}
			</button>
		</div>
	);
}

export default ChannelChatHeader;