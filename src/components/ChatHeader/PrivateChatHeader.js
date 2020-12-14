import React from "react";
import styles from "./ChannelChatHeader.module.css"

function PrivateChatHeader(props){
	const { chatHeader } = styles
	return(
		<div className={chatHeader} >
			<h1>{`# ${props.partnerUsername}`}</h1>
		</div>
	);
}

export default PrivateChatHeader;