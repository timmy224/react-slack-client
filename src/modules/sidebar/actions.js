import types from "./types";
import {actionCreator} from "../utils";
import {actions} from "../../context";

const initActions = function () {
	const channelSelect = actionCreator(types.CHANNEL_SELECT);
	const selectChannel = (channelId) => (dispatch, getState) => {
		const channels = getState().channel.channels;
		const channel = channels[channelId];
		console.log("THIS IS THE FUCKING CHANNEL NAME", channel.name);
		dispatch(channelSelect(channel));
		dispatch(actions.channel.fetchNumMembers(channel.name));
		dispatch(actions.channel.setCreateChannelName(channel.name));
		// const isMessagesExist =
		// 	getState().message.channelMessages[channelId].length > 0;
		// if (!isMessagesExist) {
		dispatch(actions.message.fetchChannelMessages(channelId));
		// }
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

	return {selectChannel, selectUser};
};

export default initActions;
