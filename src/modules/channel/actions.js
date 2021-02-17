// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import to from "await-to-js";
import types from "./types";
import {actionCreator} from "../utils";
import {actions} from "../../context";
import {cloneDeep} from "lodash-es";

const initActions = function (channelService) {
	const fetchChannels = (orgName) => async (dispatch) => {
		const [err, channels] = await to(channelService.fetchChannels(orgName));
		if (err) {
			throw new Error("Could not fetch channels");
		}
		dispatch(setOrgChannels(orgName, channels));
	};

	const orgChannelsSet = actionCreator(types.SET_ORG_CHANNELS);
	const setOrgChannels = (orgName, channels) => (dispatch) => {
		channels = Object.fromEntries(
			channels.map((channel) => [channel.name, channel])
		);
		dispatch(orgChannelsSet({ orgName, channels }));
	};

	const deleteChannel = (channelName) => async (dispatch, getState) => {
		const orgName = getState().org.org.name;
		const [err, _] = await to(
			channelService.deleteChannel(orgName, channelName)
		);
		if (err) {
			throw new Error("Could not delete channel");
		}
	};

	const channelAddedTo = actionCreator(types.ADDED_TO_CHANNEL);
	const addedToChannel = (orgName, channel) => (dispatch) => {
		dispatch(channelAddedTo({ orgName, channel }));
	};

	const channelDeleted = (orgName, channelName) => async (
		dispatch,
		getState
	) => {
		dispatch(removeChannel(orgName, channelName));
		const isCurrentOrg = getState().org.org?.name === orgName;
		if (isCurrentOrg) {
			const isCurrentChannelDeleted =
				getState().chat.type === "channel" &&
				getState().chat.channel?.name === channelName;
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
			dispatch(orgChannelsSet({ orgName, channels }));
		}
	};

	const modalCreateShow = actionCreator(types.SHOW_CREATE_CHANNEL_MODAL);
	const showCreateChannelModal = (show) => (dispatch) => {
		dispatch(modalCreateShow(show));
	};

	// BELOW ARE NEW CHANNEL ACTIONS

	const channelSideBarShow = actionCreator(types.SHOW_CHANNEL_SIDE_BAR);
	const toggleChannelSideBar = (show) => (dispatch) => {
		dispatch(channelSideBarShow(show));
	};

	//JUST API CALL TO SEND NEW CHANNEL MEMBER INFO TO SERVER
	const updateMembersCall = (orgName, channelName, members, action) => async () => {
		const [err, _] = await to(
			channelService.updateMembers(orgName, channelName, members, action)
		);
		if (err) {
			throw new Error("Could not update channel members list");
		}
	};

	// Action to add one new member to a channel
	const membersAddToChannel = actionCreator(types.ADD_MEMBERS_TO_CHANNEL);
	const addMembersToChannel = (orgName, channelName, newMembers) => (
		dispatch
	) => {
		dispatch(membersAddToChannel({ orgName, channelName, newMembers }));
	};

	//Actions above here have been tested and work as expected

	const channelMembersSet = actionCreator(types.SET_CHANNEL_MEMBERS);
	const setChannelMembers = (orgName, channelName, members) => (dispatch) => {
		members = Object.fromEntries(
			members.map((member) => [member.username, member])
		);
		dispatch(channelMembersSet({ orgName, channelName, members }));
	};

	const removedChannelMember = (orgName, channelName, removedMember) => (
		dispatch,
		getState
	) => {
		const allChannelMembers = getState().channel.channels[orgName][
			channelName
		].members;
		if (allChannelMembers) {
			let members = cloneDeep(allChannelMembers);
			members = members.filter(
				(member) => member.username !== removedMember
			);
			dispatch(channelMembersSet({ orgName, channelName, members }));
		}
	};

	const nameOfMembersFetch = actionCreator(types.FETCH_CHANNEL_MEMBER_NAMES);
	const fetchMemberNames = (orgName, channelName) => async (dispatch) => {
		const [err, nameMembers] = await to(
			channelService.fetchMemberNames(orgName, channelName)
		);
		if (err) {
			throw new Error("Could not fetch names of channel members");
		}
		dispatch(nameOfMembersFetch(nameMembers));
	};

	const channelMemberRemove = actionCreator(types.REMOVE_CHANNEL_MEMBER);
	const removeChannelMember = (orgName, channelName, removeMember) => async (
		dispatch
	) => {
		const [err, memberRemoved] = await to(
			channelService.removeChannelMember(
				orgName,
				channelName,
				removeMember
			)
		);
		if (err) {
			throw new Error("Could not remove member from channel");
		}
		dispatch(channelMemberRemove(memberRemoved));
		dispatch(fetchMemberNames(orgName, channelName));
	};

	return {
		fetchChannels,
		setOrgChannels,
		deleteChannel,
		addedToChannel,
		showCreateChannelModal,
		channelDeleted,

		toggleChannelSideBar,
		updateMembersCall,
		addMembersToChannel,

		fetchMemberNames,
		removeChannelMember,
		removedChannelMember,
	};
};
//  CHANGED reducer action, types and channel service in order to be able to fetch names of members. Now you have to test and use destructuring in order to display

export default initActions;
