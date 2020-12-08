import React from "react";
import "./ChannelChatHeader.css";
import CustomButton from '../CustomButton/CustomButton';

function ChannelChatHeader(props){
	return(
		<div className = "chat-header" >
			<h1>{`# ${props.channelName}`}</h1>
			<CustomButton type='submit'>{`${props.numberOfUsers} members`}</CustomButton>
		</div>
	);
}

export default ChannelChatHeader;