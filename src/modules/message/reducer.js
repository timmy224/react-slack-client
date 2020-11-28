import types from "./types";
import set from "lodash/fp/set";

const initReducer = () => {
    const INITIAL_STATE = {
        messages: {},
    };

    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;

        switch (type) {
            case types.SET_CHANNEL_MESSAGES: {
                const { orgName, channelName, messages } = payload;
                const path = ["messages", orgName, "channel", channelName];
                return set(path, messages, state);
            }
            case types.SET_PRIVATE_MESSAGES: {
                const { orgName, partnerUsername, messages } = payload;
                const path = ["messages", orgName, "private", partnerUsername];
                return set(path, messages, state);
            }
            case types.CHANNEL_MESSAGE_RECEIVED: {
                const { orgName, channelName, message } = payload;
                const path = ["messages", orgName, "channel", channelName];
                let messages = [message];
                if (state.messages[orgName]?.channel?.[channelName]) {
                    messages.unshift(...state.messages[orgName].channel[channelName]);
                }
                return set(path, messages, state);
            }
            case types.PRIVATE_MESSAGE_RECEIVED: {
                const { orgName, partnerUsername, message } = payload;
                const path = ["messages", orgName, "private", partnerUsername];
                let messages = [message];
                if (state.messages[orgName]?.private?.[partnerUsername]) {
                    messages.unshift(...state.messages[orgName].private[partnerUsername]);
                }
                return set(path, messages, state);
            }
            // case types.INIT_CHANNEL_MESSAGES_MAP: {
            //     const { channelIds } = payload;
            //     const messages = {};
            //     for (const channelId of channelIds) {
            //         messages[channelId] = [];
            //     }
            //     return {
            //         ...state,
            //         channelMessages: messages
            //     }
            // }
            // case types.INIT_PRIVATE_MESSAGES_MAP: {
            //     const { usernames } = payload;
            //     const messages = {};
            //     for (const username of usernames) {
            //         messages[username] = [];
            //     }
            //     return {
            //         ...state,
            //         privateMessages: messages
            //     }
            // }
            // case types.INIT_CHANNEL_MESSAGES: {
            //     const { channelId } = payload;
            //     return {
            //         ...state,
            //         channelMessages: {
            //             ...state.channelMessages,
            //             [channelId]: []
            //         }
            //     }
            // }
            default:
                return state;
        }
    };

    return reducer;
};

export default initReducer;