import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (messageService) {
    const initChat = () => async (dispatch, getState) => {
        const channel_id = getState().channel.channel_id;
        await dispatch(fetchMessagesChannel(channel_id));
    };
    
    const receivedMessage = actionCreator(types.MESSAGE_RECEIVED);
    const messageReceived = (message) => (dispatch) => {
        dispatch(receivedMessage(message))
    };

    const fetchChannelMessages = actionCreator(types.FETCH_CHANNEL_MESSAGES);
    const fetchMessagesChannel = (channel_id) => async (dispatch) => {
        const channelMessages = await messageService.fetchChannelMessages(channel_id);
        dispatch(fetchChannelMessages(channelMessages));
    };

    const fetchMessagesPrivate = actionCreator(types.FETCH_PRIVATE_MESSAGES);
    const fetchPrivateMessages = partnerUsername => async (dispatch, getState) => {
        const ourUsername = getState().user.username;
        const privateMessages = await messageService.fetchPrivateMessages(ourUsername, partnerUsername);
        dispatch(fetchMessagesPrivate(privateMessages));
    };

    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return { initChat, messageReceived, fetchMessagesChannel, fetchPrivateMessages, updateInput, inputClear };
};

export default initActions;




