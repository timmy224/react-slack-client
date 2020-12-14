import React from "react";
import "./Message.css"
import { services } from "../../context";

const RAW_MESSAGE_DT_FORMAT = services.chatService.MESSAGE_DT_FORMAT;
const DISPLAY_MESSAGE_DT_FORMAT = "h:mm A";

function Message({sent_dt, sender, content}) {
    const dateTime = services.dateTimeService.dt(sent_dt, RAW_MESSAGE_DT_FORMAT);
    const sentDt = services.dateTimeService.str(dateTime, DISPLAY_MESSAGE_DT_FORMAT);
    return (
        <div className="message">
            <div className="message-left">
                <div className="avatar">{sender[0].toUpperCase()}</div>
            </div>
            <div className="message-right">
                <div className="message-sender">
                    {sender}
                </div>
                <div className="message-timestamp">
                    / {sentDt} /
                </div>
                <br />
                <div className="message-content">
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Message;
