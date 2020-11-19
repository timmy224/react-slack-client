// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import {actionCreator} from "../utils";
import {actions} from "../../context";
import {dispatch} from "rxjs/internal/observable/pairs";
import {asyncScheduler} from "rxjs";

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
	const setCreateChannelName = (channel_name) => (dispatch) => {
		dispatch(channelNameSet(channel_name));
	};

	const channelNameTaken = actionCreator(types.CHANNEL_NAME_TAKEN);
	const takenChannelName = (isChannelNameTaken) => (dispatch) => {
		dispatch(channelNameTaken(isChannelNameTaken));
	};

	const channelDeleted = (channelId) => async (dispatch, getState) => {
		// Check for special case of currently selected channel being deleted
		const isCurrentChannelDeleted =
			getState().chat.type === "channel" &&
			getState().chat.channel.channel_id === parseInt(channelId);
		// Refresh channel list in sidebar
		await dispatch(fetchChannels());
		if (isCurrentChannelDeleted) {
			// If currently selected channel was deleted, choose first channel (default)
			const channels = getState().channel.channels;
			const channelsExist = channels && !utilityService.isEmpty(channels);
			if (channelsExist) {
				const defaultChannel = utilityService.getFirstProp(channels);
				dispatch(
					actions.sidebar.selectChannel(defaultChannel.channel_id)
				);
			}
		}
	};

	const modalCreateShow = actionCreator(types.SHOW_CREATE_MODAL);
	const showCreateModal = (show) => (dispatch) => {
		dispatch(modalCreateShow(show));
	};

	const channelSideBarShow = actionCreator(types.SHOW_CHANNEL_SIDE_BAR);
	const toggleChannelSideBar = (show) => (dispatch) => {
		dispatch(channelSideBarShow(show));
	};

	const privateChannel = actionCreator(types.CREATE_PRIVATE);
	const createPrivate = (isChannelPrivate) => (dispatch) => {
		dispatch(privateChannel(isChannelPrivate));
	};

	const usersPrivate = actionCreator(types.PRIVATE_CHANNEL_USERS);
	const privateChannelUsers = (privateUsers) => (dispatch) => {
		dispatch(usersPrivate(privateUsers));
	};
	const numberOfMembersFetch = actionCreator(types.FETCH_TOTAL_MEMBERS);
	const fetchNumMembers = (channelName) => async (dispatch) => {
		const [err, numMembers] = await to(
			channelService.fetchNumberOfMembers(channelName)
		);
		if (err) {
			throw new Error("Could not fetch num channel members");
		}
		dispatch(numberOfMembersFetch(numMembers));
	};
	const nameOfMembersFetch = actionCreator(types.FETCH_CHANNEL_MEMBER_NAMES);
	const fetchMemberNames = (channelName) => async (dispatch) => {
		const [err, nameMembers] = await to(
			channelService.fetchMemberNames(channelName)
		);
		if (err) {
			throw new Error("Could not fetch names of channel members");
		}
		dispatch(nameOfMembersFetch(nameMembers));
	};
	const channelMemberAdd = actionCreator(types.ADD_CHANNEL_MEMBER);
	const addChannelMember = (channelName, addMember) => async (dispatch) => {
		const [err, memberAdded] = await to(
			channelService.addChannelMember(channelName, addMember)
		);
		if (err) {
			throw new Error("Could not add member to channel");
		}
		dispatch(channelMemberAdd(memberAdded));
		dispatch(fetchMemberNames(channelName));
	};
	const channelMemberRemove = actionCreator(types.REMOVE_CHANNEL_MEMBER);
	const removeChannelMember = (channelName, removeMember) => async (
		dispatch
	) => {
		const [err, memberRemoved] = await to(
			channelService.removeChannelMember(channelName, removeMember)
		);
		if (err) {
			throw new Error("Could not remove member from channel");
		}
		dispatch(channelMemberRemove(memberRemoved));
		dispatch(fetchMemberNames(channelName));
	};
	const addMemberUpdate = actionCreator(types.UPDATE_ADD_MEMBER);
	const updateAddMember = (addMember) => (dispatch) => {
		dispatch(addMemberUpdate(addMember));
	};
	const clearAddMember = actionCreator(types.CLEAR_ADD_MEMBER);
	const addMemberClear = () => (dispatch) => {
		dispatch(clearAddMember());
	};
	return {
		fetchChannels,
		setCreateChannelName,
		takenChannelName,
		channelDeleted,
		showCreateModal,
		createPrivate,
		privateChannelUsers,
		fetchNumMembers,
		toggleChannelSideBar,
		fetchMemberNames,
		addChannelMember,
		removeChannelMember,
		updateAddMember,
		clearAddMember,
	};
};
//  CHANGED reducer action, types and channel service in order to be able to fetch names of members. Now you have to test and use destructuring in order to display

export default initActions;
