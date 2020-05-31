// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";
import { actionCreator } from "../utils";

const initActions = function (channelService) {
  const fetchChannelsSuccess = actionCreator(types.FETCH_CHANNELS_SUCCESS);

  const fetchChannels = () => async (dispatch) => {
    const channels = await channelService.fetchChannels();
    dispatch(fetchChannelsSuccess(channels));
  };

  const fetchChannelsMsgSuccess = actionCreator(
    types.FETCH_CHANNELS_MSG_SUCCESS
  );

  const fetchMessages = () => async (dispatch) => {
    const messages = await channelService.fetchMessages();
    dispatch(fetchChannelsMsgSuccess(messages));
  };

  return { fetchChannels, fetchMessages };
};

export default initActions;

// const initActions = function (channelService) {
//     const fetchChannelsSuccess = actionCreator(types.FETCH_CHANNELS_SUCCESS);
//     const fetchChannelsSuccess = actionCreator("");
//     const fetchChannelsSuccess = ("") => payload => ({ type, payload });

//   	const actionCreator = type => payload => ({ type, payload });
//    	const types = {FETCH_CHANNELS_SUCCESS: ""}

//    	const fetchChannelsSuccess =(payload)=>{
//    		type: FETCH_CHANNELS_SUCCESS,
//    		payload: payload
//    	}
