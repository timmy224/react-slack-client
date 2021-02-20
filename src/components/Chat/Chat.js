import React, { Component } from "react";
import { connect } from "react-redux";
import InputMessage from "./InputMessage/InputMessage";
import ChatItem from "./ChatItem/ChatItem";
import ChannelChatHeader from "./ChatHeader/ChannelChatHeader.js";
import PrivateChatHeader from "./ChatHeader/PrivateChatHeader.js";
import styles from "./Chat.module.css"
import { actions, services } from "../../context";
import { ReactComponent } from "*.svg";

class Chat extends Component {
    // NOTE: look into document ref for doc event handler in React docs
    pageVisibility = () => {
        let hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
          hidden = "hidden";
          //visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
          hidden = "msHidden";
          //visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
          hidden = "webkitHidden";
          //visibilityChange = "webkitvisibilitychange";
        }
        return { hidden };
        //return { hidden, visibilityChange };
    }

    handleVisibilityChange(prevProps) {
        let hidden = this.pageVisibility();
        if (!document[hidden]) {
            let { chatType, org, channel, partnerUsername, messages } = this.props;
            let { readStatusChannel, readStatusPrivate } = this.props;
            switch (chatType) {
                case "channel":
                    let channelMessages = messages[org.name].channel[channelName];
                    let recentChannelMessageDt = channelMessages[channelMessages.length -1].sentDt
                    if (readStatusChannel[channel.name] !== recentChannelMessageDt) {
                        // update readStatus for channel in reducer
                        this.props.setReadStatusChannel(channel.name, recentChannelMessageDt)
                        // socket event update
                        let readStatus = services.readStatusService.prepareReadStatus(
                            chatType, org.name, channel.name, recentChannelMessageDt
                        );
                        this.props.sendReadStatus(readStatus);
                        this.props.updateChannelStatus(channel.name, false);
                    } 
                    break;
                case "private": 
                    let privateMessages = messages[orgName].private[partnerUsername]
                    let recentPrivateMessageDt = privateMessages[privateMessages.length -1].sendDt
                    if (readStatusPrivate[partnerUsername] !== recentPrivateMessageDt) {
                        // update readStatus for private message in reducer
                        this.props.setReadStatusPrivate(partnerUsername, recentPrivateMessageDt)
                        // socket event update
                        let readStatus = services.readStatusService.prepareReadStatus(
                            chatType, org.name, partnerUsername, recentPrivateMessageDt
                        );
                        this.props.sendReadStatus(readStatus);
                        this.props.updatePrivateStatus(partnerUsername, false);
                    }
                default:
                    break;
            }
        }
    }

    componentDidUpdate(prevProps) {
        this.handleVisibilityChange(prevProps);
    }

    componentDidMount() {
        window.onScroll = () => {
            if (window.pageYOffset === 0) {
                // NOTE insert fetch previous messages function here
            }
        };
    }

    componentWillUnmount() {
        window.onScroll = null;
    }

    /* TODO
    ### Update reducer with lodash set path

    ### HTML conditional - chatItem element
    1. Insert chat element in messages mapping - DONE
    2. Create New Message Line Component
    3. Tie selected a diff channel/user in sidebar to remove new message line
    */

    onEnterPressed = () => {
        let { currentInput, chatType, channel, partnerUsername, username, org } = this.props;
        const messageType = chatType;
        const messageContent = currentInput;
        const destination = chatType === "channel" ? channel.name : partnerUsername;
        const message = services.chatService.prepareMessage(messageType, messageContent, username, destination, org.name);
        
        this.props.sendMessage(message);
    }

    fetchPreviousMessages = () => {
        const { chatType, channel, partnerUsername, messages, fetchPrevChannelMessages, fetchPrevPrivateMessages } = this.props;
        const beforeDateTime = messages[0].sent_dt;
        switch (chatType) {
            case "channel":                
                fetchPrevChannelMessages(channel.name, beforeDateTime);
                break;
            case "private":
                fetchPrevPrivateMessages(partnerUsername, beforeDateTime);
                break;
            default:
        }
    }

    lastReadDt(chatType, chatName) {
        const { readStatusChannel, readStatusPrivate } = this.props;
        let lastReadDt = null;
        if (chatType == "channel") {
            lastReadDt = readStatusChannel[chatName];
        } else if (chatType == "private") {
            lastReadDt = readStatusPrivate[chatName];
        }
        return lastReadDt;
    }

    // refactor Konrad's code for dateSeparator to accomodate for newMessageLine
    newMessageChatSeparator(dateTime) {
        const newMessageSeparatorItem = {
            itemType: "new-message-separator",
            dateTime, 
            key: dateTime
        }
        return newMessageSeparatorItem;
    }

    createChatItems(messages) {
        const chatItems = []
        const { dateTimeService }  = services;
        const messageMap = this.createMessageChatItemMap(messages);
        Object.entries(messageMap).forEach(entry => {
            const [dateKey, messageChatItems] = entry;
            const dateStr = dateTimeService.str(dateTimeService.dt(dateKey, "YYYY/MM/DD"), "dddd, MMMM Do");            
            const dateSeparatorChatItem = {
                itemType: "date-separator",
                dateStr,
                key: dateStr
            };
            chatItems.push(dateSeparatorChatItem);
            chatItems.push(...messageChatItems);
        });
        return chatItems;
    }

    createMessageChatItemMap(messages, chatType, chatName) {
        const { dateTimeService, chatService } = services;
        let newMessageSeparatorInserted = false;
        const lastReadDt = this.lastReadDt(chatType, chatName);
        const messageMap = messages
        .map(message => ({ itemType: "message", ...message, key: message.sender + message.sent_dt}))
        .reduce((acc, messageChatItem) => {
            const sentDt = dateTimeService.dt(messageChatItem.sent_dt, chatService.MESSAGE_DT_FORMAT);
            const key = dateTimeService.str(sentDt, "YYYY/MM/DD");
            if (!acc[key]) {
                acc[key] = [];
            }
            if (!newMessageSeparatorInserted && messageChatItem.sentdt == lastReadDt) {
                let newMessageSeparatorItem = this.newMessageChatSeparator(lastReadDt);
                acc[key].push(newMessageSeparatorItem);
            }
            acc[key].push(messageChatItem);
            return acc;
        }, {});
        return messageMap;
    }

    render() {
        let { chatType, channel, partnerUsername } = this.props;
        const { messagesWrapper, ctaCreateChannel, chat, boxFirst, boxFill, boxEnd } = styles;
        const canDisplay = (chatType === "channel" && channel !== null) || (chatType === "private" && partnerUsername !== null);
        if (canDisplay) {
            let messages = this.props.messages ? this.props.messages : [];
            let chatHeader = this.props.chatType === "channel"
                ? <ChannelChatHeader numUsers={channel.members.length} channelName={channel.name} />
                : <PrivateChatHeader partnerUsername={partnerUsername}/>
            const chatItems = this.createChatItems(messages);
            return (
                <div className={chat}>
                        <div className={boxFirst}>
                            {chatHeader}
                        </div>
                        <div className={`${messagesWrapper} ${boxFill}`}>
                            {chatItems.map(item => <ChatItem item={item} key={item.key} />)}
                        </div>
                        <div className={boxEnd}>
                            <InputMessage
                                onEnter={this.onEnterPressed}
                            />
                            <button onClick={this.fetchPreviousMessages}>Fetch previous messages</button>
                        </div>
                    </div>
            );
        } else {
            return(
                <h1 className={ctaCreateChannel}>Create a Channel to get started!</h1>
            )
        }
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
        readStatusPrivate: state.readStatus.statusPrivate,
        readStatusChannel: state.readStatus.statusChannel
    }
    const { chatType, channel, partnerUsername } = mapping;
    const orgName = mapping.org?.name;
    switch (chatType) {
        case "channel":
            if (channel) {
                const channelName = channel.name;
                mapping.messages = state.message.messages[orgName]?.channel?.[channelName];
            }            
            break;
        case "private":
            mapping.messages = state.message.messages[orgName]?.private?.[partnerUsername];
            break;
        default:
            break;
    }
    return mapping;
}

const mapActionsToProps = {
    sendMessage: actions.message.sendMessage,
    messageReceived: actions.message.messageReceived,
    fetchPrevChannelMessages: actions.message.fetchPrevChannelMessages,
    fetchPrevPrivateMessages: actions.message.fetchPrevPrivateMessages,
    setReadStatusChannel: actions.readStatus.readStatusSetChannel,
    setReadStatusPrivate: actions.readStatus.readStatusSetPrivate,
    sendReadStatus: actions.readStatus.sendReadStatus,
    updateChannelStatus: actions.sidebar.updateChannelStatus,
    updateprivateStatus: actions.sidebar.updatePrivateStatus,
}

export default connect(mapStateToProps, mapActionsToProps)(Chat);
