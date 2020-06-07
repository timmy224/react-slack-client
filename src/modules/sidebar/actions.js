import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function() {
    const channelSelect = actionCreator(types.CHANNEL_SELECT);

    const initSidebar = () => async (dispatch) => {
        await dispatch(actions.channel.fetchChannelIDs());
        await dispatch(actions.user.fetchUsernames());
        // TODO in future: figure out how to make server calls at the same time and resolve on both returning
    }

    const selectChannel = channel_id => (dispatch) => {
        dispatch(channelSelect(channel_id));
        dispatch(actions.message.fetchMessagesChannel(channel_id));
    };

    return { initSidebar, selectChannel };
}

export default initActions;