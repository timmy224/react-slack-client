import React from "react";
import styles from "./ChannelChatHeader.module.css"

function ChannelChatHeader({channelName, numOfUsers}){
	const isPlural = numOfUsers > 1
	const { chatHeader, chatMemberDisplay } = styles
	return(
		<div className={ chatHeader }>
			<h1>{`# ${channelName}`}</h1>
			<div className={ chatMemberDisplay }>{`${isPlural ? `${numOfUsers} members` : `${numOfUsers} member`}`}</div>
		</div>
	);
}

export default ChannelChatHeader;