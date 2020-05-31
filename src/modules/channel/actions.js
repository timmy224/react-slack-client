// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
    const fetchChannels = actionCreator(types.FETCH_CHANNELS);

    const fetchChannelIDs = () => async (dispatch) => {
        const channels = await channelService.fetchChannelIDs();
        dispatch(fetchChannels(channels));
    };

    // select channel
    const channelSelect = actionCreator(types.CHANNEL_SELECT);

    const selectChannel = (channel_id) => async (dispatch) => {
        dispatch(channelSelect(channel_id))
    };

    // fetch messages once channel is selected
    const fetchChannelMessages = actionCreator(types.FETCH_CHANNEL_MESSAGES);

    const fetchMessagesChannel = (channel_id) => async (dispatch) => {
        const channelMessages = await channelService.fetchMessagesChannel(channel_id);
        dispatch(fetchChannelMessages(channelMessages));
    };
    
    return { fetchChannelIDs, selectChannel, fetchMessagesChannel};
};

export default initActions;