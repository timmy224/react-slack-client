import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function() {
    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = channelId => (dispatch, getState) => {
        const channels = getState().channel.channels;
        const channel = channels[channelId];
        dispatch(channelSelect(channel));
        dispatch(actions.channel.fetchNumberOfUsers(channelId))
        const isMessagesExist = getState().message.channelMessages[channelId].length > 0;
        if (!isMessagesExist) {
            dispatch(actions.message.fetchChannelMessages(channelId));
        } 
    };

    const userSelect = actionCreator(types.USER_SELECT);
    const selectUser = selectedUsername => (dispatch, getState) => {
        dispatch(userSelect(selectedUsername));
        const isMessagesExist = getState().message.privateMessages[selectedUsername].length > 0;
        if (!isMessagesExist) {
            dispatch(actions.message.fetchPrivateMessages(selectedUsername));
        }
    };

    return { selectChannel, selectUser };
}

export default initActions;