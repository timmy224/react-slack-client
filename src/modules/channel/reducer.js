// Credit: https://github.com/dprovodnikov/complex-redux-project-architecture
import types from "./types";
import userTypes from "../user/types";
import set from "lodash/fp/set";

const initReducer = () => {

	const INITIAL_STATE = {
		channels: {},
		showCreateChannelModal: false,
		showChannelSideBar: false,
		channelMemberNames: [],
	};

    const reducer = (state = INITIAL_STATE, action) => {
		const { type, payload } = action;
		
        switch (type) {
			case userTypes.LOGOUT:
				return INITIAL_STATE;

			case types.SET_ORG_CHANNELS: {
				const { orgName, channels } = payload;
				const path = ["channels", orgName];
				return set(path, channels, state);
			}

			case types.ADDED_TO_CHANNEL: {
				const { orgName, channel } = payload;
				const path = ["channels", orgName, channel.name];
				return set(path, channel, state);
			}

			case types.SHOW_CREATE_CHANNEL_MODAL:
				return {
					...state,
					showCreateChannelModal: payload,
				};

			case types.SHOW_CHANNEL_SIDE_BAR:
				return {
					...state,
					showChannelSideBar: payload,
				};

			case types.ADD_A_MEMBER_TO_CHANNEL: {
				const { orgName, channelName, username } = payload;
				const path = ["channels", orgName, channelName, "members"];
				const members = state.channels[orgName]?.[channelName]?.members
					? [...state.channels[orgName]?.[channelName]?.members]
					: [];
				members.push({ username: username });
				return set(path, members, state);
			}

				
			case types.SET_CHANNEL_MEMBERS: {
				const { orgName, channelName, members } = payload;
				const path = ["channels", orgName, channelName, "members"];
				return set(path, members, state);
			}

			case types.FETCH_CHANNEL_MEMBER_NAMES:
				return {
					...state,
					channelMemberNames: payload,
				};

			default:
				return state;
		}
    };

	return reducer;
};

export default initReducer;
