import types from "./types";
import sidebarTypes from "../sidebar/types";
import userTypes from "../user/types";

const initReducer = () => {
    /* type can be "private" or "channel" depending on what kind of chat we have open. 
    partnerUsername will be set to the username of the person we're chatting with.
    channel will be set to the channel we're chatting in. */
    const INITIAL_STATE = {
        statusPrivate: {},
        statusChannel: {}
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.READ_STATUS_SET_CHANNEL:
                const {channelName, readDateTime} = payload;
                return {
                    ...state,
                    statusChannel: {
                        ...state.statusChannel,
                        [channelName]: readDateTime,
                    }
                };
            case types.READ_STATUS_SET_PRIVATE:
                const {partnerUsername, readDateTime} = payload;
                return {
                    ...state,
                    statusPrivate: {
                        ...state.statusPrivate,
                        [partnerUsername]: readDateTime,
                    }
                };
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;