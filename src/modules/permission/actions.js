import to from "await-to-js";
import types from "./types";
import { actionCreator } from "../utils";

const initActions = function(permissionService) {
    const permissionsFetch = actionCreator(types.FETCH_PERMISSIONS);
    const fetchPermissions = () => async dispatch => {
        const [err, data] = await to(permissionService.fetchPermissions());
        if (err) {
            throw new Error("Could not fetch permissions");
        }
        dispatch(permissionsFetch(data));
    };

    const getPermissions = () => (_, getState) => {
        const permissions = [];
        const org = getState().org.org;
        if (org) {
            const orgName = org.name;
            const orgPerms = getState().permission.orgMemberPerms[orgName]
            if (orgPerms) {
                permissions.push(...orgPerms);
            }
            if (getState().chat.type === "channel") {
                const channelName = getState().chat.channel.name;
                const selectedChannelPerms = getState().permission.channelMemberPerms[orgName]?.[channelName];
                if (selectedChannelPerms) {
                    permissions.push(...selectedChannelPerms);
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