import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
    const fetchChannelsSuccess = actionCreator(types.FETCH_CHANNELS_SUCCESS);

    const fetchChannels = () => async (dispatch) => {
        const channels = await channelService.getChannels();
        dispatch(fetchChannelsSuccess(channels));
    };

    return { fetchChannels };
};

export default initActions;