import React from "react";
import "./Message.css"
import { services } from "../../context";

function Message(props) {
    const sentDt = services.dateTimeService.dt(props.sent_dt).format("h:mm A")
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
                    / {sentDt} /
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
