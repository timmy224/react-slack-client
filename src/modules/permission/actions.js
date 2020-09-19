import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";

const initActions = function(permissionService) {
    const permissionsFetch = actionCreator(types.FETCH_PERMISSIONS);
    const fetchPermissions = () => async (dispatch, getState) => {
        const username = getState().user.username;
        const [err, data] = await to(permissionService.fetchPermissions(username));
        if (err) {
            throw new Error("Could not fetch permissions");
        }
        dispatch(permissionsFetch(data));
    };

    const getPermissions = () => (dispatch, getState) => {
        const permissions = [];
        const orgId = getState().workspace.org;
        const orgMemberPerms = getState().permission.orgMemberPerms[orgId]
        if (orgMemberPerms) {
            permissions.push(...orgMemberPerms);
        }
        if (getState().chat.channel) {
            const allChanMemberPermsForOrg = getState().permission.channelMemberPerms[orgId]
            if (allChanMemberPermsForOrg) {
                const channelId = getState().chat.channel.channel_id;
                const channelMemberPerms = allChanMemberPermsForOrg[channelId];
                if (channelMemberPerms) {
                    permissions.push(...channelMemberPerms);
                }   
            }   
        }
        return permissions;
    };

    return {
        fetchPermissions,
        getPermissions,
    };
}

export default initActions;