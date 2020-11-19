// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService, utilityService) {
    const channelsSet = actionCreator(types.SET_CHANNELS);
    const setChannels = (channels) => (dispatch) => {
        const channelsMap = {};
        for (let channel of channels) {
            channelsMap[channel.channel_id] = channel;
        }
        dispatch(channelsSet(channelsMap));
    }

    const channelNameSet = actionCreator(types.CHANNEL_NAME_SET);
    const setCreateChannelName = (channel_name) => (dispatch) => {
        dispatch(channelNameSet(channel_name))
    };

    const channelNameTaken = actionCreator(types.CHANNEL_NAME_TAKEN);
    const takenChannelName = (isChannelNameTaken) => (dispatch) => {
        dispatch(channelNameTaken(isChannelNameTaken))
    };

    const channelDeleted = (channelId) => async (dispatch, getState) => {
        // Check for special case of currently selected channel being deleted
        const isCurrentChannelDeleted = getState().chat.type === "channel" && getState().chat.channel.channel_id === parseInt(channelId);
        // Refresh channel list in sidebar
        // TODO: remove channel from redux
        if (isCurrentChannelDeleted) {
            // If currently selected channel was deleted, choose first channel (default)
            const channels = getState().channel.channels;
            const channelsExist = channels && !utilityService.isEmpty(channels);
            if (channelsExist) {
                const defaultChannel = utilityService.getFirstProp(channels);
                dispatch(actions.sidebar.selectChannel(defaultChannel.channel_id));
            }
        }
    };

    const modalCreateShow = actionCreator(types.SHOW_CREATE_MODAL);
    const showCreateModal = (show) => (dispatch) => {
        dispatch(modalCreateShow(show))
    };

    const privateChannel = actionCreator(types.CREATE_PRIVATE);
    const createPrivate = (isChannelPrivate) => (dispatch) => {
        dispatch(privateChannel(isChannelPrivate))
    };

    const usersPrivate = actionCreator(types.PRIVATE_CHANNEL_USERS);
    const privateChannelUsers = (privateUsers) => (dispatch) => {
        dispatch(usersPrivate(privateUsers))
    };
    const numberOfMembersFetch = actionCreator(types.FETCH_TOTAL_MEMBERS);
    const fetchNumMembers = channelId => async (dispatch) => {
        const [err, numMembers] = await to(channelService.fetchNumberOfMembers(channelId));
        if (err) {
            throw new Error("Could not fetch num channel members");
        }
        dispatch(numberOfMembersFetch(numMembers));
    };

    return {
        setChannels,
        setCreateChannelName,
        takenChannelName,
        channelDeleted,
        showCreateModal,
        createPrivate,
        privateChannelUsers,
        fetchNumMembers
    };
};

export default initActions;
