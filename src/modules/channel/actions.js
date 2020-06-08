// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
    const fetchChannels = actionCreator(types.FETCH_CHANNELS);
    const fetchChannelIDs = () => async (dispatch) => {
        const channels = await channelService.fetchChannelIDs();
        dispatch(fetchChannels(channels));
    };

    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = (channel_id) => async (dispatch) => {
        dispatch(channelSelect(channel_id));
    };

    const channelNameSet = actionCreator(types.CHANNEL_NAME_SET)
	const createChannel = (channel_name) => (dispatch)=>{
		dispatch(channelNameSet(channel_name))
    };
    
    const channelNameTaken = actionCreator(types.CHANNEL_NAME_TAKEN)
	const takenChannelName = (isChannelNameTaken) =>(dispatch)=>{
		dispatch(channelNameTaken(isChannelNameTaken))
	};

    return { fetchChannelIDs,
             selectChannel, 
             createChannel,
             takenChannelName, 
           };
};

export default initActions;
