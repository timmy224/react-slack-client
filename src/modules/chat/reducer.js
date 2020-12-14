import types from "./types";
import sidebarTypes from "../sidebar/types";
import userTypes from "../user/types";

const initReducer = () => {
    /* type can be "private" or "channel" depending on what kind of chat we have open. 
    partnerUsername will be set to the username of the person we're chatting with.
    channel will be set to the channel we're chatting in. */
    const INITIAL_STATE = {
        type: "", 
        partnerUsername: "", 
        channel: null,
        currentInput: "",
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.RESET: 
                return INITIAL_STATE;
            case types.SET_CHANNEL:
                return {
                    ...state,                    
                    type: "channel",
                    channel: payload,
                    partnerUsername: "", // Clear out partnerUsername in case we were just private messaging
                };
            case sidebarTypes.USER_SELECT:
                return {
                    ...state,                    
                    type: "private",
                    partnerUsername: payload,
                    channel: null, // Clear out channel in case we were just chatting in a channel
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