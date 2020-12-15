import React from "react";
import styles from "./ChannelChatHeader.module.css"

function PrivateChatHeader(props){
	const { chatHeader, nameDisplay } = styles
	return(
		<div className={chatHeader} >
			<h1 className={nameDisplay}>{`# ${props.partnerUsername}`}</h1>
		</div>
	);
}

export default PrivateChatHeader;