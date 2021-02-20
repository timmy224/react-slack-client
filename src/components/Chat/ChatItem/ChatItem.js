import React from "react";
import Message from "./Message/Message";
import DateSeparator from "./DateSeparator/DateSeparator";

function ChatItem({item}) {
    switch (item.itemType) {
        case "message":
            const message = item;
            return (
                <Message 
                    sender={message.sender} 
                    content={message.content} 
                    sentDt={message.sent_dt} />

            )
        case "date-separator":
            const dateSeparator = item;
            return <DateSeparator dateStr={dateSeparator.dateStr} />

        case "new-message-separator":
            const newMessageSeparator = item;
            return <NewMessageSeparator dateStr={newMessageSeparator.datestr} />
        default:
    }

}

export default ChatItem;