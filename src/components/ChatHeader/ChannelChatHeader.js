import React from "react";
import "./ChannelChatHeader.css";

function ChannelChatHeader(props) {
	let {
		showChannelSideBar,
		toggleChannelSideBar,
		channelName,
		numberOfUsers,
	} = props;
	let toggleButton = true;

	const handleClick = (event) => {
		showChannelSideBar = !showChannelSideBar;
		toggleChannelSideBar(event);
	};

	return (
		<div className="chat-header">
			<h1>{`# ${channelName}`}</h1>
			<button
				type="button"
				className="btn btn-light custom-button"
				onClick={() => handleClick(showChannelSideBar)}
			>
				{`${numberOfUsers} members`}
			</button>
		</div>
	);
}

export default ChannelChatHeader;
