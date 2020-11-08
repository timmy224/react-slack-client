import React, { Component } from "react";
import { connect } from "react-redux";
import { filter } from 'rxjs/operators';
import InputMessage from "../InputMessage/InputMessage";
import Message from "../Message/Message";
import CanView from "../CanView/CanView";
import ChannelChatHeader from "../ChatHeader/ChannelChatHeader.js";
import PrivateChatHeader from "../ChatHeader/PrivateChatHeader.js";
// Depends on chatService, socketService
import { actions, services } from "../../context";
import "./Chat.css";

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
        let { numChannelMembers, channelName } = this.props
        let messages = this.props.messages ? this.props.messages : [];
        let chatHeader = this.props.chatType === "channel" 
                                                ? <ChannelChatHeader numberOfUsers={numChannelMembers} channelName={channelName}/> 
                                                : <PrivateChatHeader />
        return (
            <div id="box-wrapper">
                <CanView
                    resource="channel-member"
                    action="add"
                    yes={() => <p>User can add channel members</p>}
                    no={() => <p>User cannot add channel members</p>}
                />
                <div id="box-start">
                    {chatHeader}
                </div>
                
                <div id="box-fill">
                        {messages.map((message) => {
                            return (<Message key={message.sender + message.content}
                                sender={message.sender} content={message.content} sent_dt={message.sent_dt} />);
                        })}
                </div>
                <div id='box-end'>
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
        channelName: state.channel.channel_name,
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
