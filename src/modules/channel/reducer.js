// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import types from "./types";
import userTypes from "../user/types";
import set from "lodash/fp/set";

const initReducer = () => {
    const INITIAL_STATE = {
        channels: {},
        showCreateChannelModal: false,
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;
        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.SET_ORG_CHANNELS: {
                const { orgName, channels } = payload;
                const path = ["channels", orgName]
                return set(path, channels, state);
            }
            case types.ADDED_TO_CHANNEL: {
                const { orgName, channel } = payload;
                const path = ["channels", orgName, channel.name]
                return set(path, channel, state);
            }
            case types.SHOW_CREATE_CHANNEL_MODAL:
                return {
                    ...state,
                    showCreateChannelModal: payload,
                }
            default:
                return state;
        }
    };

    return reducer;
};

export default initReducer;
