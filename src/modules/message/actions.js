import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";

const initActions = function(messageService) {
    const receivedChannelMessage = actionCreator(types.CHANNEL_MESSAGE_RECEIVED);
    const receivedPrivateMessage = actionCreator(types.PRIVATE_MESSAGE_RECEIVED);
    const messageReceived = message => (dispatch, getState) => {
        const isChannelMessage = message["type"] === "channel";
        const isPrivateMessage = message["type"] === "private";
        if (isChannelMessage) {
            const messagePayload = {
                channelId: message["channel_id"],
                message: message
            };
            dispatch(receivedChannelMessage(messagePayload));
        } else if (isPrivateMessage) {
            const ourUsername = getState().user.username;
            const partnerUsername = message["sender"] !== ourUsername ? message["sender"] : message["receiver"];
            const messagePayload = {
                partnerUsername: partnerUsername,
                message: message
            };
            dispatch(receivedPrivateMessage(messagePayload));
        }
    };

    const initMessagesChannelMap = actionCreator(types.INIT_CHANNEL_MESSAGES_MAP);
    const initChannelMessagesMap = channelIds => (dispatch) => {
        dispatch(initMessagesChannelMap({channelIds: channelIds}))
    };

    const initMessagesPrivateMap = actionCreator(types.INIT_PRIVATE_MESSAGES_MAP);
    const initPrivateMessagesMap = usernames => (dispatch) => {
        dispatch(initMessagesPrivateMap({usernames: usernames}));
    };

    const initMessagesChannel = actionCreator(types.INIT_CHANNEL_MESSAGES);
    const initChannelMessages = channelId => (dispatch) => {
        dispatch(initMessagesChannel({channelId: channelId}));
    };

    const fetchMessagesChannel = actionCreator(types.FETCH_CHANNEL_MESSAGES);
    const fetchChannelMessages = channelId => async (dispatch) => {
        const [err, messages] = await to(messageService.fetchChannelMessages(channelId));
        if (err) {
            throw new Error("Could not fetch channel messages");
        }
        const messagesPayload = {
            channelId: channelId,
            messages: messages,
        };
        dispatch(fetchMessagesChannel(messagesPayload));   
    };

    const fetchMessagesPrivate = actionCreator(types.FETCH_PRIVATE_MESSAGES);
    const fetchPrivateMessages = partnerUsername => async (dispatch, getState) => {
        const ourUsername = getState().user.username;
        const [err, messages] = await to(messageService.fetchPrivateMessages(ourUsername, partnerUsername));
        if (err) {
            throw new Error("Could not fetch private messages");
        }
        const messagesPayload = {
            partnerUsername: partnerUsername,
            messages: messages,
        };
        dispatch(fetchMessagesPrivate(messagesPayload));
    };

    return { 
        messageReceived, 
        initChannelMessagesMap, 
        initPrivateMessagesMap, 
        initChannelMessages,
        fetchChannelMessages, 
        fetchPrivateMessages,
    };
}

export default initActions;
