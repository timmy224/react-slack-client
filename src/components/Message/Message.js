import React from "react";
//import { connect } from "react-redux";


function Message(props) {
    console.log("messages comp: ", props)

    return (
        <div className="message">
            <div className="message-username">
                {props.usernames} ({props.time}):
      </div>
            <div className="message-text">{props.text}</div>
        </div>
    );
}

export default Message;
