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


    
    return { fetchChannelIDs, selectChannel };
};

export default initActions;
