import React from "react";

function ChannelChatHeader(props){
	const handleClick = () =>{
		// TODO
		// Handle Show Channel Sidebar
	}
	return(
		<div className = "container text-center mt-3 rounded" style={{border:'2px solid gray'}}>
			<p>This is a Channel Chat Header</p>
			<button 
			type="button" 
            class="btn btn-light m-1">
            {/*onClick={this.handleClick}>*/}
            {`${props.numberOfUsers} members`}
            </button>
		</div>
	);
}

export default ChannelChatHeader;