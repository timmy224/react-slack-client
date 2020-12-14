import React from "react";
import styles from "./ChannelChatHeader.module.css"

function ChannelChatHeader({channelName, numUsers}){
	const membersLabel = numUsers > 1 ? "members" : "member";
	const { chatHeader, chatMemberDisplay } = styles
	return(
		<div className={chatHeader}>
			<h1>{`# ${channelName}`}</h1>
			<div className={chatMemberDisplay}>{`${numUsers} ${membersLabel}`}</div>
		</div>
	);
}

export default ChannelChatHeader;