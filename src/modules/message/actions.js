import types from "./types";
import { actionCreator } from "../utils";


const initActions = function (channelService) {
    
    const receivedMessage = actionCreator(types.MESSAGE_RECEIVED)
    const fetchChannelMessages = actionCreator(types.FETCH_CHANNEL_MESSAGES);
    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const clearInput = actionCreator(types.CLEAR_INPUT);
    
    const messageReceived = (message) => (dispatch) => {
        dispatch(receivedMessage(message))
    };

    const fetchMessagesChannel = (channel_id) => async (dispatch) => {
        const channelMessages = await channelService.fetchMessagesChannel(channel_id);
        dispatch(fetchChannelMessages(channelMessages));
    };

    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return {messageReceived, fetchMessagesChannel, updateInput, inputClear};
};

export default initActions;




