import React from "react";

function Message(props) {
    return (
        <div className="message">
            <div className="message-username">
                {props.sender} ({props.sent_dt}):
      </div>
            <div className="message-text">{props.content}</div>
        </div>
    );
}

export default Message;
