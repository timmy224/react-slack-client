import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function(utilityService) {
    const initSidebar = () => async (dispatch, getState) => {
        await Promise.all([
            dispatch(actions.channel.fetchChannels()),
            dispatch(actions.user.fetchUsernames())
        ]);
        // Select default channel
        const channels = getState().channel.channels;
        const channelsExist = channels && !utilityService.isEmpty(channels);
        if (channelsExist) {
            const defaultChannel = utilityService.getFirstProp(channels);
            dispatch(selectChannel(defaultChannel.channel_id));
        }
    }

    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = channelId => (dispatch, getState) => {
        const channels = getState().channel.channels;
        const channel = channels[channelId];
        dispatch(channelSelect(channel));
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

    return { initSidebar, selectChannel, selectUser };
}

export default initActions;