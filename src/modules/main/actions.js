import types from "./types";
import { actions } from "../../context";
import { actionCreator } from "../utils";

const initActions = function(utilityService) {
    const initializedActionCreator = actionCreator(types.INITIALIZED);
    const initMain = () => async (dispatch, getState) => {
        if (!getState().user.isLoginBundleFetched) {
            await dispatch(actions.user.fetchLoginBundle())
            const orgs = getState().org.orgs;
            const orgsExist = orgs && !utilityService.isEmpty(orgs);
            if (orgsExist) {
                const defaultOrg = utilityService.getFirstProp(orgs);
                dispatch(actions.org.selectOrg(defaultOrg.name));
            }
        }
        await dispatch(actions.chat.initChat());        
        dispatch(initializedActionCreator());
    };

    return { initMain };
};

export default initActions;