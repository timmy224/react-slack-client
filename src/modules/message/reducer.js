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
            case types.INIT_CHANNEL_MESSAGES: {
                const { channelIds } = payload;
                const messages = {};
                for (const channelId of channelIds) {
                    messages[channelId] = [];
                }
                console.log(messages);
                return {
                    ...state,
                    channelMessages: messages
                }
            }
            case types.INIT_PRIVATE_MESSAGES: {
                const { usernames } = payload;
                const messages = {};
                for (const username of usernames) {
                    messages[username] = [];
                }
                return {
                    ...state,
                    privateMessages: messages
                }
            }
            default: 
                return state;
        }
    };
    
    return reducer;
};

export default initReducer;