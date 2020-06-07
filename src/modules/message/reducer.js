import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channelMessages: [],
        privateMessages: [],
        currentInput: "",
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.MESSAGE_RECEIVED:
                return {
                    ...state,
                    channelMessages: [...state.channelMessages, payload]
                };
            case types.FETCH_CHANNEL_MESSAGES:
                return {
                    ...state,
                    channelMessages: payload, 
                };
            case types.FETCH_PRIVATE_MESSAGES:
                return {
                    ...state,
                    privateMessages: payload,
                };
            case types.INPUT_UPDATED:
                return {
                    ...state,
                    currentInput: payload,
                };
            case types.CLEAR_INPUT:
                return {
                    ...state,
                    currentInput: "",
                };
            default:
                return state;
        }
    };

    return reducer;
};

export default initReducer;