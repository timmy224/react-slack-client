import types from "./types";
import { actionCreator } from "../utils";

const initActions = function(messageService) {
    const receivedChannelMessage = actionCreator(types.CHANNEL_MESSAGE_RECEIVED);
    const receivedPrivateMessage = actionCreator(types.PRIVATE_MESSAGE_RECEIVED);
    const unreadChannelMessageAlert = actionCreator(types.UNREAD_CHANNEL_MESSAGE_ALERT);
    const unreadPrivateMessageAlert = actionCreator(types.UNREAD_PRIVATE_MESSAGE_ALERT);
    //TODO create private and channel action creator for message read status
    const messageReceived = message => (dispatch, getState) => {
        const isChannelMessage = message["type"] === "channel";
        const isPrivateMessage = message["type"] === "private";
        if (isChannelMessage) {
            const messagePayload = {
                channelId: message["channel_id"],
                message: message
            };
            dispatch(receivedChannelMessage(messagePayload));

            //TODO create new dispatch to store update store's channel alert
            const channelMessageChannelExists = getState().message.channelMessageAlert.hasOwnProperty(messagePayload.channelId);
            const channelMessageChannelState = getState().message.channelMessageAlert.messagePayload.channelId;
            // if channel does not exist OR channel does exist and state is False
            if (!channelMessageChannelExists || (channelMessageChannelExists && !channelMessageChannelState)) {
                const newMessageAlert = (({channelId}) => ({channelId}))(messagePayload);
                dispatch(unreadChannelMessageAlert(newMessageAlert));
            };
        } else if (isPrivateMessage) {
            const ourUsername = getState().user.username;
            const partnerUsername = message["sender"] !== ourUsername ? message["sender"] : message["receiver"];
            const messagePayload = {
                partnerUsername: partnerUsername,
                message: message
            };
            dispatch(receivedPrivateMessage(messagePayload));
            //TODO create new dispatch to store update store's private alert
            const privateMessageChannelExists = getState().message.privateMessageAlert.hasOwnProperty(messagePayload.partnerUsername);
            const privateMessageChannelState = getState().message.privateMessageAlert.messagePayload.partnerUsername;
            // if channel does not exist OR channel does exist and state is False
            if (!privateMessageChannelExists || (privateMessageChannelExists && !privateMessageChannelState)) {
                const newMessageAlert = (({partnerUsername}) => ({partnerUsername}))(messagePayload);
                dispatch(unreadPrivateMessageAlert(newMessageAlert));
            };
        }
    };

    const fetchMessagesChannel = actionCreator(types.FETCH_CHANNEL_MESSAGES);
    const fetchChannelMessages = channelId => async (dispatch) => {
        const messages = await messageService.fetchChannelMessages(channelId);
        const messagesPayload = {
            channelId: channelId,
            messages: messages,
        };
        dispatch(fetchMessagesChannel(messagesPayload));
    };

    const fetchMessagesPrivate = actionCreator(types.FETCH_PRIVATE_MESSAGES);
    const fetchPrivateMessages = partnerUsername => async (dispatch, getState) => {
        const ourUsername = getState().user.username;
        const messages = await messageService.fetchPrivateMessages(ourUsername, partnerUsername);
        const messagesPayload = {
            partnerUsername: partnerUsername,
            messages: messages,
        };
        dispatch(fetchMessagesPrivate(messagesPayload));
    };

    // TODO create types and actions for reading channel and private messages
    const readMessagesChannel = actionCreator(types.READ_MESSAGES_CHANNEL);
    const readChannelMessages = channelId => dispatch => {
        dispatch(readMessagesChannel(channelId));
        // emit socket event to server
        // send last message id in channel
    }

    const readMessagesPrivate = actionCreator(types.READ_MESSAGES_PRIVATE);
    const readPrivateMessages = partnerUsername => dispatch => {
        dispatch(readMessagesPrivate(partnerUsername));
        // emit socket event to server
        // send last message id in private 
    }

    return { 
        messageReceived, 
        initChannelMessagesMap, 
        initPrivateMessagesMap, 
        initChannelMessages,
        fetchChannelMessages, 
        fetchPrivateMessages,
        readChannelMessages,
        readPrivateMessages,
    };
}

export default initActions;
