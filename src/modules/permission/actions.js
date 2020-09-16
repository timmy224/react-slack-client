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

    return {
        fetchPermissions,
    };
}

export default initActions;