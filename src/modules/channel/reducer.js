// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import {FETCH_CHANNELS_SUCCESS, CHANNEL_SELECT, FETCH_CHANNEL_MESSAGES} from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: [],
        channel: 0,
        channelMessages: []
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case FETCH_CHANNELS_SUCCESS:
                return {
                    ...state,
                    channels: payload,
                };
            case CHANNEL_SELECT:
                return {
                    ...state,
                    channel: payload,
                }
            case FETCH_CHANNEL_MESSAGES:
                return {
                    ...state, 
                    channelMessages: [...state.channelMessages, payload],
                }                           
            default: 
                return state;
        }
    };

    return reducer;
};

export default initReducer;