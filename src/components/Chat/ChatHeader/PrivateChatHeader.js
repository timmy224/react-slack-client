import React from "react";
import styles from "./ChannelChatHeader.module.css"

function PrivateChatHeader({partnerUsername}){
	const { chatHeader, nameDisplay } = styles
	return(
		<div className={chatHeader} >
			<h1 className={nameDisplay}>{`# ${partnerUsername}`}</h1>
		</div>
	);
}

export default PrivateChatHeader;