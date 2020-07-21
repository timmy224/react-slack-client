// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService) {
    const channelsFetch = actionCreator(types.FETCH_CHANNELS);
    const fetchChannels = () => async (dispatch) => {
        const channels = await channelService.fetchChannels();
        const channelsMap = {};
        for (let channel of channels) {
            channelsMap[channel.channel_id] = channel;
            // TODO possibly create a dedicated action type in messages for this, where we take in 
            // a list of channel_ids, and initialize the "dictionary" to have empty lists at each channel_id
            const action = {
                type: "FETCH_CHANNEL_MESSAGES",
                payload: {channelId: channel.channel_id, messages: []}                
            };
            console.log("Just dispatched our empty channel messages list action");
            dispatch(action);
        }
        // for every channel, update the channel messages object[channelId] = [] 

        dispatch(channelsFetch(channelsMap));
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
