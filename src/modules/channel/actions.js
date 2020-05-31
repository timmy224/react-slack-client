// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import {FETCH_CHANNELS_SUCCESS, CHANNEL_SELECT_SUCCESS, FETCH_CHANNEL_MESSAGES_SUCCESS} from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
    const fetchChannelsSuccess = actionCreator(FETCH_CHANNELS_SUCCESS);

    const fetchChannels = () => async (dispatch) => {
        const channels = await channelService.fetchChannels();
        dispatch(fetchChannelsSuccess(channels));
    };

    // select channel
    const channelSelectSuccess = actionCreator(CHANNEL_SELECT_SUCCESS);

    const selectChannel = (channel_id) => async (dispatch) => {
        dispatch(channelSelectSuccess(channel_id))
    };

    // fetch messages once channel is selected
    const fetchChannelMessagesSuccess = actionCreator(FETCH_CHANNEL_MESSAGES_SUCCESS);

    const fetchChannelMessages = (channel_id) => async (dispatch) => {
        const channelMessages = await channelService.fetchChannelMessages(channel_id);
        dispatch(fetchChannelMessagesSuccess(channelMessages));
    };
    
    return { fetchChannels, selectChannel, fetchChannelMessages};
};

export default initActions;