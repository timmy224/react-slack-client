import React from "react";
import "./ChannelChatHeader.css"

function PrivateChatHeader(props){
	const handleClick = () =>{
		// TODO
		// Handle Show Channel Sidebar
	}
	return(
		<div className = "chat-header" >
			<h1>{`# ${props.partnerUsername}`}</h1>
			<button 
			type="button" 
            className="btn btn-light custom-button">
            {/*onClick={this.handleClick}>*/}
            {`${props.numberOfUsers} members`}
            </button>
		</div>
	);
}

export default PrivateChatHeader;