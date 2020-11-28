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
        let { currentInput, chatType, channel, partnerUsername, username, org } = this.props;
        const messageType = chatType;
        const messageContent = currentInput;
        const destination = chatType === "channel" ? channel.name : partnerUsername;
        const message = services.chatService.prepareMessage(messageType, messageContent, username, destination, org.name);
        this.props.sendMessage(message);
    }


    render() {
        let { channel, partnerUsername } = this.props
        let messages = this.props.messages ? this.props.messages : [];
        let chatHeader = this.props.chatType === "channel"
            ? <ChannelChatHeader numberOfUsers={channel.members.length} channelName={channel.name} />
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
        org: state.org.org,        
    }
    const { chatType, channel, partnerUsername } = mapping;
    const orgName = mapping.org?.name;
    switch (chatType) {
        case "channel":
            const channelName = channel.name;
            mapping.messages = state.message.messages[orgName]?.channel?.[channelName];
            break;
        case "private":
            mapping.messages = state.message.messages[orgName]?.private?.[partnerUsername];
            break;
    }
    return mapping;
}

const mapActionsToProps = {
    sendMessage: actions.message.sendMessage,
    messageReceived: actions.message.messageReceived,
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
