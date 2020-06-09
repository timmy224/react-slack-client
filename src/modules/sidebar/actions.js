import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function() {
    const initSidebar = () => async (dispatch, getState) => {
        await Promise.all([
            dispatch(actions.channel.fetchChannelIDs()),
            dispatch(actions.user.fetchUsernames())
        ]);
        const channels = getState().channel.channels;
        if (channels && channels.length > 0) {
            const channelId = channels[0];
            dispatch(selectChannel(channelId));
        }
    }

    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = channelId => (dispatch, getState) => {
        dispatch(channelSelect(channelId));
        const existingMessages = getState().message.channelMessages[channelId];
        if (!existingMessages) {
            dispatch(actions.message.fetchChannelMessages(channelId));
        }
    };

    const userSelect = actionCreator(types.USER_SELECT);
    const selectUser = selectedUsername => (dispatch, getState) => {
        dispatch(userSelect(selectedUsername));
        const existingMessages = getState().message.privateMessages[selectedUsername];
        if (!existingMessages) {
            dispatch(actions.message.fetchPrivateMessages(selectedUsername));
        }
    };

    return { initSidebar, selectChannel, selectUser };
}

export default initActions;