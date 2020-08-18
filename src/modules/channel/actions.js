// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";

const initActions = function (channelService, utilityService) {
    const channelsFetch = actionCreator(types.FETCH_CHANNELS);
    const fetchChannels = () => async (dispatch) => {
        const [err, channels] = await to(channelService.fetchChannels());
        if (err) {
            throw new Error("Could not fetch channels");
        }
        const channelsMap = {};
        for (let channel of channels) {
            channelsMap[channel.channel_id] = channel;
        }
        dispatch(channelsFetch(channelsMap));
    };

    const channelNameSet = actionCreator(types.CHANNEL_NAME_SET);
    const createChannel = (channel_name) => (dispatch) => {
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
        await dispatch(fetchChannels());
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

    const modalShow = actionCreator(types.SHOW_MODAL);
    const showModal = (isModalOpen) => (dispatch) => {
        dispatch(modalShow(isModalOpen))
    };

    return {
        fetchChannels,
        createChannel,
        takenChannelName,
        channelDeleted,
        showModal
    };
};

export default initActions;
