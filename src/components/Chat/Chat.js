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
            .subscribe((message) => {
                console.log("Received a message through the observable: ", message);
                this.props.messageReceived(message)
            })
    }

    onEnterPressed = () => {
        let { currentInput, chatType, channel, partnerUsername, username } = this.props;
        const messageType = chatType;
        const messageContent = currentInput;
        const destination = chatType === "channel" ? channel.channel_id : partnerUsername;
        const message = services.chatService.prepareMessage(messageType, messageContent, username, destination);
        services.socketService.send("send-message", message);
    }

    render() {
        // TODO channelMessages prop {object} is undefined when console logging
        //const channel = this.props.channel
        const messages = this.props.messages ? this.props.messages : [];
        //const messages = messages_obj[channel]
        
        // console.log("selected channel:", channel)
        console.log("messages display", messages)

        return (
            <div>
                {/* {messages.map((message) => {
                    return (<Message key={messages.username + messages.content}
                        time={messages.time_sent} usernames={messages.sender} text={messages.content} />);
                })} */}
                {messages.map((message) => {
                    return (<Message key={message.sender.username + message.content}
                        time={message.sent_dt} usernames={message.sender.username} text={message.content} />);
                })}
                <InputMessage
                    onEnter={this.onEnterPressed}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // TODO check if this re runs 
    const mapping = {
        username: state.user.username,
        chatType: state.chat.type,
        partnerUsername: state.chat.partnerUsername,
        channel: state.chat.channel,
        currentInput: state.chat.currentInput,
    }
    const isChannelChat = mapping.chatType === "channel";
    const isPrivateChat = mapping.chatType === "private";
    if (isChannelChat) {
        mapping.messages = state.message.channelMessages[mapping.channel.channel_id];
    } else if (isPrivateChat) {
        mapping.messages = state.message.privateMessages[mapping.partnerUsername];
    }
    return mapping;
}

const mapActionsToProps = {
    messageReceived: actions.message.messageReceived
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
