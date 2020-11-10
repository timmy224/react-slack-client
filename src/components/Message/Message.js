import React from "react";
import "./Message.css"

function Message(props) {
    return (
        <div className="message">
            <div className="message-left">
                <div className="avatar">{props.sender[0].toUpperCase()}</div>
            </div>
            <div className="message-right">
                <div className="message-sender">
                    {props.sender}
                </div>
                <div className="message-timestamp">
                    / {props.sent_dt} /
                </div>
                <br />
                <div className="message-content">
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Message;
