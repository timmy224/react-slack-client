import React, { Component } from "react";
import { connect } from "react-redux";
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
import CanView from "../CanView/CanView";
import ChannelChatHeader from "../ChatHeader/ChannelChatHeader.js";
import PrivateChatHeader from "../ChatHeader/PrivateChatHeader.js";
import "./Chat.css"
// Depends on chatService, socketService
import { actions, services } from "../../context";

class Chat extends Component {

    onEnterPressed = () => {
        let { currentInput, chatType, channel, partnerUsername, username } = this.props;
        const messageType = chatType;
        const messageContent = currentInput;
        const destination = chatType === "channel" ? channel.channel_id : partnerUsername;
        const message = services.chatService.prepareMessage(messageType, messageContent, username, destination);
        services.socketService.send("send-message", message);
    }

    render() {
        let { numChannelMembers, channelName, partnerUsername } = this.props
        let messages = this.props.messages ? this.props.messages : [];
        let chatHeader = this.props.chatType === "channel"
            ? <ChannelChatHeader numberOfUsers={numChannelMembers} channelName={channelName} />
            : <PrivateChatHeader partnerUsername={partnerUsername}/>
        return (
            <div className='col-12' id='box-wrapper'>
                <div id="box-first">
                    {chatHeader}
                </div>
                <div className="messages-wrapper" id="box-fill">
                    {messages.map((message) => {
                        return (<Message key={message.sender + message.content}
                            sender={message.sender} content={message.content} sent_dt={message.sent_dt} />);
                    })}
                </div>
                <div id="box-end">
                    <InputMessage
                        onEnter={this.onEnterPressed}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const mapping = {
        username: state.user.username,
        chatType: state.chat.type,
        partnerUsername: state.chat.partnerUsername,
        channel: state.chat.channel,
        currentInput: state.chat.currentInput,
        numChannelMembers: state.channel.numChannelMembers,        
    }
    const isChannelChat = mapping.chatType === "channel";
    const isPrivateChat = mapping.chatType === "private";
    if (isChannelChat) {
        mapping.messages = state.message.channelMessages[mapping.channel.channel_id];
        mapping.channelName = state.chat.channel.name;
    } else if (isPrivateChat) {
        mapping.messages = state.message.privateMessages[mapping.partnerUsername];
    }
    return mapping;
}

const mapActionsToProps = {
    messageReceived: actions.message.messageReceived
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
