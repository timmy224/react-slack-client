// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
    const fetchChannels = actionCreator(types.FETCH_CHANNELS);

    const fetchChannelIDs = () => async (dispatch) => {
        const channels = await channelService.fetchChannelIDs();
        dispatch(fetchChannels(channels));
    };
    
    return { fetchChannelIDs };
};

export default initActions;
