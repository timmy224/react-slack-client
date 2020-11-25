import types from "./types";
import {actionCreator} from "../utils";
import {actions, services} from "../../context";
import {dispatch} from "rxjs/internal/observable/pairs";

const initActions = function () {
	const channelSelect = actionCreator(types.CHANNEL_SELECT);
	const selectChannel = (channelId) => (dispatch, getState) => {
		let channels = getState().channel.channels;
		const channel = channels[channelId];
		console.log("THIS IS THE  CHANNEL NAME", channel.name);
		dispatch(channelSelect(channel));
		dispatch(actions.channel.fetchNumMembers(channel.name));
		dispatch(actions.channel.setCreateChannelName(channel.name));
		dispatch(actions.message.fetchChannelMessages(channelId));
	};

	const userSelect = actionCreator(types.USER_SELECT);
	const selectUser = (selectedUsername) => (dispatch, getState) => {
		dispatch(userSelect(selectedUsername));
		const isMessagesExist =
			getState().message.privateMessages[selectedUsername].length > 0;
		if (!isMessagesExist) {
			dispatch(actions.message.fetchPrivateMessages(selectedUsername));
		}
	};
	const channelReload = actionCreator(types.CHANNEL_RELOAD);
	const reloadChannel = () => async (dispatch, getState) => {
		await dispatch(actions.channel.fetchChannels);
		let channels = getState().channel.channels;
		const defaultChannel = services.utilityService.getFirstProp(channels);
		let channel = channels[defaultChannel.channel_id];
		console.log(
			"RELOAD THIS IS THE CHANNEL NAME, channels, defaultCHannel",
			channel,
			channels,
			defaultChannel
		);
		dispatch(channelSelect(channel));
	};

	return {selectChannel, selectUser, reloadChannel};
};

export default initActions;
