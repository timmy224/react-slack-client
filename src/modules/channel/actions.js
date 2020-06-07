// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService) {
    const fetchChannels = actionCreator(types.FETCH_CHANNELS);
    const channelSelect = actionCreator(types.CHANNEL_SELECT);

    const fetchChannelIDs = () => async (dispatch) => {
        const channels = await channelService.fetchChannelIDs();
        console.log("Channels fetched");
        dispatch(fetchChannels(channels));
    };

    const selectChannel = (channel_id) => (dispatch) => {
        dispatch(channelSelect(channel_id))
    };
    
    return { fetchChannelIDs, selectChannel };
};

export default initActions;
