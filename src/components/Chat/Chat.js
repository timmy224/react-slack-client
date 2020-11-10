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
        let { numChannelMembers, channelName, showChannelSideBar, toggleChannelSideBar } = this.props
        let messages = this.props.messages ? this.props.messages : [];
        let chatHeader = this.props.chatType === "channel" 
                                                ? <ChannelChatHeader
                                                 numberOfUsers={numChannelMembers}
                                                 channelName={channelName}
                                                 showChannelSideBar={showChannelSideBar}
                                                 toggleChannelSideBar= {toggleChannelSideBar}
                                                /> 
                                                : <PrivateChatHeader />
        return (
            <div>
                <CanView
                    resource="channel-member"
                    action="add"
                    yes={() => <p>User can add channel members</p>}
                    no={() => <p>User cannot add channel members</p>}
                />
                {chatHeader}
                <div>
                    {messages.map((message) => {
                        return (<Message key={message.sender + message.content}
                            sender={message.sender} content={message.content} sent_dt={message.sent_dt} />);
                    })}
                </div>
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
        channel: state.chat.channel,
        currentInput: state.chat.currentInput,
        numChannelMembers: state.channel.numChannelMembers,
        channelName: state.channel.channel_name,
        showChannelSideBar: state.channel.showChannelSideBar,
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
    messageReceived: actions.message.messageReceived,
    toggleChannelSideBar: actions.channel.toggleChannelSideBar,
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
