import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function() {
    const initSidebar = () => async (dispatch) => {
        await Promise.all([
            dispatch(actions.channel.fetchChannelIDs()),
            dispatch(actions.user.fetchUsernames())
        ]);
    }

    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = channel_id => (dispatch) => {
        dispatch(channelSelect(channel_id));
        dispatch(actions.chat.fetchMessagesChannel(channel_id));
    };

    const userSelect = actionCreator(types.USER_SELECT);
    const selectUser = selectedUsername => (dispatch) => {
        dispatch(userSelect(selectedUsername));
        dispatch(actions.chat.fetchPrivateMessages(selectedUsername));
    };

    return { initSidebar, selectChannel, selectUser };
}

export default initActions;