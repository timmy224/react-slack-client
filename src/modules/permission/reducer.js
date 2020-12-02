import types from "./types";
import userTypes from "../user/types";

const initReducer = () => {
    const INITIAL_STATE = {
        orgMemberPerms: {},
        channelMemberPerms: {},
    };

    const reducer = (state=INITIAL_STATE, action={}) => {
        const { type, payload } = action;
        switch (type) {
            case userTypes.LOGOUT: 
                return INITIAL_STATE;
            case types.FETCH_PERMISSIONS:
                return {
                    ...state,
                    orgMemberPerms: payload.org_member_perms,
                    channelMemberPerms: payload.channel_member_perms
                }
            default:
                return state;
        }
    };
    return reducer;
};

export default initReducer;

