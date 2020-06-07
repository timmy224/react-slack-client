// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService) {
    const fetchChannels = actionCreator(types.FETCH_CHANNELS);

    const fetchChannelIDs = () => async (dispatch) => {
        const channels = await channelService.fetchChannelIDs();
        console.log("Channels fetched");
        dispatch(fetchChannels(channels));
    };
    
    return { fetchChannelIDs };
};

export default initActions;
