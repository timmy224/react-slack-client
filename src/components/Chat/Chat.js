import React from "react";
import { connect } from "react-redux";
import { filter } from 'rxjs/operators';
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
// Depends on chatService, socketService
import { actions, services } from "../../context";

class Chat extends React.Component {
    componentDidMount() {
        services.chatService.getMessages$()
            // .pipe(filter(message => {
            //     /* none of this logic will be necessary once we have a redux map object storing
            //     all received messages (my next task)
            //     */
            //     const isMsgChatTypeMatch = message["type"] === this.props.chatType;
            //     if (isMsgChatTypeMatch) {
            //         const isChannelMessage = message["type"] === "channel";
            //         const isPrivateMessage = message["type"] === "private";
            //         if (isChannelMessage) {
            //             const isChannelMatch = message["channel_id"] === this.props.channelId;
            //             return isChannelMatch;
            //         } else if (isPrivateMessage) {
            //             const isPartnerMatch = message["sender"] === this.props.partnerUsername;
            //             return isPartnerMatch;
            //         }
            //     } else {
            //         return false;
            //     }
            // }))
            .subscribe((message) => {
                console.log("Received a message through the observable: ", message);
                this.props.messageReceived(message)
            })
    }

    onEnterPressed = () => {
        let { currentInput, chatType, channelId, partnerUsername, username } = this.props;
        const messageType = chatType;
        const messageContent = currentInput;
        const destination = chatType === "channel" ? channelId : partnerUsername;
        const message = services.chatService.prepareMessage(messageType, messageContent, username, destination);
        services.socketService.send("send-message", message);
    }

    printProps = () => {
        console.log(this.props)
    }

    render() {
        const messages = this.props.messages ? this.props.messages : [];
        return (
            <div>
                <button onClick={this.printProps}>Print Prop</button>
                {messages.map((message) => {
                    return (<Message key={message.username + message.content}
                        time={message.time_sent} usernames={message.sender} text={message.content} />);
                })}
                <InputMessage
                    onEnter={this.onEnterPressed}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mapping = {
        username: state.user.username,
        chatType: state.chat.type,
        partnerUsername: state.chat.partnerUsername,
        channelId: state.chat.channelId,
        currentInput: state.chat.currentInput,
    }
    const isChannelChat = mapping.chatType === "channel";
    const isPrivateChat = mapping.chatType === "private";
    console.log("Chat.js State is");
    console.log(state);
    if (isChannelChat) {
        mapping.messages = state.message.channelMessages[mapping.channelId];
    } else if (isPrivateChat) {
        mapping.messages = state.message.privateMessages[mapping.partnerUsername];
    }
    return mapping;
}

const mapActionsToProps = {
    messageReceived: actions.message.messageReceived
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
