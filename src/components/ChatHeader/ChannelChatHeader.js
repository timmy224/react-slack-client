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
{/* import styles from "./ChannelChatHeader.module.css"

function ChannelChatHeader({channelName, numUsers}){
	const membersLabel = numUsers > 1 ? "members" : "member";
	const { chatHeader, chatMemberDisplay, nameDisplay } = styles
	return(
		<div className={chatHeader}>
			<h1 className={nameDisplay}>{`# ${channelName}`}</h1>
			<div className={chatMemberDisplay}>{`${numUsers} ${membersLabel}`}</div> */}
		</div>
	);
}

export default ChannelChatHeader;
