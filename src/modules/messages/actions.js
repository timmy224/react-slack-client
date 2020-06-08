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
            dispath(receivedPrivateMessage(messagePayload));
        }
    };

    const fetchMessagesChannel = actionCreator(types.FETCH_CHANNEL_MESSAGES);
    const fetchChannelMessages = channel_id => async (dispatch) => {
        const channelMessages = await messageService.fetchChannelMessages(channel_id);
        dispatch(fetchMessagesChannel(channelMessages));
    };

    const fetchMessagesPrivate = actionCreator(types.FETCH_PRIVATE_MESSAGES);
    const fetchPrivateMessages = partnerUsername => async (dispatch, getState) => {
        const ourUsername = getState().user.username;
        const privateMessages = await messageService.fetchPrivateMessages(ourUsername, partnerUsername);
        dispatch(fetchMessagesPrivate(privateMessages));
    };

    return { messageReceived, fetchChannelMessages, fetchPrivateMessages };
}

export default initActions;
