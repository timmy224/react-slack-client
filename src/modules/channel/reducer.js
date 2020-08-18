// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture

import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: {},
        channel_name: '',
        show_taken_msg: false,
        showModal: false
    };

  const reducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

        switch (type) {
            case types.FETCH_CHANNELS:
                return {
                    ...state,
                    channels: payload,
                };
            case types.CHANNEL_NAME_TAKEN:
                return {
                    ...state,
                    show_taken_msg: payload,
                }               
            case types.CHANNEL_NAME_SET:
                return {
                    ...state,
                    channel_name: payload,
                }
            case types.SHOW_MODAL:
                return{
                    ...state,
                    showModal: payload,
                }
            default: 
                return state;
        }
    };

  return reducer;
};

export default initReducer;
