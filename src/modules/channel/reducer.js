// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";

const initReducer = () => {
  const INITIAL_STATE = {
    list: [],
    messages: [],
  };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch (type) {
      case types.FETCH_CHANNELS_SUCCESS:
        return {
          ...state,
          list: payload,
        };
      case types.FETCH_CHANNEL_MSG_SUCCESS:
        return {
          ...state,
          messages: payload,
        };
      default:
        return state;
    }
  };

  return reducer;
};

export default initReducer;
