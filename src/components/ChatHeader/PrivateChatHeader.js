import React from "react";
import "./ChannelChatHeader.css"

function PrivateChatHeader(props){
	return(
		<div className = "chat-header" >
			<h1>{`# ${props.partnerUsername}`}</h1>
		</div>
	);
}

export default PrivateChatHeader;