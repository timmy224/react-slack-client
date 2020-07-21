// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService) {
    const channelsFetch = actionCreator(types.FETCH_CHANNELS);
    const fetchChannels = () => async (dispatch) => {
        const channels = await channelService.fetchChannels();
        const channelsMap = {};
        const channelIds = [];
        for (let channel of channels) {
            channelsMap[channel.channel_id] = channel;
            channelIds.push(channel.channel_id);
        }      
        dispatch(channelsFetch(channelsMap));
        dispatch(actions.message.initChannelMessages(channelIds));
    };

    const channelNameSet = actionCreator(types.CHANNEL_NAME_SET)
	const createChannel = (channel_name) => (dispatch)=>{
		dispatch(channelNameSet(channel_name))
    };
    
    const channelNameTaken = actionCreator(types.CHANNEL_NAME_TAKEN)
	const takenChannelName = (isChannelNameTaken) =>(dispatch)=>{
		dispatch(channelNameTaken(isChannelNameTaken))
	};

    return { fetchChannels,
             createChannel,
             takenChannelName,
           };
};

export default initActions;
