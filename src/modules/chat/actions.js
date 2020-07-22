import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (utilityService) {
    const initChat = () => (dispatch, getState) => {
        const channels = getState().channel.channels;
        const channelIds = []
        for (let channelId in channels) {
            channelIds.push(channelId);
        }
        const usernames = getState().user.usernames;
        // Initialize channel messages and private messages map
        dispatch(actions.message.initChannelMessagesMap(channelIds));
        dispatch(actions.message.initPrivateMessagesMap(usernames));
        // Select default channel
        const channelsExist = channels && !utilityService.isEmpty(channels);
        if (channelsExist) {
            const defaultChannel = utilityService.getFirstProp(channels);
            dispatch(actions.sidebar.selectChannel(defaultChannel.channel_id));
        }
    };

    const inputUpdated = actionCreator(types.INPUT_UPDATED);
    const updateInput = (input) => (dispatch) => {
        dispatch(inputUpdated(input));
    };

    const clearInput = actionCreator(types.CLEAR_INPUT);
    const inputClear = () => (dispatch) => {
        dispatch(clearInput());
    };

    return { initChat, updateInput, inputClear };
};

export default initActions;




