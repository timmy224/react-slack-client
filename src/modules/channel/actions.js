// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";
import { actions } from "../../context";
import { cloneDeep } from "lodash-es";

const initActions = function (channelService, utilityService) {
    const channelsSet = actionCreator(types.SET_CHANNELS);
    const setChannels = (channels) => (dispatch) => {
        const channelsMap = Object.fromEntries(channels.map(channel => [channel.name, channel]));
        dispatch(channelsSet(channelsMap));
    }

    const deleteChannel = channelName => async (dispatch, getState) => {
        const orgName = getState().org.name;
        const [err, response] = await to(channelService.deleteChannel(orgName, channelName));
        if (err) {
            throw new Error("Could not fetch num channel members");
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

    const addedToChannel = (orgName, channel) => (dispatch, getState) => {
        const orgs = cloneDeep(getState().org.orgs);
        orgs[orgName].channels.push(channel);
        dispatch(actions.org.setOrgs(orgs));
    };

    const channelDeleted = (orgName, channelName) => async (dispatch, getState) => {
        // Check for special case of currently selected channel being deleted
        // TODO: update this check  
        const isCurrentChannelDeleted = getState().chat.type === "channel" && getState().chat.channel.name === channelName;
        dispatch(removeChannel(orgName, channelName));
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

    const removeChannel = (orgName, channelName) => (dispatch, getState) => {
        const channels = [...getState().org.orgs[orgName].channels].filter(channel => channel.name !== channelName);
        dispatch(setChannels(channels));
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
        deleteChannel,
        setCreateChannelName,
        takenChannelName,
        addedToChannel,
        channelDeleted,
        showCreateModal,
        createPrivate,
        privateChannelUsers,
        fetchNumMembers
    };
};

export default initActions;
