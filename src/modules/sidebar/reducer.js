import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        // { channel/private name: True/False}
        unreadChannels = {},
        unreadPrivates = {}
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.UNREAD_CHANNEL:
                const {channelName, status} = payload;
                return {
                    ...state,
                    unreadChannels: {
                        ...state.unreadChannels,
                        [channelName]: status,
                    }
                };
            case types.UNREAD_PRIVATE:
                const {partnerUsername, status} = payload;
                return {
                    ...state,
                    unreadPrivates: {
                        ...state.unreadPrivate,
                        [partnerUsername]: status,
                    }
                };
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;