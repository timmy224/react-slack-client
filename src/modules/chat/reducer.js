import sidebarTypes from "../sidebar/types";

const initReducer = () => {
    /* type can be "private" or "channel" depending on what kind of chat we have open. 
    receiverUsername will be set to the username of the person we're chatting with.
    channelId will be set to the id of the channel we're chatting in.  */
    const INITIAL_STATE = {
        type: "", 
        receiverUsername: "", 
        channelId: "",
    };
    
    const reducer = (state = INITIAL_STATE, action) => {
        const { type, payload } = action;
        switch (type) {
            case sidebarTypes.CHANNEL_SELECT:
                return {
                    ...state,                    
                    type: "channel",
                    channelId: payload,
                    receiverUsername: "", // Clear out receiverUsername in case we were just private messaging
                };
            case sidebarTypes.USER_SELECT:
                return {
                    ...state,                    
                    type: "private",
                    receiverUsername: payload,
                    channelId: "", // Clear out channelId in case we were just chatting in a channel
                };
            default: 
                return state;
        }
    };
    return reducer;
};

export default initReducer;