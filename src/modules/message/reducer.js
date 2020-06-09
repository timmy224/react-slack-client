import types from "./types";

const initReducer = () => {
    const INITIAL_STATE = {
        channelMessages: {},
        privateMessages: {},
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;
    
        switch (type) {
            case types.FETCH_CHANNEL_MESSAGES: {
                let { channelId, messages } = payload;
                return {
                    ...state,
                    channelMessages: {
                        ...state.channelMessages,
                        [channelId]: messages,
                    }
                };
            }
            case types.FETCH_PRIVATE_MESSAGES: {
                let { partnerUsername, messages } = payload;
                return {
                    ...state,
                    privateMessages: {
                        ...state.privateMessages,
                        [partnerUsername]: messages,
                    }
                };
            }
            case types.CHANNEL_MESSAGE_RECEIVED: {
                const { channelId, message } = payload;
                return {
                    ...state,
                    channelMessages: {
                        ...state.channelMessages,
                        [channelId]: [...state.channelMessages[channelId], message]
                    }
                };
            }
            case types.PRIVATE_MESSAGE_RECEIVED: {
                const { partnerUsername, message } = payload;
                return {
                    ...state,
                    privateMessages: {
                        ...state.privateMessages,
                        [partnerUsername]: [...state.privateMessages[partnerUsername], message]
                    }
                };
            }
            default: 
                return state;
        }
    };
    
    return reducer;
};

export default initReducer;