// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";
import { cloneDeep } from "lodash-es";

const initActions = function (channelService) {
    const fetchChannels = orgName => async dispatch => {
        const [err, channels] = await to(channelService.fetchChannels(orgName));
        if (err) {
            throw new Error("Could not fetch channels");
        }
        dispatch(setOrgChannels(orgName, channels));
    };

    const orgChannelsSet = actionCreator(types.SET_ORG_CHANNELS);
    const setOrgChannels = (orgName, channels) => dispatch => {
        channels = Object.fromEntries(channels.map(channel => [channel.name, channel]));
        dispatch(orgChannelsSet({orgName, channels}));
    }

    const deleteChannel = channelName => async (dispatch, getState) => {
        const orgName = getState().org.org.name;
        const [err, _] = await to(channelService.deleteChannel(orgName, channelName));
        if (err) {
            throw new Error("Could not delete channel");
        }
    }

    const channelNameSet = actionCreator(types.CHANNEL_NAME_SET);
    const setCreateChannelName = (channel_name) => (dispatch) => {
        dispatch(channelNameSet(channel_name))
    };

    const channelNameTaken = actionCreator(types.CHANNEL_NAME_TAKEN);
    const takenChannelName = (isChannelNameTaken) => (dispatch) => {
        dispatch(channelNameTaken(isChannelNameTaken))
    };

    const channelAddedTo = actionCreator(types.ADDED_TO_CHANNEL);
    const addedToChannel = (orgName, channel) => dispatch => {
        dispatch(channelAddedTo({orgName, channel}))
    };

    const channelDeleted = (orgName, channelName) => async (dispatch, getState) => {
        dispatch(removeChannel(orgName, channelName));
        const isCurrentOrg = getState().org.org?.name === orgName;
        if (isCurrentOrg) {
            const isCurrentChannelDeleted = getState().chat.type === "channel" && getState().chat.channel?.name === channelName;
            if (isCurrentChannelDeleted) {
                dispatch(actions.chat.setChannel(null));
                dispatch(actions.sidebar.selectDefaultChannel());
            }
        }
    };

    const removeChannel = (orgName, channelName) => (dispatch, getState) => {
        const allOrgChannels = getState().channel.channels[orgName];
        if (allOrgChannels) {
            const channels = cloneDeep(allOrgChannels);
            delete channels[channelName];
            dispatch(orgChannelsSet({orgName, channels}));
        }
    }

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

    return {
        fetchChannels,
        setOrgChannels,
        deleteChannel,
        setCreateChannelName,
        takenChannelName,
        addedToChannel,
        channelDeleted,
        showCreateModal,
        createPrivate,
        privateChannelUsers,
    };
};

export default initActions;
