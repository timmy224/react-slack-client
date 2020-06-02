// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: [],
        channel_id: 1,
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
                    channel_id: payload,
                }                         
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
