import React from "react";
import "./ChannelChatHeader.css";
import CustomButton from '../CustomButton/CustomButton';

function ChannelChatHeader({channelName, numOfUsers}){
	const isPlural = numOfUsers > 1
	return(
		<div className = "chat-header" >
			<h1>{`# ${channelName}`}</h1>
			<div className="chat-member-display">{`${isPlural ? `${numOfUsers} members` : `${numOfUsers} member`}`}</div>
		</div>
	);
}

export default ChannelChatHeader;