// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: [],
        channel_id: 1,
        channelMessages: []
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.FETCH_CHANNELS:
                return {
                    ...state,
                    channels: payload,
                };
            case types.CHANNEL_SELECT:
                return {
                    ...state,
                    channel: payload,
                }
            case types.FETCH_CHANNEL_MESSAGES:
                return {
                    ...state, 
                    //channelMessages: [...state.channelMessages, payload],
                    channelMessages: [payload], // flush and return recent messages when switching channels
                }                           
            default: 
                return state;
        }
    };

    return reducer;
};

export default initReducer;