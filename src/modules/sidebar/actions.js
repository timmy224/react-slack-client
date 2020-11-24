import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (utilityService) {
    const channelSelect = actionCreator(types.CHANNEL_SELECT);
    const selectChannel = channelName => (dispatch, getState) => {
        const orgName = getState().org.org.name;
        const channels = getState().channel.channels;
        const channel = channels[channelName];
        dispatch(channelSelect(channel));
        dispatch(actions.channel.fetchNumMembers(channelName))
        const isMessagesExist = getState().message.messages[orgName].channel[channelName] ?.length > 0;
        if (!isMessagesExist) {
            dispatch(actions.message.fetchChannelMessages(channelName));
        }
    };

    const selectDefaultChannel = () => (dispatch, getState) => {
        const orgName = getState().org.org.name;
        const channels = getState().channel.channels[orgName];
        const channelsExist = channels && !utilityService.isEmpty(channels);
        if (channelsExist) {
            const defaultChannel = utilityService.getFirstProp(channels);
            dispatch(selectChannel(defaultChannel.name));
        }
    };

    const userSelect = actionCreator(types.USER_SELECT);
    const selectUser = username => (dispatch, getState) => {
        const orgName = getState().org.org.name;
        dispatch(userSelect(username));
        const isMessagesExist = getState().message.messages[orgName].private[username] ?.length > 0;
        if (!isMessagesExist) {
            dispatch(actions.message.fetchPrivateMessages(username));
        }
    };

    return { 
        selectChannel, 
        selectDefaultChannel,
        selectUser,
    };
}

export default initActions;